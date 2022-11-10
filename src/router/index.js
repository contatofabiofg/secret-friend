import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Result from '../components/Result.vue'
import Login from '../components/Login.vue'
import SiginUp from '../components/SiginUp.vue'
import ResetPass from '../components/ResetPass.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

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
    {
      path: '/siginup',
      name: 'SiginUp',
      component: SiginUp,
    },
    {
      path: '/resetpass',
      name: 'ResetPass',
      component: ResetPass,
    },
  ],
})

router.beforeEach((to, from, next) => {
  debugger
  if (to.meta.authUsuario) {
    const auth = getAuth()

    onAuthStateChanged(auth, () => {
      if (auth.currentUser) {
        if (
          auth.currentUser.emailVerified ||
          auth.currentUser.providerData[0].providerId == 'facebook.com'
        ) {
          next()
        } else {
          //CORRIGIR AQUI DEPOIS PRA SÓ PERMITIR COM LOGIN
          next('/login')
          //next()
        }
      } else {
        next('/login')
      }
    })
  } else {
    next()
  }
})

export default router
