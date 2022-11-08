import { createRouter, createWebHistory } from 'vue-router'
import Home from "../components/Home.vue"
import Result from "../components/Result.vue"
import Login from "../components/Login.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/resultado',
      name: 'Result',
      component: Result,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },

  ]
})

export default router