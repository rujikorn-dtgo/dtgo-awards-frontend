import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormValues, SubmissionError, Field } from 'redux-form'
import CheckupRequest, { getTacking, tacKingNumberData } from 'ducks/CheckupRequest'
import Img from 'react-image'
import { Container, ContainerMain } from './styled'
import { Link } from 'react-router-dom'
import NavBar from 'components/NavBar'
import { todoListPath, CreateRequestPath } from 'routes'
import history from 'core/history'
import { getTextResult, textKey } from 'core/textResult'

const CheckUpRequest = (props) => {

  const {
    // tacking_number,
    getTacking
    , tacKingNumberData
  } = props

  const [message, setMessage] = React.useState('')

  const [values, setValues] = useState(""
  )

  const [tackingnumber, setTackingnumber] = useState([])
  const handleChange = (e, name) => {
    console.log(e.target.value, 'value')
    // setValues(e.target.value)
    setValues(e.target.value)


  }
  const handleSubmit = () => {
    // console.log(getTacking(values), 'submit')
    const tacking_number = {
      tacking_number: values
    }
    getTacking(tacking_number)
    console.log(tacKingNumberData, 'tacKingNumberData')
  }

  useEffect(() => {

    console.log(tacKingNumberData, "tacKingNumberData")
    // console.log(getToken(), "getToken")
    if (tacKingNumberData) { setTackingnumber(tacKingNumberData) }

  }, [tacKingNumberData])



  return (
    <Container>
      {/* navbar */}
      {/* <div className=' flex  h-12 w-full  m-auto font-bold '>

        <div className="grid grid-cols-3  content-center  ">
          <div className=' mx-2'>
            <button className=' text-sm bg-gray-500 hover:bg-yellow-500 text-white  hover:text-white py-1 px-3 border border-grey hover:border-transparent rounded  '>EN</button>

          </div>
          <div>
            <button className='text-sm bg-white  text-gray-500  py-1 px-3 border-l border-grey hover:border-transparent rounded '>Back</button>

          </div>

        </div>

      </div> */}
      <NavBar></NavBar>
      {/* bg */}
      <img src="https://sv1.picz.in.th/images/2022/08/23/a0uMiu.jpg" />


      {/* main */}
      <ContainerMain>
        <div className=' flex w-full  h-full  '>
          {/* left */}
          <div className=' w-2/6 '>
            <div>
              <img className=' w-24' src='https://ostest.dtgsiam.com/Whistleblowing/img/logo.png?30' />
            </div>
            <div className='text-sm' >
              {getTextResult(textKey.LEFT1)}
              {/* กลุ่มบริษัทดีทีจีโอ จัดให้มีช่องทางการแจ้งเบาะแส หรือข้อร้องเรียน กรณีหากมีข้อสงสัยหรือพบเห็นการกระทำ ดังนี้
              DTGO provides a channel for complaints and whistleblowing for anyone who encounters or becomes aware of any action or behavior that */}
              <ul className='list-disc mt-1 pl-7 '>

                <li>
                  {getTextResult(textKey.LEFT2)}

                </li>
                <li>
                  {getTextResult(textKey.LEFT3)}

                </li>
                <li>
                  {getTextResult(textKey.LEFT4)}

                </li>
                <li>
                  {getTextResult(textKey.LEFT5)}

                </li>
              </ul>
            </div>

            <div className=' mt-5 font-bold text-lg'>{getTextResult(textKey.LEFT6)}</div>

            <div className='grid grid-row-2 text-sm  '>
              <button className="text-left pl-3 w-3/4   text-gray-400  py-1" onClick={() => history.push(CreateRequestPath)}>  {getTextResult(textKey.LEFT7)}</button>
              <button className="text-left    bg-black rounded-full text-white  pl-3 w-3/4  py-1 my-1  ">  {getTextResult(textKey.LEFT8)}</button>
            </div>


          </div>

          {/* right */}
          <div className=' w-4/6 ml-5 '>

            <div className='h-24  '>

            </div>

            {/* <div className='text-center font-bold'>
              <div className=' mt-10   text-2xl '>
                System temporary closed for maintenance.
              </div>
              <div className='my-5 text-xl'>
                We apologize for any inconvenience.
                <br></br>
                Please use other whistleblowing channels.
              </div>
            </div> */}

            <div className='ml-5'>


              <div className=' font-bold text-lg'>
                {getTextResult(textKey.RIGHT25)}
              </div>
              <div className='mt-11 text-sm'>
                {getTextResult(textKey.RIGHT26)}
              </div>

              <div className=' mt-3 flex'>
                <input className='w-full bg-gray-200 h-11 rounded-full  pl-5 pr-3   outline-none ' placeholder={getTextResult(textKey.RIGHT27)} onChange={(e) => handleChange(e, "tacking_number")} value={values.tacking_number}></input>
                <button className="text-center  ml-2   text-white  w-11 h-11 bg-black rounded-full " onClick={() => handleSubmit()}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6  m-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </button>
              </div>
              <div>


                {tackingnumber ? tackingnumber.map((p, index) => (

                  p.complainId

                ))
                  :
                  ""}
              </div>

            </div>


          </div>
        </div>
        <footer className=' mt-8   border-t border-gray-200 pb-10 '>
          <div className='text-sm'>
            <div className='mt-5 '>
              {getTextResult(textKey.FOOTER1)}

            </div>
            <div className='mt-5 '>
              {getTextResult(textKey.FOOTER2)}

              <a href="https://www.dtgo.com/policy-whistleblowing" className='text-yellow-500 mx-2  underline' >

                {getTextResult(textKey.FOOTER3)}
              </a>

              {getTextResult(textKey.FOOTER4)}
              <a href="https://www.dtgo.com/policy-whistleblowing" className='text-yellow-500 mx-2  underline' >

                {getTextResult(textKey.FOOTER5)}</a>
            </div>
          </div>
          <div className='mt-10'>
            <div className='font-bold text-lg'>
              {getTextResult(textKey.FOOTER6)}

            </div>
            <div className='font-bold text-4xl'>
              {getTextResult(textKey.FOOTER7)}

            </div>
            <div className='text-sm'>
              © 2017 DTGO CORPORATION LIMITED
            </div>
          </div>


        </footer>
      </ContainerMain>

      {/* <Img className='' src={imgLogo} style={{width:'2.5rem'}} /> */}


      {/* <h1 class="text-3xl font-bold underline text-red-800">
          Hello world!
        </h1>
        <div>
          First name
          <Field
            name='firstname'
            component={'input'}
            require
          />
        </div>
        <div>
          Last name
          <Field
            name='lastname'
            component={'input'}
            require
          />
        </div>
        <div>{message}</div>
        <form onSubmit={props.handleSubmit(() => onSubmitForm())}>
          <div>
            <button type="submit">
              Submit
            </button>
            <button type="button" onClick={() => {
              props.reset() //for reset form (by redux-form)
              setMessage('')
            }}
            >
              Clear Values
            </button>
          </div>
        </form> */}
    </Container >
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    tacKingNumberData: state.checkUpRequest.tacKingNumberData.data
    //initial value form
    // recipintData: state.createRequest.recipintData.data

  }
}

const mapDispatchToProps = {
  getTacking
}

// set when component have input form
// const contForm = reduxForm({
//   form: 'formName',
//   enableReinitialize: true, // set for redux-form can update data form API
// })(ToDoList)

export default connect(mapStateToProps, mapDispatchToProps)(CheckUpRequest)