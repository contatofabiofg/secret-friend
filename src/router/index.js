import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Result from '../components/Result.vue'
import Login from '../components/Login.vue'
import { getAuth } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        authUsuario: true,
      },
    },
    {
      path: '/resultado/:id',
      name: 'Result',
      component: Result,
    },

    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const currentUser = getAuth().currentUser

  // rota obriga usuário logado
  if (to.meta.authUsuario) {
    // usuário está logado?
    if (currentUser) {
      next()
    } else {
      //CORRIGIR AQUI DEPOIS PRA SÓ PERMITIR COM LOGIN
      next('/login')
      //next()
    }
  } else {
    next()
  }
})

export default router
