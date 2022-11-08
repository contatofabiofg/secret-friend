<script setup>

import { getAuth, signInWithRedirect , FacebookAuthProvider } from 'firebase/auth'

const auth = getAuth()
const provider = new FacebookAuthProvider();





function handleFacebookLogin() {
   
    signInWithRedirect(auth, provider);
}


</script>

<template>
  <div class="w-full p-3 border border-slate-300 mb-2 text-center cursor-pointer select-none" @click="handleFacebookLogin">Entrar com Facebook</div>
  <div class="w-full p-3 border border-slate-300 text-center cursor-pointer select-none">Entrar com Google</div>
</template>

<style scoped></style>
