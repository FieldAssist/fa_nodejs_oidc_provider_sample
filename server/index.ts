const createError = require ("http-errors");
import express, { Request, Response, urlencoded } from "express";
import { Provider } from "oidc-provider";
import { generators, Issuer } from 'openid-client';
import helmet from 'helmet';

var cors = require ('cors')

const path = require ("path");
const cookieParser = require ("cookie-parser");
const logger = require ("morgan");
const Vue = require ('vue')
const server = require ('express') ()
const renderer = require ('vue-server-renderer').createRenderer ()
var history = require ('connect-history-api-fallback');

const indexRouter = require ("./routes");
const usersRouter = require ("./routes/users");
const body = urlencoded ({ extended: false });

const app = express ();
app.use (helmet ());
// view engine setup
app.set ("views", path.join (__dirname, "views"));
//app.use(express.static(path.join(__dirname, '/client/dist')));

// app.set('view engine', 'pug');
// app.set("view engine", "ejs");
const staticFileMiddleware = express.static (path.join (__dirname + '/client/dist'));

app.use (staticFileMiddleware);
app.use (history ({
  disableDotRule: true,
  verbose: true,
  rewrites: [
    {
      from: /^\/oidc\/.*$/,
      to: function (context: any) {
        return context.parsedUrl.path;
      }
    },
    {
      from: /^\/api\/.*$/,
      to: function (context: any) {
        return context.parsedUrl.path;
      }
    }
  ]
}));
app.use (staticFileMiddleware);

app.use (logger ("dev"));
app.use (express.json ());
app.use (express.urlencoded ({ extended: false }));
app.use (cookieParser ());
app.use (express.static ("public"));
app.use (cors ())
const nonce = generators.nonce ();

const oidc = new Provider ("https://falogin.azurewebsites.net", {
  clients: [
    {

      client_id: "foo",
      client_secret: "bar",
      redirect_uris: ["https://azure.fieldassist.io/", "https://falogin.azurewebsites.net/about"],
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
  async loadExistingGrant (ctx) {
    const grantId =
      (ctx?.oidc?.result &&
        ctx?.oidc?.result?.consent &&
        ctx?.oidc?.result?.consent?.grantId) ||
      ctx?.oidc?.session?.grantIdFor (ctx?.oidc?.client?.clientId!);

    if (grantId) {
      return ctx?.oidc?.provider?.Grant.find (grantId);
    } else {
      const grant = new ctx.oidc.provider.Grant ();
      (grant.clientId = ctx?.oidc?.client?.clientId),
        (grant.accountId = ctx?.oidc?.session?.accountId),
        grant.addOIDCScope ("openid email profile");
      grant.addOIDCClaims (["first_name"]);
      grant.addResourceScope (
        "urn:example:resource-indicator",
        "api:read api:write"
      );
      await grant.save ();
      return grant;
    }
  },
  async findAccount (ctx, id) {
    console.log (`Called findAccount: ${ id }`);
    return {
      accountId: id,
      async claims (use, scope) { return { sub: id }; },
    };
  }
});

app.use ("/oidc", oidc.callback ());

app.get ("/interaction/:uid", async (req, res, next) => {
  try {
    const { uid, prompt, params, session } = await oidc.interactionDetails (
      req,
      res
    );

    console.log (uid)

    res.redirect ('/');

    // const id: unknown = params.client_id;
    // const client11 = await oidc.Client.find(typeof id === "string" ? id : "12");
    // switch (prompt.name) {
    //   case "login": {

    //     res.render("index", { users: [] });

    //     return res.render("login", {
    //       client11,
    //       uid,
    //       details: prompt.details,
    //       params,
    //       title: "Sign-in",
    //       //session: session ? debug(session) : undefined,
    //       // dbg: {
    //       //   params: debug(params),
    //       //   prompt: debug(prompt),

    //       // },
    //     });
    //   }
    //   default:
    //     return undefined;
    // }
  } catch (err) {
    return next (err);
  }
});

app.post (
  "/interaction/:uid/login",
  body,
  async (req, res, next) => {
    try {
      const interaction = await oidc.interactionDetails (req, res);

      const result = {
        login: {
          accountId: req.body.email,
        },
      };

      await oidc.interactionFinished (req, res, result, {
        mergeWithLastSubmission: false,
      });
    } catch (err) {
      console.error (err);
      next (err);
    }
  }
);

app.get ('/api/url', async (req, res, next) => {
  const host = process.env.NODE_ENV == 'production' ? 'https://falogin.azurewebsites.net' : 'http://localhost:3000'
  const issuer = await Issuer.discover (host+'/oidc')
  const client = new issuer.Client ({
    client_id: 'foo',
    response_types: ['id_token'],
    redirect_uris: ['https://falogin.azurewebsites.net/about']
  })

  const url = client.authorizationUrl ({
    scope: 'openid email profile',
    nonce,
  });

  console.log (url)
  res.send (url);
});

// catch 404 and forward to error handler
app.use ((req, res, next) => {
  next (createError (404));
});

// error handler
app.use ((err: any, req: Request, res: Response, next: any) => {
  // set locals, only providing error in development
  res.locals.message = err.message ?? "Unknown Error";
  res.locals.error = req.app.get ("env") === "development" ? err : {};
  // render the error page
  res.status (err.status || 500);
  // res.render("error");
  res.redirect (`/error#error=${ res.locals.message }&message=${ res.locals.error }`)
  // res.sendFile(path.join(__dirname + '/client/dist/index.html'));

});

const port = process.env.PORT || 3000;

app.listen (port, () => {
  console.log (`The application is listening on port ${ port }!`);
});
