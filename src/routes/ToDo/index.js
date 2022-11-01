import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormValues, SubmissionError, Field } from 'redux-form'
import { saveTodo, getRecipint, getComplain, postComplain } from 'ducks/todo'
import { createRequest } from 'ducks/createRequest'
import Img from 'react-image'
import { Container, ContainerMain } from './styled'

import NavBar from 'components/NavBar'
import history from 'core/history'
import { CheckUpRequestPath } from 'routes'
import {
  GoogleReCaptcha
} from 'react-google-recaptcha-v3';

import { getTextResult, textKey } from 'core/textResult'

const ToDoList = (props) => {
  const [values, setValues] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    address: {
      address1: "",
      subdistrict: "",
      district: "",
      province: "",
      postcode: ""
    },
    cg_id: "",
    rp_id: "",
    detail: ""
  })




  const [complain, setComplain] = useState()
  const [recipint, setRecipint] = useState()
  const [checkRecipint, setCheckRecipint] = useState()
  const handleChange = async (e, name) => {

    console.log("name", name, "value", e.target.value);

    if (name == "en") {

      localStorage.setItem('language', name)

    } else if (name == "complain") {

      const valueComplain = e.target.value
      setCheckRecipint(valueComplain)
      const setRe = await getRecipint()
      console.log(setRe, 'reee1')
      setRecipint(setRe.filter(setRe => setRe.cgIdFk == valueComplain))
      console.log(setRe.filter(setRe => setRe.cgIdFk == valueComplain), 'reee2')


      values.cg_id = e.target.value
      setValues({ ...values })
    } else if (name == "recipint") {

      console.log(e.target.value, 'recipint')
      values.rp_id = e.target.value
      setValues({ ...values })
    }
    else if (name == "address1") {
      values.address.address1 = e.target.value

      setValues({
        ...values
      })
    }
    else if (name == "subdistrict") {
      values.address.subdistrict = e.target.value
      setValues({
        ...values
      })
    } else if (name == "district") {
      values.address.district = e.target.value
      setValues({
        ...values
      })
    }
    else if (name == "province") {
      values.address.province = e.target.value
      setValues({
        ...values
      })
    }
    else if (name == "postcode") {
      values.address.postcode = e.target.value
      setValues({
        ...values
      })
    }
    else {
      values[name] = e.target.value
    }
    setValues({ ...values })
  }
  const onSubmitForm = (e) => {
    e.preventDefault();
    let save = values
    console.log('save', save);
    
    props.createRequest(values);



  }

  useEffect(() => {
    Dataload()


  }, [])
  const Dataload = async () => {


    setComplain(await getComplain())

    setRecipint(await getRecipint())

    setValues({
      name: "",
      surname: "",
      email: "",
      phone: "",
      address: {
        address1: "",
        subdistrict: "",
        district: "",
        province: "",
        postcode: ""
      },
      cg_id: "",
      rp_id: "",
      detail: ""
    })


  }
  return (
    <Container>

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

            <div className=' mt-5 font-bold text-lg'>
              {getTextResult(textKey.LEFT6)}
            </div>

            <div className='grid grid-row-2 text-sm  '>
              <button className="text-left bg-black rounded-full text-white  pl-3 w-3/4  py-1 my-1"   >
                {getTextResult(textKey.LEFT7)}
              </button>
              <button className="text-left  pl-3 w-3/4   text-gray-400  py-1  " onClick={() => history.push(CheckUpRequestPath)}>
                {getTextResult(textKey.LEFT8)}
              </button>
            </div>

            <div className=' mt-3 font-bold text-lg'>
              {getTextResult(textKey.LEFT9)}
            </div>

            <div className='w-full flex mt-2 items-center'>
              <div className='bg-gray-400 rounded-full w-6 h-6'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4  m-1  text-white " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className='text-sm mt-1 ml-2'>
                {getTextResult(textKey.LEFT10)}
                <br></br>
                {getTextResult(textKey.LEFT11)}

              </div>
            </div>
            <div className='w-full flex mt-2 items-center '>
              <div className='bg-gray-400 rounded-full w-6 h-6'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4  m-1  text-white " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>

              </div>
              <div className='text-sm mt-1 ml-2'>

                {getTextResult(textKey.LEFT12)}
                <br></br>
                (whistleblower_bod@dtgo.com)
              </div>
            </div>
            <div className='w-full flex mt-2 items-center '>
              <div className='bg-gray-400 rounded-full w-6 h-6'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4  m-1  text-white " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>

              </div>
              <div className='text-sm mt-1 ml-2'>
                {getTextResult(textKey.LEFT13)}

                <br></br>
                (whistleblower_cm@dtgo.com)
              </div>
            </div>
            <div className='w-full flex mt-2 items-center '>
              <div className='bg-gray-400 rounded-full w-6 h-6'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4  m-1  text-white " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>

              </div>
              <div className='text-sm mt-1 ml-2'>
                {getTextResult(textKey.LEFT14)}
                <br></br>
                (whistleblower_ac@dtgo.com)
              </div>
            </div>
            <div className='w-full flex mt-2 items-center '>
              <div className='bg-gray-400 rounded-full w-6 h-6'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4  m-1  text-white " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>

              </div>
              <div className='text-sm mt-1 ml-2'>
                {getTextResult(textKey.LEFT15)}
                <br></br>
                (whistleblower_pb@dtgo.com)
              </div>
            </div>
            <div className='w-full flex mt-2 items-center '>
              <div className='bg-gray-400 rounded-full w-6 h-6'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4  m-1  text-white " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>

              </div>
              <div className='text-sm mt-1 ml-2'>

                {getTextResult(textKey.LEFT16)}
                <br></br>
                (whistleblower_si@dtgo.com​)
              </div>
            </div>
            <div className='w-full flex mt-2 items-center '>
              <div className='bg-gray-400 rounded-full w-6 h-6'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4  m-1  text-white " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>

              </div>
              <div className='text-sm mt-1 ml-2'>
                {getTextResult(textKey.LEFT17)}

                <br></br>
                (whistleblower_fm@dtgo.com​)
              </div>
            </div>
            <div className='w-full flex mt-2 items-center '>
              <div className='bg-gray-400 rounded-full w-6 h-6'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4  m-1  text-white " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>

              </div>
              <div className='text-sm mt-1 ml-2'>
                {getTextResult(textKey.LEFT18)}

                <br></br>
                (whistleblower_cc@dtgo.com)
              </div>
            </div>
            <div className='w-full flex mt-2 items-center '>
              <div className='bg-gray-400 rounded-full w-6 h-6'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4  m-1  text-white " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>

              </div>
              <div className='text-sm mt-1 ml-2'>

                {getTextResult(textKey.LEFT19)}
                <br></br>
                (whistleblower_ia@dtgo.com​)
              </div>
            </div>
            <div className='w-full flex mt-2 items-center '>
              <div className='bg-gray-400 rounded-full w-6 h-6'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4  m-1  text-white " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>

              </div>
              <div className='text-sm mt-1 ml-2'>

                {getTextResult(textKey.LEFT20)}
                <br></br>
                <span className='font-bold'>

                  {getTextResult(textKey.LEFT21)}
                  <br></br>
                  {getTextResult(textKey.LEFT22)}
                  {getTextResult(textKey.LEFT23)}
                </span>

              </div>
            </div>
            <div className='w-full flex mt-2 items-center '>
              <div className='bg-gray-400 rounded-full w-6 h-6'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4  m-1  text-white " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>

              </div>
              <div className='text-sm mt-1 ml-2'>
                {getTextResult(textKey.LEFT24)}
                {/* Website https://whistleblowing.dtgo.com/ */}


              </div>
            </div>
          </div>

          {/* right */}

          <form onSubmit={(e) => onSubmitForm(e)}>
            <div className=' w-4/6 ml-5 '>

              <div className='h-24  '>

              </div>



              <div className='ml-5'>


                <div className=' font-bold text-lg'>
                  {getTextResult(textKey.RIGHT1)}

                </div>
                <div className='mt-11 text-sm'>
                  {getTextResult(textKey.RIGHT2)}

                </div>

                <div className=' mt-3'>
                  <input className='w-full bg-gray-200 h-11 rounded-full  pl-5 pr-3   outline-none ' placeholder={getTextResult(textKey.RIGHT3)} onChange={(e) => handleChange(e, 'name')}></input>
                </div>
                <div className=' mt-3'>
                  <input className='w-full bg-gray-200 h-11 rounded-full  pl-5 pr-3  outline-none' placeholder={getTextResult(textKey.RIGHT4)} onChange={(e) => handleChange(e, 'surname')}></input>
                </div>
                <div className=' mt-3'>
                  <input className='w-full bg-gray-200 h-11 rounded-full  pl-5 pr-3   outline-none ' placeholder={getTextResult(textKey.RIGHT5)} onChange={(e) => handleChange(e, "email")}></input>
                </div>
                <div className=' mt-3'>
                  <input className='w-full bg-gray-200 h-11 rounded-full  pl-5 pr-3  outline-none' placeholder={getTextResult(textKey.RIGHT6)} required onChange={(e) => handleChange(e, "phone")}></input>
                </div>
                <div className=' mt-3'>
                  <input className='w-full bg-gray-200 h-11 rounded-full  pl-5 pr-3   outline-none ' placeholder={getTextResult(textKey.RIGHT7)} onChange={(e) => handleChange(e, "address1")}></input>
                </div>
                <div className=' mt-3'>
                  <input className='w-full bg-gray-200 h-11 rounded-full  pl-5 pr-3  outline-none' placeholder={getTextResult(textKey.RIGHT8)} onChange={(e) => handleChange(e, "subdistrict")}></input>
                </div>
                <div className=' mt-3'>
                  <input className='w-full bg-gray-200 h-11 rounded-full  pl-5 pr-3   outline-none ' placeholder={getTextResult(textKey.RIGHT9)} onChange={(e) => handleChange(e, "district")}></input>
                </div>
                <div className=' mt-3'>
                  <input className='w-full bg-gray-200 h-11 rounded-full  pl-5 pr-3   outline-none ' placeholder={getTextResult(textKey.RIGHT10)} onChange={(e) => handleChange(e, "province")}></input>
                  {/* <select name="province" id="province" className='w-full bg-gray-200 h-11 rounded-full  pl-5 pr-3   outline-none' onChange={(e) => handleChange(e, "province")}  >
        <option value="A">{getTextResult(textKey.RIGHT10)}</option>


      </select> */}
                </div>
                <div className=' mt-3'>
                  <input className='w-full bg-gray-200 h-11 rounded-full  pl-5 pr-3   outline-none ' placeholder={getTextResult(textKey.RIGHT11)} onChange={(e) => handleChange(e, "postcode")} ></input>
                </div>

                <div className=' mt-3'>
                  {/* <input className='w-full bg-gray-200 h-11 rounded-full  pl-5 pr-3   outline-none ' placeholder='Name'></input> */}
                  <select className='w-full bg-gray-200 h-11 rounded-full  pl-5 pr-3   outline-none' onChange={(e) => handleChange(e, "complain")} required>

                    <option value="">{getTextResult(textKey.RIGHT12)} </option>
                    <option value="">--------------------</option>
                    {localStorage.getItem('language') == "en"
                      ?
                      complain ? complain.map((p, index) => (
                        <option key={index + 1} value={p.cgId}>{p.complainGroupEn}</option>
                      ))
                        :
                        ""
                      :
                      complain ? complain.map((p, index) => (
                        <option key={index + 1} value={p.cgId}>{p.complainGroupTh}</option>
                      ))
                        :
                        ""
                    }

                  </select>
                </div>
                <div className=' mt-3'>

                  <select className='w-full bg-gray-200 h-11 rounded-full  pl-5 pr-3  outline-none' onChange={(e) => handleChange(e, "recipint")} required >
                    <option value="">{getTextResult(textKey.RIGHT13)} </option>
                    <option value="">--------------------</option>

                    {localStorage.getItem('language') == "en"
                      ?
                      recipint ? recipint.map((p, index) => (
                        <option key={index + 1} value={p.rpId}>{p.recipintGroupEn}</option>
                      ))
                        :
                        ""
                      :
                      recipint ? recipint.map((p, index) => (
                        <option key={index + 1} value={p.rpId}>{p.recipintGroupTh}{p.cgIdFk}</option>
                      ))
                        :
                        ""
                    }




                  </select>
                </div>
                <div className=' mt-3'>
                  <textarea rows="5" cols="100" className='w-full bg-gray-200  h-40 rounded-xl  pl-5 pr-3  py-5   outline-none' placeholder={getTextResult(textKey.RIGHT14)} required onChange={(e) => handleChange(e, "detail")}> </textarea>
                </div>
                <div className='mt-3 text-sm'>
                  {getTextResult(textKey.RIGHT15)}

                </div>
                <div className='mt-3'>
                  <input placeholder='Surname' type="file"></input>
                </div>
                <div className='mt-3'>
                  {getTextResult(textKey.RIGHT16)}

                </div>
                <div className='mt-3'>
                  {/* <button type="submit" className=' bg-black text-white   text-base    w-20  h-8 rounded-full    text-center ' value="Submit" onClick={(e) => onSubmitForm(e)} >{getTextResult(textKey.RIGHT17)}</button> */}
                  <button type="submit" className=' bg-black text-white   text-base    w-20  h-8 rounded-full    text-center ' value="Submit"  >{getTextResult(textKey.RIGHT17)}</button>

                </div>

                <div>
                  <GoogleReCaptcha onVerify={() => console.log("ddd")} />

                </div>

                {/* document.getElementById('app') */}
              </div>


            </div>
          </form>




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


    </Container >
  )
}

const mapStateToProps = (state) => {
  var valueForm = getFormValues('formName')(state)
  return {
    //initial value form

    valueForm,
  }
}

const mapDispatchToProps = {
  createRequest
}

// set when component have input form
const contForm = reduxForm({
  form: 'formName',
  enableReinitialize: true, // set for redux-form can update data form API
})(ToDoList)

export default connect(mapStateToProps, mapDispatchToProps)(contForm)