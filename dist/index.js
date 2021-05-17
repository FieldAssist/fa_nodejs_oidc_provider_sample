"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var createError = require("http-errors");
var express_1 = __importStar(require("express"));
var oidc_provider_1 = require("oidc-provider");
var openid_client_1 = require("openid-client");
var cors = require('cors');
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var Vue = require('vue');
var server = require('express')();
var renderer = require('vue-server-renderer').createRenderer();
var history = require('connect-history-api-fallback');
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var body = express_1.urlencoded({ extended: false });
var app = express_1.default();
// view engine setup
app.set("views", path.join(__dirname, "views"));
//app.use(express.static(path.join(__dirname, '/client/dist')));
// app.set('view engine', 'pug');
// app.set("view engine", "ejs");
var staticFileMiddleware = express_1.default.static(path.join(__dirname + '/client/dist'));
app.use(staticFileMiddleware);
app.use(history({
    disableDotRule: true,
    verbose: true,
    rewrites: [
        {
            from: /^\/oidc\/.*$/,
            to: function (context) {
                return context.parsedUrl.path;
            }
        },
        {
            from: /^\/api\/.*$/,
            to: function (context) {
                return context.parsedUrl.path;
            }
        }
    ]
}));
app.use(staticFileMiddleware);
app.use(logger("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express_1.default.static("public"));
app.use(cors());
var nonce = openid_client_1.generators.nonce();
var oidc = new oidc_provider_1.Provider("http://localhost:3000", {
    clients: [
        {
            client_id: "foo",
            client_secret: "bar",
            redirect_uris: ["https://azure.fieldassist.io/", "http://localhost:3000/about"],
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
    loadExistingGrant: function (ctx) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        return __awaiter(this, void 0, void 0, function () {
            var grantId, grant;
            return __generator(this, function (_s) {
                switch (_s.label) {
                    case 0:
                        grantId = (((_a = ctx === null || ctx === void 0 ? void 0 : ctx.oidc) === null || _a === void 0 ? void 0 : _a.result) &&
                            ((_c = (_b = ctx === null || ctx === void 0 ? void 0 : ctx.oidc) === null || _b === void 0 ? void 0 : _b.result) === null || _c === void 0 ? void 0 : _c.consent) &&
                            ((_f = (_e = (_d = ctx === null || ctx === void 0 ? void 0 : ctx.oidc) === null || _d === void 0 ? void 0 : _d.result) === null || _e === void 0 ? void 0 : _e.consent) === null || _f === void 0 ? void 0 : _f.grantId)) ||
                            ((_h = (_g = ctx === null || ctx === void 0 ? void 0 : ctx.oidc) === null || _g === void 0 ? void 0 : _g.session) === null || _h === void 0 ? void 0 : _h.grantIdFor((_k = (_j = ctx === null || ctx === void 0 ? void 0 : ctx.oidc) === null || _j === void 0 ? void 0 : _j.client) === null || _k === void 0 ? void 0 : _k.clientId));
                        if (!grantId) return [3 /*break*/, 1];
                        return [2 /*return*/, (_m = (_l = ctx === null || ctx === void 0 ? void 0 : ctx.oidc) === null || _l === void 0 ? void 0 : _l.provider) === null || _m === void 0 ? void 0 : _m.Grant.find(grantId)];
                    case 1:
                        grant = new ctx.oidc.provider.Grant();
                        (grant.clientId = (_p = (_o = ctx === null || ctx === void 0 ? void 0 : ctx.oidc) === null || _o === void 0 ? void 0 : _o.client) === null || _p === void 0 ? void 0 : _p.clientId),
                            (grant.accountId = (_r = (_q = ctx === null || ctx === void 0 ? void 0 : ctx.oidc) === null || _q === void 0 ? void 0 : _q.session) === null || _r === void 0 ? void 0 : _r.accountId),
                            grant.addOIDCScope("openid email profile");
                        grant.addOIDCClaims(["first_name"]);
                        grant.addResourceScope("urn:example:resource-indicator", "api:read api:write");
                        return [4 /*yield*/, grant.save()];
                    case 2:
                        _s.sent();
                        return [2 /*return*/, grant];
                }
            });
        });
    },
});
app.use("/oidc", oidc.callback());
app.get("/interaction/:uid", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, uid, prompt_1, params, session, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, oidc.interactionDetails(req, res)];
            case 1:
                _a = _b.sent(), uid = _a.uid, prompt_1 = _a.prompt, params = _a.params, session = _a.session;
                console.log(uid);
                res.render(path.join(__dirname + '/client/dist/index.html'));
                return [3 /*break*/, 3];
            case 2:
                err_1 = _b.sent();
                return [2 /*return*/, next(err_1)];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/interaction/:uid/login", body, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var name_1, result, result22, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, oidc.interactionDetails(req, res)];
            case 1:
                name_1 = (_a.sent()).prompt.name;
                console.log(name_1);
                result = {
                    login: {
                        accountId: req.body.email,
                    },
                };
                return [4 /*yield*/, oidc.interactionFinished(req, res, result, {
                        mergeWithLastSubmission: false,
                    })];
            case 2:
                result22 = _a.sent();
                console.log(result22);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                console.error(err_2);
                next(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/url', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var issuer, client, url;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openid_client_1.Issuer.discover(req.baseUrl + 'http://localhost:3000/oidc')];
            case 1:
                issuer = _a.sent();
                client = new issuer.Client({
                    client_id: 'foo',
                    response_types: ['id_token'],
                    redirect_uris: ['http://localhost:3000/about']
                });
                url = client.authorizationUrl({
                    scope: 'openid email profile',
                    nonce: nonce,
                });
                console.log(url);
                res.send(url);
                return [2 /*return*/];
        }
    });
}); });
app.get('/success', function (req, res, next) {
    var app = new Vue({
        data: {
            url: req.url
        },
        template: "\n      <div>Successcc {{ url }}</div>"
    });
    renderer.renderToString(app, function (err, html) {
        if (err) {
            res.status(500).end('Internal Server Error');
            return;
        }
        res.end("\n      <!DOCTYPE html>\n      <html lang=\"en\">\n        <head><title>Hello</title></head>\n        <body>" + html + "</body>\n      </html>\n    ");
    });
});
// app.get('/select', (req, res, next) => {
//   res.redirect('/about')
// })
app.get('/', function (req, res, next) {
    var app = new Vue({
        data: {
            url: req.url
        },
        template: "\n      <div>The visited URL is: {{ url }}</div>"
    });
    renderer.renderToString(app, function (err, html) {
        if (err) {
            res.status(500).end('Internal Server Error');
            return;
        }
        res.end("\n      <!DOCTYPE html>\n      <html lang=\"en\">\n        <head><title>Hello</title></head>\n        <body>" + html + "</body>\n      </html>\n    ");
    });
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    var _a;
    // set locals, only providing error in development
    res.locals.message = (_a = err.message) !== null && _a !== void 0 ? _a : "Unknown Error";
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    // res.render("error");
    res.redirect("/error#error=" + res.locals.message + "&message=" + res.locals.error);
    // res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("The application is listening on port " + port + "!");
});
//# sourceMappingURL=index.js.map