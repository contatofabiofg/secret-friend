<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createName, deleteNames, getAllDocs } from '../firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const auth = getAuth()
const router = useRouter()
const collection = ref('')
const nameInput = ref('')
const nameList = ref([])
const secondNameList = ref([])
const result = ref([])
const copyClicked = ref(false)

onAuthStateChanged(auth, () => {
  if (auth.currentUser) {
    collection.value = auth.currentUser.email
    getData()
  }
})

async function getData() {
  result.value = []
  console.log('chegou no getData')
  let data = await getAllDocs(collection.value)
  console.log(data)
  data.forEach((element) => {
    let obj = { name: element.data().name, pass: element.data().pass }
    result.value.push(obj)
  })
}

function addToList() {
  if (result.value.length > 0) {
    if (
      window.confirm(
        'Ao adicionar um novo nome, você apagará o sorteio atual. Deseja continuar'
      )
    ) {
      deleteAll()
    } else {
      return false
    }
  }

  if (nameInput.value != '') {
    if (nameList.value.length < 20) {
      nameList.value.push(nameInput.value)
      nameInput.value = ''
    } else {
      alert('Limite de 20 nomes por sorteio atingido')
    }
  }
}

function eraseName(index) {
  nameList.value.splice(index, 1)
}

function sort() {
  secondNameList.value = []
  let backupList = []
  for (let i = 0, j = nameList.value.length - 1; i <= j; i++) {
    let number = Math.floor(Math.random() * 10)
    if (number % 2 == 0) {
      backupList.push(nameList.value[i])
    } else {
      backupList.unshift(nameList.value[i])
    }
  }
  for (let i = 0, j = nameList.value.length - 1; i <= j; i++) {
    let number = Math.floor(Math.random() * 10)
    if (number % 2 == 0) {
      secondNameList.value.push(backupList[i])
    } else {
      secondNameList.value.unshift(backupList[i])
    }
  }

  checkValues()
}

function checkValues() {
  let pass = true
  for (let i = 0, j = nameList.value.length - 1; i <= j; i++) {
    if (nameList.value[i] == secondNameList.value[i]) {
      pass = false
    }
  }
  if (pass) {
    generateResult()
  } else {
    sort()
  }
}

function generateResult() {
  result.value = []
  for (let i = 0, j = nameList.value.length; i < j; i++) {
    let obj = {
      name: nameList.value[i],
      friend: secondNameList.value[i],
      pass: Math.random().toString().slice(3, 7),
    }
    createName(obj, collection.value)
    result.value.push(obj)
  }
}

function copy(name, pass) {
  copyClicked.value = true
  setTimeout(() => {
    copyClicked.value = false
  }, 2000)
  navigator.clipboard.writeText(
    `Acesse o site https://secret-friend-phi.vercel.app/resultado/${collection.value} e veja quem você tirou no Amigo Secreto! Basta incluir seu nome (${name}) e sua senha (${pass})`
  )
}

function shareWhatsapp(name, pass) {
  let texto = encodeURIComponent(
    `Acesse o site https://secret-friend-phi.vercel.app/resultado/${collection.value} e veja quem você tirou no Amigo Secreto! Basta incluir seu nome (${name}) e sua senha (${pass})`
  )
  let link = 'https://api.whatsapp.com/send?text=' + texto
  window.open(link, '_blank').focus()
}

function deleteAll() {
  if (
    window.confirm('Tem deseja que deseja apagar esse sorteio e fazer um novo?')
  ) {
    result.value = []
    secondNameList.value = []
    nameList.value = []
    deleteNames(collection.value)
  } else {
    return false
  }
}
</script>

<template>
  <div class="flex flex-col items-center">
    <label for="collection" class="text-xs text-slate-600 mt-5"
      >Código do sorteio</label
    >
    <p class="text-xs text-slate-600 mb-4">{{ collection }}</p>

    <label for="name" class="text-xs text-slate-600"
      >Insira pelo menos três nomes</label
    >
    <div class="flex w-full mt-1">
      <input
        type="text"
        id="name"
        v-model="nameInput"
        placeholder=""
        @keyup.enter="addToList()"
      />
      <button @click="addToList()">+</button>
    </div>

    <div v-if="result.length == 0" class="w-full flex flex-col items-center">
      <h2 class="mt-2">Lista de Nomes</h2>
      <div
        class="my-2 h-60 rounded w-full border border-slate-300"
        :class="[nameList.length > 7 ? 'overflow-y-scroll' : 'overflow-hidden']"
      >
        <div v-if="nameList.length > 0">
          <ul v-for="(name, index) in nameList" :key="index">
            <li
              @click="eraseName(index)"
              class="select-none text-center cursor-pointer w-full border-b border-slate-300 py-1"
            >
              - {{ name }} <span>❌</span>
            </li>
          </ul>
        </div>
      </div>

      <button v-if="nameList.length > 2" @click="sort()" class="w-full">
        Sortear
      </button>
      <div v-else class="h-10"></div>
    </div>

    <div v-else class="w-full flex flex-col items-center">
      <h2 class="mt-2">Nomes e senhas</h2>
      <div
        class="my-2 h-48 rounded w-full border border-slate-300"
        :class="[result.length > 5 ? 'overflow-y-scroll' : 'overflow-hidden']"
      >
        <div class="flex flex-col">
          <div
            v-for="(item, index) in result"
            :key="index"
            class="flex justify-between p-1 py-2 text-sm border-b border-slate-300"
          >
            <p><b>Nome:</b> {{ item.name }} <b>senha:</b> {{ item.pass }}</p>
            <div>
              <img
                src="../assets/copy.png"
                alt="copy"
                class="w-5 cursor-pointer inline"
                @click="copy(item.name, item.pass)"
              />
              <img
                src="../assets/whatsapp.png"
                alt="copy"
                class="w-5 cursor-pointer inline ml-2 mr-1"
                @click="shareWhatsapp(item.name, item.pass)"
              />
            </div>
          </div>
        </div>
      </div>
      <button v-if="result.length > 0" @click="deleteAll()" class="w-full">
        Resetar sorteio
      </button>
      <button
        v-if="result.length > 0"
        @click="router.push('/resultado/' + collection)"
        class="w-full"
      >
        Resultado
      </button>
      <div v-else class="h-10"></div>
    </div>
  </div>

  <span
    :class="[copyClicked ? 'opacity-100' : 'opacity-0']"
    class="bg-white/75 p-2 text-xs fixed top-5 right-5 z-10 duration-100 select-none"
    >Copiado!</span
  >
</template>

<style scoped></style>
