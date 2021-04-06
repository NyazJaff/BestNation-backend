import Vue from 'vue'
import firebase from "firebase/app";
import "firebase/firestore";

Vue.use(VueCompositionAPI)
import VueCompositionAPI from '@vue/composition-api'
import { ref, onUnmounted } from '@vue/composition-api'

const config = {
  apiKey: "AIzaSyBVSg8yc7e9Aman5ACo3LJwsxKUZUcwCWo",
  authDomain: "bestnation-flutter.firebaseapp.com",
  projectId: "bestnation-flutter",
  storageBucket: "bestnation-flutter.appspot.com",
  messagingSenderId: "902900849409",
  appId: "1:902900849409:web:c4a97021eac4a921645900",
  measurementId: "G-9WL7RBRB2C"
};

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();
const usersCollection = db.collection("users");

export const createUser = user => {
  return usersCollection.add(user);
};

export const getUser = async id => {
  const user = await usersCollection.doc(id).get();
  return user.exists ? user.data() : null;
};

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user);
};

export const deleteUser = id => {
  return usersCollection.doc(id).delete();
};

export const useLoadUsers = parentId => {

  const users = ref([])
  const close = usersCollection.where("parentId", "==", parentId).orderBy('order').onSnapshot(snapshot => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close);
  return users;
};
