import { takeLatest, put } from 'redux-saga/effects'
import { createReducer, makeAction, makeKeys } from './reduxHelpers'
import { httpGet, httpPost, httpPut, httpDelete } from 'core/restClient'
import history from 'core/history'
import axios from 'axios'
import {
  todoDetailPath,
  todoListPath
} from 'routes'


const GET_CHOICE_AWARDS = makeKeys('GET_CHOICE_AWARDS');
const GET_NOMINEES_PAGE = makeKeys('GET_NOMINEE_PAGE');

export const getChoiceAwards = makeAction(GET_CHOICE_AWARDS.REQUEST, 'data')
export const getNomineesPage = makeAction(GET_NOMINEES_PAGE.REQUEST, 'id')


const getChoiceAwardsSuccess = makeAction(GET_CHOICE_AWARDS.SUCCESS, 'data')
const getNomineesPageSuccess = makeAction(GET_NOMINEES_PAGE.SUCCESS, 'data')


const basePath = path => path ? `basePath/${path}` : 'basePath' // config api path
const multipartHeader = { 'Content-Type': 'multipart/form-data', } //multipart for API upload file


function* getNoMineesPageRequest(action) {
  const { id } = action.payload
  console.log(id)
  try {
    const response = yield httpGet(`/dtgo_award_api/nominee_page?choice_awards=${id}`)
    if (response.status >= 200 && response.status < 300) {
      //on success
      yield put(getNomineesPageSuccess(response.data))
    } else {
      //on fail
      yield put(getNomineesPageSuccess({}))
    }
  } catch (e) {
    //on fail
    console.log(e)
    yield put(getNomineesPageSuccess({}))
  }
}

function* getChoiceAwardsRequest(action) {
  const { data } = action.payload
  console.log(data, 'getChoiceAwardsRequest',)
  try {
    const response = yield httpGet('/dtgo_award_api/choice_awards')
    if (response.status >= 200 && response.status < 300) {
      //on success
      console.log(response.data, 'data')
      yield put(getChoiceAwardsSuccess(response.data))
    } else {
      //on fail
      yield put(getChoiceAwardsSuccess({}))
    }
  } catch (e) {
    //on fail
    console.log(e)
    yield put(getChoiceAwardsSuccess({}))
  }
}

export function* watchNoMineesSaga() {

  yield takeLatest(GET_CHOICE_AWARDS.REQUEST, getChoiceAwardsRequest)
  yield takeLatest(GET_NOMINEES_PAGE.REQUEST, getNoMineesPageRequest)
}

const initial = {
  ChoiceAwardsData: { data: [], loading: false },
  NoMineesData: { data: {}, loading: false },
}

export default createReducer(initial, state => ({

  [GET_CHOICE_AWARDS.REQUEST]: () => ({
    ...state,
    ChoiceAwardsData: { data: [], loading: true }
  }),

  [GET_CHOICE_AWARDS.SUCCESS]: (payload) => ({
    ...state,
    ChoiceAwardsData: { data: payload.data, loading: false }
  }),
  [GET_NOMINEES_PAGE.REQUEST]: () => ({
    ...state,
    NoMineesData: { data: {}, loading: true }
  }),

  [GET_NOMINEES_PAGE.SUCCESS]: (payload) => ({
    ...state,
    NoMineesData: { data: payload.data, loading: false }
  })
}))

