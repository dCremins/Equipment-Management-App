import { createStore, compose } from 'redux'
import rootReducer from './reducer'
import { firebase as firebaseConfig } from './config'
import { reactReduxFirebase } from 'react-redux-firebase'

// react-redux-firebase options
const config = {
  userProfile: 'users', // firebase root where user profiles are stored
  enableLogging: false, // enable/disable Firebase's database logging
}

// Add redux Firebase to compose
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebaseConfig, config)
)(createStore)

// Create store with reducers and initial state
const store = createStoreWithFirebase(rootReducer)

export default store
