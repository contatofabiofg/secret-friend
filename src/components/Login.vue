<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  getAuth,
  signInWithRedirect,
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth'

const router = useRouter()
const auth = getAuth()
const providerFacebook = new FacebookAuthProvider()
const providerGoogle = new GoogleAuthProvider()

onMounted(() => {
  console.log(auth.currentUser)
}),
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      //const uid = user.uid;
      router.push({ name: 'Home' })
      // ...
    } else {
      // User is signed out
      // ...
    }
  })

function handleFacebookLogin() {
  signInWithRedirect(auth, providerFacebook)
}

function handleGoogleLogin() {
  signInWithRedirect(auth, providerGoogle)
}
</script>

<template>
  <div class="flex flex-col justify-center h-full">
    <label for="email">Email</label>
    <input type="text" id="email" />
    <label for="pass">Senha</label>
    <input type="text" id="pass" />
    <div class="flex justify-between text-xs my-2">
      <a href="">Criar nova conta</a>
      <a href="">Esqueceu a senha?</a>
    </div>
    <button>Entrar</button>

    <div
      tabindex="0"
      class="w-full p-3 border bg-white rounded-md drop-shadow-lg hover:bg-slate-100 border-slate-200 mb-2 mt-4 text-center cursor-pointer select-none"
      @click="handleFacebookLogin"
    >
      Entrar com Facebook
      <img
        src="../assets/facebook.png"
        alt=""
        role="presentation"
        class="w-5 ml-1 inline"
      />
    </div>
    <div
      tabindex="0"
      class="w-full p-3 border bg-white rounded-md drop-shadow-lg hover:bg-slate-100 border-slate-200 text-center cursor-pointer select-none"
      @click="handleGoogleLogin"
    >
      Entrar com Google
      <img
        src="../assets/google.png"
        alt=""
        role="presentation"
        class="w-5 ml-1 inline"
      />
    </div>
  </div>
</template>

<style scoped></style>
