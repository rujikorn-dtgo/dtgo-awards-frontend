import React from 'react'
import { connect } from 'react-redux'
import logo from '../../logo.svg'
import { Container } from './styled'
import history from 'core/history'
import { noMineesPath, todoListPath } from 'routes'
import { Redirect } from 'react-router-dom'
import NoMinees from 'routes/NoMinees'

const Landing = (props) => {
  return (
    <Container className='App'>
         <Redirect
          to={noMineesPath}
          component={NoMinees}
          key="NoMinees"
        />
    </Container>
  )
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
