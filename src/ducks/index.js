import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'

import reducer from './reducers'
import { watchApplicationSaga } from './app'
import { watchToDoSaga } from './todo'
import { watchCreateRequestSaga } from './createRequest'
import { watchCheckUpRequestSaga } from './CheckupRequest'
import { watchNoMineesSaga } from './NoMinees'

export const configureStore = initialState => {
  const saga = createSagaMiddleware()
  const middlewares = [saga]

  const enhancers = [
    applyMiddleware(...middlewares)
  ]

  const store = createStore(reducer, initialState, composeWithDevTools(...enhancers))

  function* rootSaga() {
    yield all([
      watchApplicationSaga(),
      // watchToDoSaga(),
      // watchCreateRequestSaga(),
      // watchCheckUpRequestSaga(),
      watchNoMineesSaga()
    ])
  }
  saga.run(rootSaga)

  if (module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(reducer))
  }

  return store
}

export default configureStore({})