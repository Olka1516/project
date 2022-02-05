import { createRouter, createWebHistory } from 'vue-router'
import Client from '../views/Client.vue'
import SignUp from '../views/SignUp.vue'
import SignIn from '../views/SignIn.vue'

const routes = [
  {
    path: '/',
    name: 'Client',
    component: Client
  },
  {
    path: '/admin',
    name: 'Admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue')
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: SignUp
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: SignIn
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router