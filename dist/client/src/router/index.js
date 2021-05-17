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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var vue_router_1 = __importDefault(require("vue-router"));
var Home_vue_1 = __importDefault(require("../views/Home.vue"));
var Root_vue_1 = __importDefault(require("../views/Root.vue"));
var Error_vue_1 = __importDefault(require("../views/Error.vue"));
vue_1.default.use(vue_router_1.default);
var routes = [
    {
        path: '/',
        name: 'Root',
        component: Root_vue_1.default
    },
    {
        path: '/interaction/:uid',
        name: 'Home',
        component: Home_vue_1.default
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () { return Promise.resolve().then(function () { return __importStar(require(/* webpackChunkName: "about" */ '../views/About.vue')); }); }
    },
    {
        path: '/error',
        name: 'Error',
        component: Error_vue_1.default
    }
];
var router = new vue_router_1.default({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
});
exports.default = router;
//# sourceMappingURL=index.js.map