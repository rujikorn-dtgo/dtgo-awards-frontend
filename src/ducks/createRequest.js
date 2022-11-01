import { takeLatest, put } from 'redux-saga/effects'
import { createReducer, makeAction, makeKeys } from './reduxHelpers'
import { httpGet, httpPost, httpPut, httpDelete, customHeader, token, customHeader1 } from 'core/restClient'
import history from 'core/history'
import axios from 'axios'
import {
  todoDetailPath,
  todoListPath
} from 'routes'
import { appLoaded, appLoading } from './app'

const GET_TODO = makeKeys('GET_TODO')

const UPDATE_TODO = 'UPDATE_TODO'
const UPLOAD_FILE_TODO = 'UPLOAD_FILE_TODO'
const DELETE_TODO = 'DELETE_TODO'
const CREATE_REQUEST = makeKeys('CREATE_REQUEST')
const FILTER_RECIPINT = makeKeys('FILTER_RECIPINT')
const CREATE_FILE = makeKeys('CREATE_FILE')

const GET_TOKEN = 'GET_TOKEN'

const GET_COMPLAIN = 'GET_COMPLAIN'


export const getTodo = makeAction(GET_TODO.REQUEST, 'id')
export const updateTodo = makeAction(UPDATE_TODO, 'data')
export const uploadFileTodo = makeAction(UPLOAD_FILE_TODO, 'data')
export const deleteTodo = makeAction(DELETE_TODO, 'id')
export const createRequest = makeAction(CREATE_REQUEST.REQUEST, 'data')
export const filterRecipint = makeAction(FILTER_RECIPINT.REQUEST, 'data')
export const createFile = makeAction(CREATE_FILE.REQUEST, 'data')

export const getToken = makeAction(GET_TOKEN)

export const getComplainAll = makeAction(GET_COMPLAIN)

const getTodoSuccess = makeAction(GET_TODO.SUCCESS, 'data')
const createRequestSuccess = makeAction(CREATE_REQUEST.SUCCESS, 'data')
const filterRecipintSuccess = makeAction(FILTER_RECIPINT.SUCCESS, 'data')
const createFileSuccess = makeAction(CREATE_FILE.SUCCESS, 'data')

const getTokenSuccess = makeAction(GET_TOKEN.SUCCESS, 'data')

const getComplainSuccess = makeAction(GET_COMPLAIN.SUCCESS, 'data')

const basePath = path => path ? `basePath/${path}` : 'basePath' // config api path
const multipartHeader = { 'Content-Type': 'multipart/form-data', } //multipart for API upload file



function* createTokenRequest() {
  // const { id } = action.payload
  try {
    const response = yield httpGet('/token/gentoken')
    if (response.status >= 200 && response.status < 300) {
      //on success
      console.log(response.data, 'tokennnn')
      localStorage.setItem('token', response.data);
      // yield put(getTokenSuccess(response.data))
    } else {
      //on fail
      yield put(getTokenSuccess({}))
    }
  } catch (e) {
    //on fail
    console.log(e)
    yield put(getTokenSuccess({}))
  }
}

function* getAllComplainRequest() {
  // const { id } = action.payload
  console.log('getAllComplainRequest')
  try {

    const response = yield httpGet('/complain_group/findAll')
    if (response.status >= 200 && response.status < 300) {
      //on success
      console.log(response.data, 'complain_group')
      yield put(getComplainSuccess(response.data))
    } else {
      //on fail
      yield put(getComplainSuccess({}))
    }
  } catch (e) {
    //on fail
    console.log(e)
    yield put(getComplainSuccess({}))
  }
}



function* createRequestRequest(action) {
  const { data } = action.payload
  console.log(data, "data")
  try {
    const response = yield httpPost('complain_group/insert_complain', { body: data, file: data.file }, multipartHeader)
    if (response.status >= 200 && response.status < 300) {
      //on success
      yield put(createRequestSuccess(response.data))

      // history.push(todoDetailPath(data))
    } else {
      //on fail

    }
  } catch (e) {
    //on fail
    console.log(e)
  }
}

function* filterRecipintRequest(action) {
  const { data } = action.payload
  console.log(data, 'filter',)
  console.log('chktoken', localStorage.getItem('token'))

  try {
    yield put(appLoading());
    // const response = yield httpPost('/recipint/filterRecipint', { body: data, authorization: localStorage.getItem('token') })
        const response = yield httpPost('/recipint/filterRecipint',data)
    if (response.status >= 200 && response.status < 300) {
      //on success
      console.log(response.data, "response.data")

      yield put(filterRecipintSuccess(response.data))
      return response.data
      // history.push(todoDetailPath(data))
    }
    yield put(appLoaded());
  } catch (e) {
    //on fail
    console.log(e)
  }
}

function* createFileRequest(action) {
  const body = {

    file: action.payload.data.file,
    name: action.payload.data.name,
    surname: action.payload.data.surname,
    email: action.payload.data.email,
    phone: action.payload.data.phone,
    address: JSON.stringify({
      address1: action.payload.data.address.address1,
      subdistrict: action.payload.data.address.subdistrict,
      district: action.payload.data.address.district,
      province: action.payload.data.address.province,
      postcode: action.payload.data.address.postcode
    }),
    cg_id: action.payload.data.cg_id,
    rp_id: action.payload.data.rp_id,
    detail: action.payload.data.detail,
    file: action.payload.data.file
  }

  console.log(body, "body")
  try {
    yield put(appLoading());
    const response = yield httpPost('/complain_group/uploadfile', body, multipartHeader)
    if (response.status >= 200 && response.status < 300) {
      //on success

      console.log(response.data, "response.data")

      yield put(createFileSuccess(response.data))
      return response.data
      // history.push(todoDetailPath(data))
    }
    yield put(appLoaded());
  } catch (e) {
    //on fail
    console.log(e)
  }
}
export function* watchCreateRequestSaga() {

  yield takeLatest(CREATE_REQUEST.REQUEST, createRequestRequest)
  yield takeLatest(FILTER_RECIPINT.REQUEST, filterRecipintRequest)
  yield takeLatest(CREATE_FILE.REQUEST, createFileRequest)
  yield takeLatest(GET_TOKEN, createTokenRequest)
  yield takeLatest(GET_COMPLAIN, getAllComplainRequest)
}

const initial = {
  todoDetail: { data: {}, loading: false },
  createRequestdata: { data: {}, loading: false },
  recipintData: { data: [], loading: false },
  createfiledata: { data: {}, loading: false },
  token: "",
  complain: { data: [], loading: false }
}

export default createReducer(initial, state => ({
  [GET_TODO.REQUEST]: () => ({
    ...state,
    todoDetail: { data: {}, loading: true }
  }),
  [GET_TODO.SUCCESS]: (payload) => ({
    ...state,
    todoDetail: { data: payload.data, loading: false }
  }),

  [CREATE_REQUEST.REQUEST]: () => ({
    ...state,
    createRequestdata: { data: {}, loading: true }
  }),
  [CREATE_REQUEST.SUCCESS]: (payload) => ({
    ...state,
    createRequestdata: { data: payload.data, loading: false }
  }),
  [FILTER_RECIPINT.REQUEST]: () => ({
    ...state,
    recipintData: { data: [], loading: true }
  }),
  [FILTER_RECIPINT.SUCCESS]: (payload) => ({
    ...state,
    recipintData: { data: payload.data, loading: false }
  }),
  [CREATE_FILE.REQUEST]: () => ({
    ...state,
    createfiledata: { data: {}, loading: true }
  }),
  [CREATE_FILE.SUCCESS]: (payload) => ({
    ...state,
    createfiledata: { data: payload.data, loading: false }
  }),

  [GET_TOKEN.SUCCESS]: (payload) => ({
    ...state,
    token: payload.data
  }),
  [GET_COMPLAIN.SUCCESS]: (payload) => ({
    ...state,
    complain: { data: payload.data, loading: true }
  }),
}))


export const getRecipint = () => {
  return axios.get(`http://localhost:3007/api/getall/recipient`)
    .then(res => {
      console.log(res.data, 'axios api recipint ')

      return res.data;


    })
};

export const getComplain = () => {
  return axios.get(`http://localhost:3007/api/getall/complain_group`)
    .then(res => {
      console.log(res.data, 'axios api complain ')

      return res.data;


    })
};


