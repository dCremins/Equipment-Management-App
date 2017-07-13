import { createStore, compose } from 'redux'
import rootReducer from './reducer'
import { reactReduxFirebase } from 'react-redux-firebase'
import * as firebase from 'firebase'

  const config = {
    userProfile: 'users', // saves user profiles to '/users' on Firebase
    // here is where you place other config options
    updateProfileOnLogin: false, // enable/disable updating of profile on login
    presence: 'presence',
  }

  const fbConfig = {
    apiKey: "AIzaSyDM-UyJ8n4GACE5ZXgePiTgiM396bZrZ3w",
    authDomain: "equipment-test-601a4.firebaseapp.com",
    databaseURL: "https://equipment-test-601a4.firebaseio.com",
    projectId: "equipment-test-601a4",
    storageBucket: "equipment-test-601a4.appspot.com",
    messagingSenderId: "718238201485"
  }
  firebase.initializeApp(fbConfig)

  const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, config),
  )(createStore)

  const store = createStoreWithFirebase(rootReducer)

export default store
