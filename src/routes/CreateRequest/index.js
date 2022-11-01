import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormValues, SubmissionError, Field } from 'redux-form'


import Img from 'react-image'
import { Container, ContainerMain } from './styled'

import NavBar from 'components/NavBar'
import history from 'core/history'
import { CheckUpRequestPath } from 'routes'
import {
  GoogleReCaptcha
} from 'react-google-recaptcha-v3';

import { getTextResult, textKey } from 'core/textResult'
import { flush } from 'redux-saga/effects'

const CreateRequest = (props) => {
  // console.log(props, 'propsssss')
  const {

    // getComplainAll
  } = props
  

  useEffect(() => {
    // console.log(getToken(), "token")
    // console.log(getComplainAll(),"getComplainAll")
    Dataload()

  }, [])










  const Dataload = async () => {
   


  }
  return (
    <Container>


      {/* bg */}
      <img src="https://sv1.picz.in.th/images/2022/08/23/a0uMiu.jpg" />


      {/* main */}
      <ContainerMain>
   
      </ContainerMain>


    </Container >
  )
}

const mapStateToProps = (state) => {
  // var valueForm = getFormValues('formName')(state)
  console.log(state, 'state')
  return {
    //initial value form  

    // valueForm,
   

  }
}

const mapDispatchToProps = {

  // getComplainAll
}

// set when component have input form
// const contForm = reduxForm({
//   form: 'formName',
//   enableReinitialize: true, // set for redux-form can update data form API
// })(CreateRequest)

export default connect(mapStateToProps, mapDispatchToProps)(CreateRequest)