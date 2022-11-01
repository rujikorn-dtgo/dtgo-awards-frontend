import { takeLatest, put } from 'redux-saga/effects'
import { createReducer, makeAction, makeKeys } from './reduxHelpers'
import { httpGet, httpPost, httpPut, httpDelete } from 'core/restClient'
import history from 'core/history'
import axios from 'axios'
import {
  todoDetailPath,
  todoListPath
} from 'routes'

const GET_TODO = makeKeys('GET_TODO')
const GET_TACKING = makeKeys('GET_TACKING')
const SAVE_TODO = 'SAVE_TODO'
const UPDATE_TODO = 'UPDATE_TODO'
const UPLOAD_FILE_TODO = 'UPLOAD_FILE_TODO'
const DELETE_TODO = 'DELETE_TODO'

export const getTodo = makeAction(GET_TODO.REQUEST, 'id')
export const saveTodo = makeAction(SAVE_TODO, 'data')
export const updateTodo = makeAction(UPDATE_TODO, 'data')
export const uploadFileTodo = makeAction(UPLOAD_FILE_TODO, 'data')
export const deleteTodo = makeAction(DELETE_TODO, 'id')
export const getTacking = makeAction(GET_TACKING.REQUEST, 'data')

const getTodoSuccess = makeAction(GET_TODO.SUCCESS, 'data')
const getTackingSuccess = makeAction(GET_TACKING.SUCCESS, 'data')


const basePath = path => path ? `basePath/${path}` : 'basePath' // config api path
const multipartHeader = { 'Content-Type': 'multipart/form-data', } //multipart for API upload file


function* getTackingRequest(action) {
  const { data } = action.payload
  console.log(data, 'getTackingRequest',)

  try {
    const response = yield httpPost('/tracking_number/show_tracking_number', data)
    if (response.status >= 200 && response.status < 300) {
      //on success
      console.log(response.data, 'data')
      yield put(getTackingSuccess(response.data))
    } else {
      //on fail
      yield put(getTackingSuccess({}))
    }
  } catch (e) {
    //on fail
    console.log(e)
    yield put(getTackingSuccess({}))
  }
}

function* getTodoRequest(action) {
  const { id } = action.payload
  try {
    const response = yield httpGet(basePath(id))
    if (response.status >= 200 && response.status < 300) {
      //on success
      yield put(getTodoSuccess({ id: id, title: 'sample', todo: 'todo' }))
    } else {
      //on fail
      yield put(getTodoSuccess({}))
    }
  } catch (e) {
    //on fail
    console.log(e)
    yield put(getTodoSuccess({}))
  }
}

function* saveTodoRequest(action) {
  const { data } = action.payload
  try {
    const response = yield httpPost(basePath(), data)
    if (response.status >= 200 && response.status < 300) {
      //on success
      history.push(todoDetailPath(data))
    } else {
      //on fail
    }
  } catch (e) {
    //on fail
    console.log(e)
  }
}

function* updateTodoRequest(action) {
  const { data } = action.payload
  try {
    const response = yield httpPut(basePath(), data)
    if (response.status >= 200 && response.status < 300) {
      //on success
      history.push(todoDetailPath(data))
    } else {
      //on fail
    }
  } catch (e) {
    //on fail
    console.log(e)
  }
}

function* uploadFileTodoRequest(action) {
  const { data } = action.payload
  try {
    const response = yield httpPost(basePath(), data, multipartHeader)
    if (response.status >= 200 && response.status < 300) {
      //on success
    } else {
      //on fail
    }
  } catch (e) {
    //on fail
    console.log(e)
  }
}

function* deleteTodoRequest(action) {
  const { id } = action.payload
  try {
    const response = yield httpDelete(basePath(id),)
    if (response.status >= 200 && response.status < 300) {
      //on success
      history.push(todoListPath)
    } else {
      //on fail
    }
  } catch (e) {
    //on fail
    console.log(e)
  }
}

export function* watchCheckUpRequestSaga() {
  yield takeLatest(GET_TODO.REQUEST, getTodoRequest)
  yield takeLatest(SAVE_TODO, saveTodoRequest)
  yield takeLatest(UPDATE_TODO, updateTodoRequest)
  yield takeLatest(UPLOAD_FILE_TODO, uploadFileTodoRequest)
  yield takeLatest(DELETE_TODO, deleteTodoRequest)
  yield takeLatest(GET_TACKING.REQUEST, getTackingRequest)
}

const initial = {
  todoDetail: { data: {}, loading: false },
  tacKingNumberData: { data: [], loading: false },
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
  [GET_TACKING.REQUEST]: () => ({
    ...state,
    tacKingNumberData: { data: [], loading: true }
  }),
  [GET_TACKING.SUCCESS]: (payload) => ({
    ...state,
    tacKingNumberData: { data: payload.data, loading: false }
  })
}))

