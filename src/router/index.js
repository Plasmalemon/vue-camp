import Vue from 'vue'
import VueRouter from 'vue-router'
// import VueRouter from '../kvue-router'
import Home from '../views/Home.vue'

// 路由步骤：1、2、3、4
// 路由1. 应用插件
Vue.use(VueRouter) // use执行了插件的install()

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
// 路由2. 创建实例
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
