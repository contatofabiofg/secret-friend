import { createRouter, createWebHistory } from 'vue-router'
import Home from "../components/Home.vue"
import Result from "../components/Result.vue"

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
  ]
})

export default router