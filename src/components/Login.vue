<script setup>
import { onMounted } from 'vue';
import { getAuth, signInWithRedirect , FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth'

const auth = getAuth()
const providerFacebook = new FacebookAuthProvider();
const providerGoogle = new GoogleAuthProvider();

onMounted(() => {
  console.log(auth.currentUser)
}),

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log(uid)
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
