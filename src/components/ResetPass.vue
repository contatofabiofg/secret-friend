<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

const router = useRouter()
const auth = getAuth()
const emailInput = ref(null)

function resetPass() {
  if (emailInput.value.toString().length > 5) {
    sendPasswordResetEmail(auth, emailInput.value)
      .then(() => {
        alert('Enviamos um e-mail para você redefinir a sua senha!')
        router.push({ name: 'Login' })
      })
      .catch((error) => {
        alert(
          'Não conseguimos enviar o e-mail de redefinição de senha. Erro:' +
            error
        )
      })
  }
}
</script>

<template>
  <div class="flex flex-col justify-center h-full">
    <label for="email">E-mail</label>
    <input type="text" id="email" v-model="emailInput" />
    <button @click="resetPass()">Redefinir Senha</button>
    <button @click="router.push('/')" class="w-full">Ir para a Home</button>
  </div>
</template>

<style scoped></style>
