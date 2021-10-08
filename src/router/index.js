import { createRouter, createWebHistory } from 'vue-router'
import Client from '../views/Client.vue'

const routes = [
  {
    path: '/',
    name: 'Client',
    component: Client
    //  ,
    // meta:{keepAlive:true}
  },
  {
    path: '/admin',
    name: 'Admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue')
    // ,
    // meta:{keepAlive:true}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router


// import { Router } from 'vue-router'
// import App from '../App.vue'

// const router=new Router({
//   mode:'history',
//   routes: [
//   {
//       path: '/',
//       redirect:'/content',
//       component: App,
//       children:[
//     {path:'/admin', name:'Admin', component:admin,meta:{keepAlive:true}},
//     ]
// }
//   ]
  

// })
// export default router
