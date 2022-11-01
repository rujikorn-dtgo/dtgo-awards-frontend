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
const SAVE_TODO = 'SAVE_TODO'
const UPDATE_TODO = 'UPDATE_TODO'
const UPLOAD_FILE_TODO = 'UPLOAD_FILE_TODO'
const DELETE_TODO = 'DELETE_TODO'

export const getTodo = makeAction(GET_TODO.REQUEST, 'id')
export const saveTodo = makeAction(SAVE_TODO, 'data')
export const updateTodo = makeAction(UPDATE_TODO, 'data')
export const uploadFileTodo = makeAction(UPLOAD_FILE_TODO, 'data')
export const deleteTodo = makeAction(DELETE_TODO, 'id')

const getTodoSuccess = makeAction(GET_TODO.SUCCESS, 'data')

const basePath = path => path ? `basePath/${path}` : 'basePath' // config api path
const multipartHeader = { 'Content-Type': 'multipart/form-data', } //multipart for API upload file

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

export function* watchToDoSaga() {
  yield takeLatest(GET_TODO.REQUEST, getTodoRequest)
  yield takeLatest(SAVE_TODO, saveTodoRequest)
  yield takeLatest(UPDATE_TODO, updateTodoRequest)
  yield takeLatest(UPLOAD_FILE_TODO, uploadFileTodoRequest)
  yield takeLatest(DELETE_TODO, deleteTodoRequest)
}

const initial = {
  todoDetail: { data: {}, loading: false },
}

export default createReducer(initial, state => ({
  [GET_TODO.REQUEST]: () => ({
    ...state,
    todoDetail: { data: {}, loading: true }
  }),
  [GET_TODO.SUCCESS]: (payload) => ({
    ...state,
    todoDetail: { data: payload.data, loading: false }
  })
}))


export const getRecipint = () => {
  // console.log(localStorage.getItem('token'),"tokennn")
  // const authorization = localStorage.getItem('token')
  return axios.get(`http://localhost:3007/api/recipint/findAll`)
    .then(res => {
      console.log(res.data, 'axios api recipint ')

      return res.data;


    })
};

export const getComplain = () => {
  // const authorization = localStorage.getItem('token')
  return axios.get(`http://localhost:3007/api/complain_group/findAll`)
    .then(res => {
      console.log(res.data, 'axios api complain ')

      return res.data;


    })
};

export const postComplain = async (data) => {

  return axios({
    method: "POST",
    url: "http://localhost:3007/api/complain_group/insert_complain",
    data: data,
    headers: "Content-type: application/json; charset=utf-8"
  })
    .then((result) => {
      console.log('hasil axios', result.data)

      return result.data;
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });


};
