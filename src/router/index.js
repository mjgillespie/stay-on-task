import Vue from 'vue'
import VueRouter from 'vue-router'
import Student from '@/components/Student.vue'
import Print from '@/components/Print.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Student',
    component: Student
  },
  {
    path: '/print/:studentid',
    name: 'Print',
    props: true,
    component: Print
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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
