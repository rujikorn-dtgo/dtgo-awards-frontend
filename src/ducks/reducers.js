import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer as router } from 'react-router-redux'

import app from './app'
import todo from './todo'
import createRequest from './createRequest'
import checkUpRequest from './CheckupRequest'
import NoMinees from './NoMinees'

export default combineReducers({
  app,
  form: formReducer,
  router,
  todo,
  createRequest,
  checkUpRequest,
  NoMinees

})