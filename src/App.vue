<script setup>
import { useRouter } from 'vue-router'
import { getAuth } from 'firebase/auth'

const auth = getAuth()
const router = useRouter()

function logout() {
  auth.signOut()

    router.push({ name: 'Login' })
}

</script>


<template>
<div class="w-full h-screen flex flex-col justify-center items-center">
    <div class="w-[350px] max-w-[95%] flex flex-col justify-center items-center bg-white py-3 rounded-lg">
    <img src="./assets/title.png" alt="Amigo Secreto Banner" class="w-[90%]">
    <div class="flex mb-5">
      <a @click="router.push('/')" >Home</a>
      |
      <a @click="router.push('/resultado')">Resultado</a>
      |
      <a @click="logout()">Sair</a>

      
     </div>
     <div class="w-full px-3">
      <router-view></router-view>
     </div>
    
  </div>
  <div class="text-xs text-white mt-2 opacity-50">Desenvolvido por <a href="https://github.com/contatofabiofg" target="_blank"> Fábio Gonçalves</a></div>
</div>
  
</template>

<style scoped></style>
