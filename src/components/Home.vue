<script setup>
import { ref } from "vue";

const nameInput = ref("");
const nameList = ref([]);
const secondNameList = ref([]);
const result = ref([]);

function addToList() {
  nameList.value.push(nameInput.value);
  nameInput.value = "";
}

function eraseName(index) {
  nameList.value.splice(index, 1);
}

function sort() {
  secondNameList.value = [];
  let backupList = [];
  for (let i = 0, j = nameList.value.length - 1; i <= j; i++) {
    let number = Math.floor(Math.random() * 10);
    if (number % 2 == 0) {
      backupList.push(nameList.value[i]);
    } else {
      backupList.unshift(nameList.value[i]);
    }
  }
  for (let i = 0, j = nameList.value.length - 1; i <= j; i++) {
    let number = Math.floor(Math.random() * 10);
    if (number % 2 == 0) {
      secondNameList.value.push(backupList[i]);
    } else {
      secondNameList.value.unshift(backupList[i]);
    }
  }

  checkValues();
}

function checkValues() {
  let pass = true;
  for (let i = 0, j = nameList.value.length - 1; i <= j; i++) {
    if (nameList.value[i] == secondNameList.value[i]) {
      pass = false;
    }
  }
  if (pass) {
    generateResult();
  } else {
    sort();
  }
}

function generateResult() {
  result.value = [];
  for (let i = 0, j = nameList.value.length; i < j; i++) {
    let obj = { name: nameList.value[i], friend: secondNameList.value[i] };
    result.value.push(obj);
  }
}
</script>

<template>
  <div>
    <label for="name">Insira aqui um dos nomes</label>
    <input
      type="text"
      id="name"
      v-model="nameInput"
      @keyup.enter="addToList()"
    />
    <button @click="addToList()">Adicionar nome</button>

    <div v-if="nameList.length > 0">
      <ul v-for="(name, index) in nameList" :key="index">
        <li @click="eraseName(index)">{{ name }}</li>
      </ul>
    </div>

    <p>Second list</p>
    <div v-if="secondNameList.length > 0">
      <ul v-for="(name, index) in secondNameList" :key="index">
        <li>{{ name }}</li>
      </ul>
    </div>

    <p>Result</p>
    <div v-if="result.length > 0">
      <ul v-for="(item, index) in result" :key="index">
        <li>{{ item.name }}/{{ item.friend }}</li>
      </ul>
    </div>

    <button @click="sort()">Sortear</button>
  </div>
</template>

<style scoped></style>
