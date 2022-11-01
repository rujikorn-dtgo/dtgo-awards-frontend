import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getTodo } from 'ducks/todo'

import { Container } from './styled'

const ToDoDetail = (props) => {

  const { 
    todoDetail
  } = props
  let pathData = useParams() //get param data from url

  React.useEffect(()=>{
    props.getTodo(pathData.id)
  },[])

  return (
    <Container>
      <div>
        ID : {todoDetail.data.id}
      </div>
      <div>
        Title : {todoDetail.data.title}
      </div>
      <div>
        Todo : {todoDetail.data.todo}
      </div>
    </Container>
  )
}

const mapStateToProps = (state) => {
  let todoDetail = state.todo.todoDetail
  return{
    todoDetail
  }
}

const mapDispatchToProps = {
  getTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoDetail)