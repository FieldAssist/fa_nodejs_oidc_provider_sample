"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@babel/polyfill");
require("mutationobserver-shim");
var vue_1 = __importDefault(require("vue"));
require("./plugins/bootstrap-vue");
require("./plugins/axios-vue");
var App_vue_1 = __importDefault(require("./App.vue"));
var router_1 = __importDefault(require("./router"));
vue_1.default.config.productionTip = false;
new vue_1.default({
    router: router_1.default,
    render: function (h) { return h(App_vue_1.default); }
}).$mount('#app');
//# sourceMappingURL=main.js.map