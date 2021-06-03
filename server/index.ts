const createError = require("http-errors");
import express, { Request, Response, urlencoded } from "express";
import { ErrorOut, errors, InteractionResults, KoaContextWithOIDC, Provider } from "oidc-provider";
import { generators, Issuer } from 'openid-client';
import helmet from 'helmet';

const cors = require('cors');
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const history = require('connect-history-api-fallback');
const body = urlencoded({ extended: false });

const app = express();

app.use(helmet());


const staticFileMiddleware = express.static(path.join(__dirname, 'dist/client'));
app.use(staticFileMiddleware);
app.use(history({
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
app.use(staticFileMiddleware);

app.use(logger("all"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(cors())
const nonce = generators.nonce();

const oidc = new Provider("https://falogin.azurewebsites.net", {
  clients: [
    {
      client_id: "foo",
      client_secret: "bar",
      redirect_uris: ["http://localhost:3000/select", "https://falogin.azurewebsites.net/select", "https://fieldassistsupport.freshworks.com/sp/OIDC/318288514547605716/callback"],
      // redirect_uris: ["https://falogin.azurewebsites.net/select", "https://fieldassistsupport.freshworks.com/sp/OIDC/318288514547605716/callback"],
      response_types: ["code", "id_token"],
      scope: 'openid email',
      grant_types: ['implicit', 'authorization_code'],
    },
  ],
  issueRefreshToken: () => { return false;},
  responseTypes: ["id_token", "code"],
  scopes: ["openid", "email"],
  formats: {
    AccessToken: 'jwt',
  },

  tokenEndpointAuthMethods: ["client_secret_basic", "client_secret_jwt",],
  conformIdTokenClaims: false,
  features: {
    jwtUserinfo: {
      enabled: false
    },
    userinfo: {
      enabled: false,
    },
    devInteractions: {
      enabled: false,
    },
    rpInitiatedLogout: {
      enabled: true,
      postLogoutSuccessSource: async function postLogoutSuccessSource(ctx) {
        ctx.response.redirect(`/logout-success`)
      },
    },
  },
  pkce: {
    methods: [
      'S256',
    ],
    required: function pkceRequired(ctx, client) {
      return false;
    },
  },
  claims: {
    email: ['email', 'email_verified'],
  },
  async findAccount(ctx, sub, token) {
    return {
      accountId: sub,
      async claims() {
        return { sub, email: sub };
      },
    };
  },
  async extraAccessTokenClaims(ctx, token) {
    const claims = ctx.oidc.account;
    return {
      email: claims?.accountId,
    };
  },
  renderError(ctx: KoaContextWithOIDC,
              out: ErrorOut,
              error: errors.OIDCProviderError | Error,
  ) {
    console.log(error)
    ctx.response.redirect(`/error#error=${out.error}&message=${out.error_description}`)
  },
});
oidc.Session.prototype.promptedScopesFor = () => new Set(['openid', 'email']);

app.use("/oidc", oidc.callback);

app.post(
  "/interaction/:uid/login",
  body,
  async (req, res, next) => {
    try {
      const interaction = await oidc.interactionDetails(req, res);
      console.log(interaction);

      if (req.body.password !== 'abc') {
        const out = {
          error: "Access Denied",
          error_description: "Invalid Credentials"
        }
        return res.redirect(`/interaction/${interaction.uid}#error=${out.error}&message=${out.error_description}`)
      } else {
        const result: InteractionResults = {
          login: {
            account: req.body.email,
            remember: true,
          },
        };
        return oidc.interactionFinished(req, res, result, {
          mergeWithLastSubmission: true,
        });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

app.post(
  "/api/forgot-password",
  body,
  async (req, res, next) => {
    res.redirect('/password-change-success#email=' + req.body.email)
  }
);

app.get('/api/url', async (req, res, next) => {
  const host = process.env.NODE_ENV == 'production' ? 'https://falogin.azurewebsites.net' : 'http://localhost:3000'
  const issuer = await Issuer.discover(host + '/oidc')
  const client = new issuer.Client({
    client_id: 'foo',
    response_types: ['id_token', 'code'],
    redirect_uris: ['https://fieldassistsupport.freshworks.com/sp/OIDC/318288514547605716/callback']
  })

  const url = client.authorizationUrl({
    scope: 'openid email profile',
    nonce,
  });

  res.send(url);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err)
  // set locals, only providing error in development
  res.locals.message = err.message ?? "Unknown Error";
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  // res.render("error");
  res.redirect(`/error#error=${res.locals.message}&message=${res.locals.error}`)
  // res.sendFile(path.join(__dirname + '/client/dist/index.html'));

});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`The application is listening on port ${port}!`);
});
