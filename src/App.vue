<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const auth = getAuth()
const router = useRouter()
const logoutLink = ref(false)
const collection = ref(null)

onAuthStateChanged(auth, () => {
  debugger
  if (
    (auth.currentUser && auth.currentUser.emailVerified) ||
    (auth.currentUser &&
      auth.currentUser.providerData[0].providerId == 'facebook.com')
  ) {
    collection.value = auth.currentUser.email
    logoutLink.value = true
  } else {
    logoutLink.value = false
  }
})

function logout() {
  auth.signOut()

  router.push({ name: 'Login' })
}
</script>

<template>
  <div class="flex flex-col justify-center items-center mt-10 lg:mt-7 mb-3">
    <div
      class="w-[350px] max-w-[95%] flex flex-col items-center bg-white py-3 mt-3 lg:mt-20 rounded-lg"
    >
      <img
        src="./assets/title.png"
        alt="Amigo Secreto Banner"
        class="w-[80%] ml-3 mb-3"
      />

      <div class="w-full px-3 h-full">
        <router-view></router-view>
      </div>
    </div>
    <div class="text-xs text-white mt-2 opacity-50">
      Desenvolvido por
      <a href="https://github.com/contatofabiofg" target="_blank">
        Fábio Gonçalves</a
      >
    </div>
  </div>

  <div
    v-if="logoutLink"
    class="flex fixed top-5 left-5 cursor-pointer opacity-80 hover:opacity-100 duration-100"
    @click="logout()"
  >
    <img
      src="./assets/logout.png"
      class="invert w-5"
      alt=""
      role="presentation"
    />
    <a class="text-white hover:text-white">Sair</a>
  </div>
</template>

<style scoped></style>
