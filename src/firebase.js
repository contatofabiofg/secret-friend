import { initializeApp } from "firebase/app";
import { ref, onUnmounted } from "vue";

const config = {
  apiKey: "AIzaSyB61kMPm3s2bA6ggze9CElLzW9ol0W-5Cw",
  authDomain: "vue-secret-friend.firebaseapp.com",
  projectId: "vue-secret-friend",
  storageBucket: "vue-secret-friend.appspot.com",
  messagingSenderId: "330694535357",
  appId: "1:330694535357:web:8149ba347f807119c0efd4",
};

const firebaseApp = initializeApp(config);

const db = firebaseApp.firestore();
const namesCollection = db.collection("names");

export const createName = (name) => {
  return namesCollection.add(name);
};

export const getName = async (id) => {
  const name = await namesCollection.doc(id).get();
  return name.exists ? name.data() : null;
};

export const updateName = (id, name) => {
  return namesCollection.doc(id).update(name);
};

export const deleteName = (id) => {
  return namesCollection.doc(id).delete();
};
