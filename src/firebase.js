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
const textsCollection = db.collection("texts");


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

    snapshot.docs.map(doc => {
      const currentOrder = doc.data().order
      if (currentOrder !== parseInt(currentOrder, 10)){
        updateUser(doc.id, {
          order: parseInt(currentOrder, 10),
        })       
      }
    })

   users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })



  onUnmounted(close);
  return users;
};

export const useLoadTexts = parentId => {

  const texts = ref([])
  const close = textsCollection.where("parentId", "==", parentId).orderBy('order').onSnapshot(snapshot => {

    snapshot.docs.map(doc => {
      const currentOrder = doc.data().order
      if (currentOrder !== parseInt(currentOrder, 10)){
        updateText(doc.id, {
          order: parseInt(currentOrder, 10),
        })       
      }
    })
    
    texts.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close);
  return texts;
};


export const updateText = (id, text) => {
  return textsCollection.doc(id).update(text);
};

export const getText = async id => {
  const text = await textsCollection.doc(id).get();
  return text.exists ? text.data() : null;
}

export const deleteText = id => {
  return textsCollection.doc(id).delete();
};

export const createText = text => {
  return textsCollection.add(text);
};



