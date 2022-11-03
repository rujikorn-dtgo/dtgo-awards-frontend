import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
// import { reduxForm, getFormValues, SubmissionError, Field } from 'redux-form'



import { Container } from './styled'


import FooTer from 'components/FooTer'
import { getChoiceAwards, getNomineesPage, getToken } from 'ducks/NoMinees'

const NoMinees = (props) => {
  // console.log(props, 'propsssss')
  const {
    getChoiceAwards,
    ChoiceAwardsData,
    getNomineesPage,
    NoMineesData,
    getToken
  } = props
  console.log(NoMineesData, 'NoMineesDatalog')

  const [datanominees, setdatanominees] = useState(""
  )
  const [blooming_gen, setblooming_gen] = useState({
    nominees: "",
    nominators: ""
  }
  )
  const [bloming_detail, setbloming_detail] = useState([])
  const [growing_gen, setgrowing_gen] = useState({
    nominees: "",
    nominators: ""
  })
  // const [datanominators, setdatanominators] = useState(""
  // )
  const goNomineesPage = (e, name) => {
    // console.log(e.target.value, 'value')
    // // setValues(e.target.value)
    // setValues(e.target.value)
    // console.log(e, 'eeee')
    getNomineesPage(e)
    // console.log(data, 'data')
    // console.log(NoMineesData, 'NoMineesData')
    // console.log(NoMineesData.bloomingGen.nominators, 'nominators')
    // console.log(NoMineesData.bloomingGen.nominees, 'nominees')

  }

  useEffect(async () => {
    // console.log(getToken(), 'getToken')
    // console.log(getToken(), "token")
    // console.log(getComplainAll(),"getComplainAll")
    // Dataload()
    console.log(localStorage.getItem('access_token') == null, 'access_token')
    if (localStorage.getItem('access_token') == null) {
      console.log('null')
      await getToken()
      window.location.reload()
      await getChoiceAwards()
    } else {
      await getChoiceAwards()
      console.log('not null')
    }
    // console.log(localStorage.getItem('access_token'), 'access_token')
    // console.log(getChoiceAwards(), 'getChoiceAwards')

  }, [])

  useEffect(() => {
    // if (showNoMineesData) { setShowNoMineesData(NoMineesData) }

    if (NoMineesData !== undefined && NoMineesData.length !== 0) {
      console.log(NoMineesData, 'ef_NoMineesData')
      // console.log(NoMineesData.bloomingGen.nominators, 'nominators')
      // console.log(NoMineesData.bloomingGen.nominees, 'nominees')
      // setblooming_gen(nominees:"",nominators:)
      blooming_gen.nominees = NoMineesData.bloomingGen.nominees
      blooming_gen.nominators = NoMineesData.bloomingGen.nominators

      growing_gen.nominees = NoMineesData.growingGen.nominees
      growing_gen.nominators = NoMineesData.growingGen.nominators
      // console.log(NoMineesData.bloomingGen.nomineesDetails,'blooming_gen.nomineesDetails')
      setbloming_detail(NoMineesData.bloomingGen.nomineesDetails)
      setblooming_gen({
        ...blooming_gen
      })
      setgrowing_gen({
        ...growing_gen
      })
    }
  }, [NoMineesData])








  // const Dataload = async () => {



  // }
  return (
    <Container>


      {/* bg */}

      <img src="https://sv1.picz.in.th/images/2022/10/17/pyDxo0.png" className='lg:block  hidden w-full' />

      <img src="https://sv1.picz.in.th/images/2022/10/21/vz3cha.png" className='block  lg:hidden w-full' />
      {/* main */}
      {/* <ContainerMain> */}

      <div className='mt-5  lg:mx-20 '>

        <div className='text-center ui-text-color-award   lg:text-3xl text-2xl  my-4'>
          Nominees for DTGO Awards <br className='lg:hidden'></br> 2022
        </div>

        <div className='text-center   font-db-helvethaica  lg:text-base text-xs mb-6'>
          The member who brings happiness whenever they go
        </div>

        {/* mobile */}
        <div className='mx-4 mb-4 lg:hidden   '>
          <select className='w-full bg-white border-yellow  h-11 rounded-full  pl-5 pr-3  outline-none text-yellow text-base '  >
            <option value="" className=' broder-2 border-yellow'>1. DTGO Happiness Hero Award </option>
            <option value="">2</option>
            <option value="">--------------------</option>
          </select>


          <div className='flex mt-4  mx-4 text-brown text-sm'>

            <div className=' flex-col w-1/2  text-left '>
              <div>
                Nominees : 1,500

              </div>
              <div>
                Nominators : 2,500
              </div>

            </div>
            <div className=' flex-col w-1/2 text-right'>
              <div>
                Nominees : 1,500
              </div>
              <div>
                Nominators : 2,500
              </div>

            </div>



          </div>
        </div>
        {/* end-mobile */}

        <div className='  w-full  h-max flex font-db-helvethaica '>
          {/* web */}


          <div className=' lg:flex lg:flex-col lg:w-auto hidden    '>
            {ChoiceAwardsData ? ChoiceAwardsData.map((p, index) => (
              <div className='mb-4'>
                <button className='bg-sidebar-image-1 w-full h-full text-white   object-fill  hoverMebottom button   ' onClick={(e) => goNomineesPage(p.no)} >
                  <div className=' relative  flex-row h-full'>
                    <div className=' w-5/6  flex  justify-center items-center  h-full m-auto text-sm   '>{p.name}</div>
                    <div className=' w-1/6  absolute  bottom-1 -right-3 text-xs '>{p.no}</div>
                  </div>
                </button>
              </div>
            ))
              :
              ""}



          </div>
          {/* end-web */}
          <div className=' flex   flex-col w-3/5 h-max text-center   lg:rounded-web  rounded-lg   border-yellow      ml-3 mt-8  '>
            <div className="relative">
              <div className="absolute inset-0 -top-7  lg:-top-9  lg:mx-20 mx-4 rounded-blooming   lg:h-16 h-10  bg-color-dtgo-awards ">
                <div className='flex text-center justify-center items-center  h-full  text-white  font-bold lg:text-lg text-xs'>
                  Blooming Gen
                </div>
              </div>
            </div>
            <div className='mt-10 h-full mb-20'>
              {/* web */}
              <div className=' lg:flex hidden  w-full my-5 text-xs font-bold text-brown '>
                <div className='flex-col w-1/4 '>

                </div>
                <div className='flex-col  w-1/2 bg-gray-200 rounded-l-full pl-3 py-2 border-r border-black'>
                  {/* {NoMineesData.bloomingGen.nominees} */}
                  Nominees :
                  {blooming_gen.nominees ? blooming_gen.nominees : " 0 "}
                  {/* {NoMineesData.data ? NoMineesData.bloomingGen.nominees : "0"} */}
                  {/* {NoMineesData ? NoMineesData.bloomingGen.nominees : "0"} */}
                </div>
                <div className='flex-col  w-1/2  bg-gray-200 rounded-r-full pr-3 py-2'>
                  Nominators : {blooming_gen.nominators ? blooming_gen.nominators : " 0 "}
                </div>
                <div className='flex-col w-1/4 '>

                </div>
              </div>
              {/* end-web */}




              <div className='  grid lg:grid-cols-2   grid-cols-1  h-auto  text-xs  ml-7   '>
                {console.log(bloming_detail, 'bloming_detail')}
                <div className="containerdiv  w-4/5  my-2 ">
                  <img className="myimg" src="https://sv1.picz.in.th/images/2022/10/27/v1F1an.png" alt="img" />
                  <img className="cornerimage" src="https://rfid.koder3.com/mask.png" alt="" />
                  <div className='  font-bold my-1'>
                    Hathairat Jaroenkanjanapaisan
                  </div>
                  <div>
                    หทัยรัตน์ เจริญกาญจนไพศาล
                  </div>
                </div>

                <div className="containerdiv w-4/5 my-2 ">
                  <img className="myimg" src="https://sv1.picz.in.th/images/2022/10/27/v1F1an.png" alt="img" />
                  <img className="cornerimage" src="https://rfid.koder3.com/mask.png" alt="" />
                  <div className='  font-bold my-1'>
                    Hathairat Jaroenkanjanapaisan
                  </div>
                  <div>
                    หทัยรัตน์ เจริญกาญจนไพศาล
                  </div>
                </div>

                <div className="containerdiv w-4/5 my-2 ">
                  <img className="myimg" src="https://sv1.picz.in.th/images/2022/10/27/v1F1an.png" alt="img" />
                  <img className="cornerimage" src="https://rfid.koder3.com/mask.png" alt="" />
                  <div className='  font-bold my-1'>
                    Hathairat Jaroenkanjanapaisan
                  </div>
                  <div>
                    หทัยรัตน์ เจริญกาญจนไพศาล
                  </div>
                </div>

                <div className="containerdiv w-4/5 my-2 ">
                  <img className="myimg" src="https://sv1.picz.in.th/images/2022/10/27/v1F1an.png" alt="img" />
                  <img className="cornerimage" src="https://rfid.koder3.com/mask.png" alt="" />
                  <div className='  font-bold my-1'>
                    Hathairat Jaroenkanjanapaisan
                  </div>
                  <div>
                    หทัยรัตน์ เจริญกาญจนไพศาล
                  </div>
                </div>


              </div>

            </div>
          </div>
          <div className=' flex flex-col w-3/5   h-max  text-center  lg:rounded-web   rounded-lg  border-yellow  mt-8 mx-4   '>
            <div className="relative">
              <div className="absolute inset-0 -top-7  lg:-top-9  lg:mx-20 mx-4 rounded-growing    lg:h-16 h-10  bg-color-dtgo-awards ">
                <div className='flex text-center justify-center items-center  h-full  text-white  font-bold lg:text-lg text-xs'>
                  Growing Gen
                </div>
              </div>
            </div>

            <div className='mt-10 h-full mb-20'>
              {/* web */}
              <div className=' lg:flex hidden  w-full my-5 text-xs font-bold text-brown '>
                <div className='flex-col w-1/4 '>

                </div>
                <div className='flex-col  w-1/2 bg-gray-200 rounded-l-full pl-3 py-2 border-r border-black'>
                  Nominees :
                  {growing_gen.nominees ? growing_gen.nominees : " 0 "}

                </div>
                <div className='flex-col  w-1/2  bg-gray-200 rounded-r-full pr-3 py-2'>
                  Nominators :
                  {growing_gen.nominators ? growing_gen.nominators : " 0 "}
                </div>
                <div className='flex-col w-1/4 '>

                </div>
              </div>
              {/* end-web */}
              {/* <div className=' flex   text-xs  '>

                <div className='flex-col w-1/2 ml-7  '>
                  <div className="containerdiv ">
                    <img className="myimg" src="https://sv1.picz.in.th/images/2022/10/27/v1F1an.png" alt="img" />
                    <img className="cornerimage" src="https://rfid.koder3.com/mask.png" alt="" />
                    <div className='  font-bold my-1'>
                      Hathairat Jaroenkanjanapaisan
                    </div>
                    <div>
                      หทัยรัตน์ เจริญกาญจนไพศาล
                    </div>
                  </div>
                </div>
                <div className='flex-col   w-1/2  mx-7'>
                <div className="containerdiv ">
                    <img className="myimg" src="https://sv1.picz.in.th/images/2022/10/27/v1F1an.png" alt="img" />
                    <img className="cornerimage" src="https://rfid.koder3.com/mask.png" alt="" />
                    <div className='  font-bold my-1'>
                      Hathairat Jaroenkanjanapaisan
                    </div>
                    <div>
                      หทัยรัตน์ เจริญกาญจนไพศาล
                    </div>
                  </div>
                </div>

              </div> */}



              <div className='  grid lg:grid-cols-2   grid-cols-1  h-auto  text-xs  ml-7   '>

                <div className="containerdiv  w-4/5  my-2 ">
                  <img className="myimg" src="https://sv1.picz.in.th/images/2022/10/27/v1F1an.png" alt="img" />
                  <img className="cornerimage" src="https://rfid.koder3.com/mask.png" alt="" />
                  <div className='  font-bold my-1'>
                    Hathairat Jaroenkanjanapaisan
                  </div>
                  <div>
                    หทัยรัตน์ เจริญกาญจนไพศาล
                  </div>
                </div>

                <div className="containerdiv w-4/5 my-2 ">
                  <img className="myimg" src="https://sv1.picz.in.th/images/2022/10/27/v1F1an.png" alt="img" />
                  <img className="cornerimage" src="https://rfid.koder3.com/mask.png" alt="" />
                  <div className='  font-bold my-1'>
                    Hathairat Jaroenkanjanapaisan
                  </div>
                  <div>
                    หทัยรัตน์ เจริญกาญจนไพศาล
                  </div>
                </div>






              </div>

            </div>
          </div>

        </div>

        {/* </ContainerMain> */}
      </div>

      <FooTer>

      </FooTer>
    </Container >

  )

}

const mapStateToProps = (state) => {
  // var valueForm = getFormValues('formName')(state)
  console.log(state, 'state')
  console.log(state.NoMinees.NoMineesData.data, 'NoMinees')

  return {
    //initial value form  
    ChoiceAwardsData: state.NoMinees.ChoiceAwardsData.data,
    NoMineesData: state.NoMinees.NoMineesData.data
    // valueForm,


  }
}

const mapDispatchToProps = {
  getChoiceAwards,
  getNomineesPage,
  getToken
  // getComplainAll
}

// set when component have input form
// const contForm = reduxForm({
//   form: 'formName',
//   enableReinitialize: true, // set for redux-form can update data form API
// })(NoMinees)

export default connect(mapStateToProps, mapDispatchToProps)(NoMinees)