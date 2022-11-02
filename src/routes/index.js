import React from 'react'
import { connect } from 'react-redux'
import { Route, Router, Switch } from 'react-router-dom'
import history from 'core/history'

// import CreateRequest from 'routes/CreateRequest'
import Landing from 'routes/Landing'
// import TodoList from 'routes/ToDo'
// import TodoDetail from 'routes/ToDoDetail'
import NoMinees from 'routes/NoMinees'

// import CheckUpRequest from 'routes/CheckUpRequest'

export const rootPath = ''
export const CreateRequestPath = `${rootPath}/createrequest`
export const landingPath = `${rootPath}/`
export const noMineesPath = `${rootPath}/Nominees`
export const todoListPath = `${rootPath}/todo`

export const CheckUpRequestPath = `${rootPath}/checkuprequest`
export const todoDetailPath = (id) => `${rootPath}/todo/${id}`

const ApplicationRoute = (props) => {
  return (
    <Router history={history}>
      {/* <Routes style={{ display: 'flex', flex: 1 }}> */}
      <React.Fragment>
        {/* <Redirect
          to={CreateRequestPath}
          component={CreateRequest}
          key="CreateRequest"
        /> */}
        {/* <Route exact strict path={CreateRequestPath} component={CreateRequest} key='CreateRequest' /> */}
        <Route exact strict path={landingPath} component={Landing} key='Landing' />
        {/* <Route exact strict path={todoListPath} component={TodoList} key='TodoList' /> */}
        {/* <Route exact strict path={CheckUpRequestPath} component={CheckUpRequest} key='CheckUpRequest' /> */}
        <Route exact strict path={noMineesPath} component={NoMinees} key='NoMinees' />
        <Switch>
          {/* <Route exact strict path={todoDetailPath(':id')} component={TodoDetail} key='TodoDetail' /> */}
        </Switch>
      </React.Fragment>
      {/* </Routes> */}
    </Router>
  )
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationRoute)