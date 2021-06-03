import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '../views/Login.vue'
import Root from '../views/Root.vue'
import Error from '../views/Error.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import PasswordSuccessChange from '../views/PasswordChangeSuccess.vue'
import LogoutSuccess from '../views/LogoutSuccess.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Root',
    component: Root
  },
  {
    path: '/interaction/:uid',
    name: 'Login',
    component: Login
  },
  {
    path: '/select',
    name: 'Select',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Select.vue')
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/password-change-success',
    name: 'ForgotPassword',
    component: PasswordSuccessChange
  },
  {
    path: '/logout-success',
    name: 'LogoutSuccess',
    component: LogoutSuccess
  },
  {
    path: '/error',
    name: 'Error',
    component: Error
  },
  {
    path: '*',
    name: 'Error',
    component: Error
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
