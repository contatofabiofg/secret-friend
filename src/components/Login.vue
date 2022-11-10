<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  getAuth,
  signInWithRedirect,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth'

const router = useRouter()
const auth = getAuth()
const emailInput = ref('')
const passInput = ref(null)
const providerFacebook = new FacebookAuthProvider()
const providerGoogle = new GoogleAuthProvider()

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

function login() {
  signInWithEmailAndPassword(auth, emailInput.value, passInput.value)
    .then(() => {
      router.push({ name: 'Home' })
    })
    .catch((error) => {
      alert(error)
    })
}

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
    <input type="text" id="email" v-model="emailInput" />
    <label for="pass">Senha</label>
    <input type="password" id="pass" v-model="passInput" />
    <div class="flex justify-between text-xs my-2">
      <a href="" @click="router.push({ name: 'SiginUp' })">Criar nova conta</a>
      <a href="">Esqueceu a senha?</a>
    </div>
    <button @click="login()">Entrar</button>

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
