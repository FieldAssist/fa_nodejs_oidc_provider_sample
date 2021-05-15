const createError = require("http-errors");
import express, { Request, Response, urlencoded } from "express";
import { Provider } from "oidc-provider";
import { generators, Issuer } from 'openid-client';

const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const body = urlencoded({ extended: false });

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
// app.set('view engine', 'pug');
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
const nonce = generators.nonce();

const oidc = new Provider("http://localhost:3000", {
  clients: [
    {
      client_id: "foo",
      client_secret: "bar",
      redirect_uris: ["https://azure.fieldassist.io/","http://localhost:3000/select"],
      grant_types: ["implicit"],
      response_types: ["id_token"],
      token_endpoint_auth_method: "none",

    },
  ],
  responseTypes: ["id_token"],
  scopes: ["openid"],
  features: {
    devInteractions: {
      enabled: false,
    },
  },

  async loadExistingGrant(ctx) {
    const grantId =
      (ctx?.oidc?.result &&
        ctx?.oidc?.result?.consent &&
        ctx?.oidc?.result?.consent?.grantId) ||
      ctx?.oidc?.session?.grantIdFor(ctx?.oidc?.client?.clientId!);

    if (grantId) {
      return ctx?.oidc?.provider?.Grant.find(grantId);
    } else {
      const grant = new ctx.oidc.provider.Grant();
      (grant.clientId = ctx?.oidc?.client?.clientId),
        (grant.accountId = ctx?.oidc?.session?.accountId),
        grant.addOIDCScope("openid email profile");
      grant.addOIDCClaims(["first_name"]);
      grant.addResourceScope(
        "urn:example:resource-indicator",
        "api:read api:write"
      );
      await grant.save();
      return grant;
    }
  },
});


app.use("/oidc", oidc.callback());

function setNoCache(req: Request, res: Response, next: any) {
  res.set("Pragma", "no-cache");
  res.set("Cache-Control", "no-cache, no-store");
  next();
}

app.get("/interaction/:uid", async (req, res, next) => {
  try {
    const { uid, prompt, params, session } = await oidc.interactionDetails(
      req,
      res
    );

    const id: unknown = params.client_id;
    const client11 = await oidc.Client.find(typeof id === "string" ? id : "12");
    switch (prompt.name) {
      case "login": {
        return res.render("login", {
          client11,
          uid,
          details: prompt.details,
          params,
          title: "Sign-in",
          //session: session ? debug(session) : undefined,
          // dbg: {
          //   params: debug(params),
          //   prompt: debug(prompt),
          // },
        });
      }
      default:
        return undefined;
    }
  } catch (err) {
    return next(err);
  }
});

app.post(
  "/interaction/:uid/login",
  setNoCache,
  body,
  async (req, res, next) => {
    try {
      const {
        prompt: { name },
      } = await oidc.interactionDetails(req, res);

      const result = {
        login: {
          accountId: "12345",
        },
      };

      await oidc.interactionFinished(req, res, result, {
        mergeWithLastSubmission: false,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

app.get('/', async (req, res, next) => {

  const issuer = await Issuer.discover('http://localhost:3000/oidc')
  const client = new issuer.Client({
    client_id: 'foo',
    response_types: ['id_token'],
    redirect_uris: ['http://localhost:3000/select']
  })

  const url = client.authorizationUrl({
    scope: 'openid email profile',
    nonce,
  });

  res.redirect(url);
});


app.get('/success', (req, res, next) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>Success {{ url }}</div>`
  })

  renderer.renderToString(app, (err: Error, html: any) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `)
  })
})

app.get('/select', (req, res, next) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>Select a company {{ url }}</div>`
  })

  renderer.renderToString(app, (err: Error, html: any) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `)
  })
})

// app.get('/', (req, res, next) => {
//   const app = new Vue({
//     data: {
//       url: req.url
//     },
//     template: `<div>The visited URL is: {{ url }}</div>`
//   })

//   renderer.renderToString(app, (err: Error, html: any) => {
//     if (err) {
//       res.status(500).end('Internal Server Error')
//       return
//     }
//     res.end(`
//       <!DOCTYPE html>
//       <html lang="en">
//         <head><title>Hello</title></head>
//         <body>${html}</body>
//       </html>
//     `)
//   })
// })

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: Request, res: Response, next: any) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`The application is listening on port ${port}!`);
});
