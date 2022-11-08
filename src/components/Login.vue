<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { getAuth, signInWithRedirect , FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth'

const auth = getAuth()
const providerFacebook = new FacebookAuthProvider();
const providerGoogle = new GoogleAuthProvider();

onMounted(() => {
  if(auth.currentUser) {
    console.log(auth.currentUser)
  }
  
}),

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    router.push({ name: 'Home' })
    // ...
  } else {
    // User is signed out
    // ...
  }
});

function handleFacebookLogin() {
   
    signInWithRedirect(auth, providerFacebook);
}


function handleGoogleLogin() {
   
   signInWithRedirect(auth, providerGoogle);
}



</script>

<template>
  <div class="w-full p-3 border border-slate-300 mb-2 text-center cursor-pointer select-none" @click="handleFacebookLogin">Entrar com Facebook</div>
  <div class="w-full p-3 border border-slate-300 text-center cursor-pointer select-none" @click="handleGoogleLogin">Entrar com Google</div>
</template>

<style scoped></style>
