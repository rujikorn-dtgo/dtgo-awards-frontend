import React from 'react'
import { connect } from 'react-redux'
import { Route, Router, Switch } from 'react-router-dom'
import history from 'core/history'

// import CreateRequest from 'routes/CreateRequest'
import Landing from 'routes/Landing'
// import TodoList from 'routes/ToDo'
// import TodoDetail from 'routes/ToDoDetail'
import NoMinees from 'routes/NoMinees'
import Voting from 'routes/Voting'
import { getChoiceAwards, getToken } from 'ducks/NoMinees'
// import CheckUpRequest from 'routes/CheckUpRequest'

export const rootPath = ''
export const CreateRequestPath = `${rootPath}/createrequest`
export const landingPath = `${rootPath}/`
export const noMineesPath = `${rootPath}/Nominees`
export const todoListPath = `${rootPath}/todo`
export const voTingPath = `${rootPath}/Voting`

export const CheckUpRequestPath = `${rootPath}/checkuprequest`

export const todoDetailPath = (id) => `${rootPath}/todo/${id}`



const ApplicationRoute = (props) => {
  // const {
  //   getToken
  // } = props
  // useEffect(async () => {
  //   // console.log(getToken(), 'getToken')
  //   // console.log(getToken(), "token")
  //   // console.log(getComplainAll(),"getComplainAll")
  //   // Dataload()
  //   console.log(localStorage.getItem('access_token') === null, 'access_token')
  //   if (localStorage.getItem('access_token') === null) {
  //     console.log('null')
  //     getToken()
  //     console.log(getToken(), 'Token')
  //     // console.log(localStorage.getItem('access_token'),'access_token')
  //     // await refresh()
  //     // getChoiceAwards()
  //   } else {
  //     getChoiceAwards()
  //     console.log('not null')
  //   }
  //   // console.log(localStorage.getItem('access_token'), 'access_token')
  //   // console.log(getChoiceAwards(), 'getChoiceAwards')

  // }, [])

  // const refresh = () => {
  //   const timer = setTimeout(() => {
  //     window.location.reload();
  //     console.log('This will reload after 1 second!')
  //   }, 1000);
  // }
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
        <Route exact strict path={voTingPath} component={Voting} key='Voting' />
        <Switch>
          {/* <Route exact strict path={todoDetailPath(':id')} component={TodoDetail} key='TodoDetail' /> */}
        </Switch>
      </React.Fragment>
      {/* </Routes> */}
    </Router>
  )
}

const mapStateToProps = (state) => ({
  ChoiceAwardsData: state.NoMinees.ChoiceAwardsData.data,
})

const mapDispatchToProps = {
  getChoiceAwards,
  getToken
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationRoute)