import * as firebase from 'firebase'

const fbConfig = {
  apiKey: "AIzaSyDM-UyJ8n4GACE5ZXgePiTgiM396bZrZ3w",
  authDomain: "equipment-test-601a4.firebaseapp.com",
  databaseURL: "https://equipment-test-601a4.firebaseio.com",
  projectId: "equipment-test-601a4",
  storageBucket: "equipment-test-601a4.appspot.com",
  messagingSenderId: "718238201485"
}

firebase.initializeApp(fbConfig)

export default fbConfig
