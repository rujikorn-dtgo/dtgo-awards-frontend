import { takeLatest, put } from 'redux-saga/effects'
import { createReducer, makeAction, makeKeys } from './reduxHelpers'
import { httpGet, httpPost, httpPut, httpDelete, token } from 'core/restClient'
import history from 'core/history'
import axios from 'axios'
import {
  todoDetailPath,
  todoListPath
} from 'routes'

export const con_date_now = (date_ob) => {

  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();


  const date_now = year + month + date;

  // const datetime_now = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

  return date_now


}
export const con_datetime_now = (date_ob) => {

  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();

  // current seconds
  let seconds = date_ob.getSeconds();

  const datetime_now = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
  return datetime_now

}



const GET_CHOICE_AWARDS = makeKeys('GET_CHOICE_AWARDS');
const GET_NOMINEES_PAGE = makeKeys('GET_NOMINEE_PAGE');
const GET_TOKEN = makeKeys('GET_TOKEN');
const GEN_TOKEN = makeKeys('GEN_TOKEN');

export const getChoiceAwards = makeAction(GET_CHOICE_AWARDS.REQUEST, 'data')
export const getNomineesPage = makeAction(GET_NOMINEES_PAGE.REQUEST, 'id')
export const getToken = makeAction(GET_TOKEN.REQUEST, 'data')
export const genToken = makeAction(GEN_TOKEN.REQUEST, 'data')

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
    if (e.status == 500) {
      try {
        const response_ = yield httpGet(`/dtgo_award_api/access/oauth/token?type=client_credentials`)
        if (response_.status >= 200 && response_.status < 300) {
          // //on success
          const date_stamp = con_date_now(response_.data.timeStamp)
          // console.log(date, 'date')
          // console.log(date_stiamp, 'time_stamp')
          localStorage.setItem('date_stamp', date_stamp)
          localStorage.setItem('access_token', response_.data.accessToken)
          console.log(localStorage.getItem('access_token'), 'access')
          // yield put(getChoiceAwardsSuccess(response.data))
        } else {
          //on fail
          console.log("fail")
          // yield put(getChoiceAwardsSuccess({}))
        }
      } catch (e) {
        //on fail
        console.log(e)
        // yield put(getChoiceAwardsSuccess({}))
      }
    } else {
      console.log(e)
    }
    console.log(e)
    yield put(getNomineesPageSuccess({}))
  }
}

function* getTokenRequest() {
  // const { data } = action.payload
  // console.log(data, 'getTokenRequest',)
  // console.log(serviceUrl,'serviceUrl')

  console.log("token")
  try {
    const response = yield httpGet(`/dtgo_award_api/access/oauth/token?type=get_client_credentials`)
    if (response.status >= 200 && response.status < 300) {
      // //on success
      const date_stamp = con_date_now(response.data.timeStamp)
      // console.log(date, 'date')

      console.log(response.data, 'response.data')

      localStorage.setItem('date_stamp', date_stamp)
      localStorage.setItem('access_token', response.data.accessToken)
      console.log(localStorage.getItem('access_token'), 'access')
      // yield put(getChoiceAwardsSuccess(response.data))
    } else {
      //on fail
      console.log("fail")
      // yield put(getChoiceAwardsSuccess({}))
    }
  } catch (e) {
    //on fail
    console.log(e)
    // yield put(getChoiceAwardsSuccess({}))
  }
}

function* genTokenRequest() {
  // const { data } = action.payload
  // console.log(data, 'getTokenRequest',)
  // console.log(serviceUrl,'serviceUrl')

  console.log("token")
  try {
    const response = yield httpGet(`/dtgo_award_api/access/oauth/token?type=client_credentials`)
    if (response.status >= 200 && response.status < 300) {
      // //on success
      const date_stamp = con_date_now(response.data.timeStamp)
      // console.log(date, 'date')
      // console.log(date_stiamp, 'time_stamp')
      localStorage.setItem('date_stamp', date_stamp)
      localStorage.setItem('access_token', response.data.accessToken)
      console.log(localStorage.getItem('access_token'), 'access')
      // yield put(getChoiceAwardsSuccess(response.data))
    } else {
      //on fail
      console.log("fail")
      // yield put(getChoiceAwardsSuccess({}))
    }
  } catch (e) {
    //on fail
    console.log(e)
    // yield put(getChoiceAwardsSuccess({}))
  }
}

function* getChoiceAwardsRequest(action) {
  const { data } = action.payload
  console.log(data, 'getChoiceAwardsRequest',)
  // console.log(serviceUrl,'serviceUrl')
  try {
    const response = yield httpGet(`dtgo_award_api/choice_awards`)
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
  
    yield put(getChoiceAwardsSuccess({}))
  }
}

export function* watchNoMineesSaga() {

  yield takeLatest(GET_CHOICE_AWARDS.REQUEST, getChoiceAwardsRequest)
  yield takeLatest(GET_NOMINEES_PAGE.REQUEST, getNoMineesPageRequest)
  yield takeLatest(GET_TOKEN.REQUEST, getTokenRequest)
  yield takeLatest(GEN_TOKEN.REQUEST, genTokenRequest)
}

const initial = {
  ChoiceAwardsData: { data: [], loading: false },
  NoMineesData: { data: [], loading: false },
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
    NoMineesData: { data: [], loading: true }
  }),

  [GET_NOMINEES_PAGE.SUCCESS]: (payload) => ({
    ...state,
    NoMineesData: { data: payload.data, loading: false }
  })
}))

