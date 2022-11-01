import { takeLatest, put } from 'redux-saga/effects'
import { createReducer, makeAction, makeKeys } from './reduxHelpers'
import { httpGet } from 'core/restClient'

const INITIALIZE = makeKeys('INITIALIZE')
const APP_LOADING = 'APP_LOADING'
const APP_LOADED = 'APP_LOADED'

export const initialize = makeAction(INITIALIZE.REQUEST)
export const appLoading = makeAction(APP_LOADING, 'message')
export const appLoaded = makeAction(APP_LOADED)

const initializeSuccess = makeAction(INITIALIZE.SUCCESS, 'data')



function* initializeApplication(action) {
  try {
    const response = yield httpGet('authen/validate')
    if (response.status >= 200 && response.status < 300) {
      localStorage.setItem('authToken', response.data.token)
      yield put(initializeSuccess(response.data.data))
    } else {
      localStorage.removeItem('authToken')
    }
    yield put(initializeSuccess({}))
  } catch (e) {
    console.log(e)
  }
}

export function* watchApplicationSaga() {
  yield takeLatest(INITIALIZE.REQUEST, initializeApplication)
}

const initial = {
  initialize: { data: {}, loading: false },
  loading: false,
  loadingMsg: 'Loading...',

}

export default createReducer(initial, state => ({
  [INITIALIZE.REQUEST]: () => ({
    ...state,
    initialize: { data: {}, loading: true }
  }),
  [INITIALIZE.SUCCESS]: (data) => ({
    ...state,
    initialize: { data: data.data, loading: false }
  }),
  [APP_LOADING]: (data) => ({
    ...state,
    loading: true,
    loadingMsg: data.message ? data.message : 'Loading...'
  }),
  [APP_LOADED]: () => ({
    ...state,
    loading: false,
    loadingMsg: 'Loading...'
  }),
}))

