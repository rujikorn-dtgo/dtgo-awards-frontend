import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
// import { reduxForm, getFormValues, SubmissionError, Field } from 'redux-form'



import { Container } from './styled'


import FooTer from 'components/FooTer'
import { getChoiceAwards, getNomineesPage, getToken, genToken, con_date_now, con_datetime_now } from 'ducks/NoMinees'

const Voting = (props) => {
  // console.log(props, 'propsssss')
  const {
    getChoiceAwards,
    ChoiceAwardsData,
    getNomineesPage,
    NoMineesData,
    getToken,
    genToken
  } = props
  console.log(NoMineesData, 'NoMineesDatalog')

  const [datanominees, setdatanominees] = useState(""
  )

  const [choice_detail, setchoice_detail] = useState({
    nameEn: "",
    nameTh: ""
  }
  )
  const [blooming_gen, setblooming_gen] = useState({
    nominees: "",
    nominators: ""
  }

  )
  const [bloming_detail, setbloming_detail] = useState([])
  const [growing_detail, setgrowing_detail] = useState([])
  const [growing_gen, setgrowing_gen] = useState({
    nominees: "",
    nominators: ""
  })

  const [number, setNumber] = useState(1)


  const goNomineesPage = async (e, name) => {
    await getNomineesPage(e)
    setNumber(e)



  }



  useEffect(() => {


    const date = con_date_now(new Date())
    console.log(typeof date, date, 'date')//20111108

    const chk1 = getChoiceAwards()
    console.log(chk1, 'chk1')
    getNomineesPage("1")



  }, [])

  useEffect(() => {


    if (NoMineesData !== undefined && NoMineesData.length !== 0) {
      console.log(NoMineesData, 'ef_NoMineesData')

      blooming_gen.nominees = NoMineesData.bloomingGen.nominees
      blooming_gen.nominators = NoMineesData.bloomingGen.nominators

      growing_gen.nominees = NoMineesData.growingGen.nominees
      growing_gen.nominators = NoMineesData.growingGen.nominators

      choice_detail.nameEn = NoMineesData.choiceDetail.nameEn
      choice_detail.nameTh = NoMineesData.choiceDetail.nameTh
      setchoice_detail({
        ...choice_detail
      })
      setbloming_detail(NoMineesData.bloomingGen.nomineesDetails)
      setgrowing_detail(NoMineesData.growingGen.nomineesDetails)
      setblooming_gen({
        ...blooming_gen
      })
      setgrowing_gen({
        ...growing_gen
      })
    }
  }, [NoMineesData])

  const refresh = () => {
    const timer = setTimeout(() => {
      window.location.reload();
      console.log('This will reload after 1 second!')
    }, 1000);
  }


  return (
    <Container>


      {/* bg */}

      <img src="https://sv1.picz.in.th/images/2022/10/17/pyDxo0.png" className='lg:block   hidden w-full' />

      <img src="https://sv1.picz.in.th/images/2022/10/21/vz3cha.png" className='block  lg:hidden w-full' />

      {/* main */}
      {/* <ContainerMain> */}

      <div className='mt-5  lg:mx-20 '>

        <div className='text-center ui-text-color-award   lg:text-3xl text-2xl  my-4 text-red'>
          Real Time : Voting Results <br className='lg:hidden'></br> For DTGO AWARDS 2022
        </div>

        <div className='text-center   font-db-helvethaica  lg:text-base text-xs mb-6 '>
          <div>
            {choice_detail.nameEn ? choice_detail.nameEn : ""}
          </div>

          <div className='mx-4'>
            {choice_detail.nameTh ? choice_detail.nameTh : ""}
          </div>

        </div>

        {/* mobile */}
        <div className='mx-4 mb-4 lg:hidden '>
          <select className='w-full bg-white border-yellow  h-11 rounded-full  pl-5 pr-3  outline-none text-yellow text-base ' onChange={(e) => goNomineesPage(e.target.value)} >
            {ChoiceAwardsData ? ChoiceAwardsData.map((p, index) => (
              <option value={p.no} className=' broder-2 border-yellow'>{p.no}. {p.name}
              </option>
            ))
              :
              ""}

          </select>


          <div className='flex mt-4  mx-4 text-brown text-sm'>

            <div className=' flex-col w-1/2  text-left '>
              <div>
                Nominees :{blooming_gen.nominees ? blooming_gen.nominees : " 0 "}

              </div>
              <div>
                Nominators : {blooming_gen.nominators ? blooming_gen.nominators : " 0 "}
              </div>

            </div>
            <div className=' flex-col w-1/2 text-right'>
              <div>
                Nominees :
                {growing_gen.nominees ? growing_gen.nominees : " 0 "}
              </div>
              <div>
                Nominators :
                {growing_gen.nominators ? growing_gen.nominators : " 0 "}
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
              <div className=' lg:flex hidden  w-full my-5 text-xs font-bold text-brown  text-center      '>

                <div className='flex-col text-center  w-full 2xl:mx-60   lg:mx-28   bg-gray-200 rounded-full pl-3 py-2 '>
                  {blooming_gen.nominees ? blooming_gen.nominees : " 0 "} Votes

                </div>


              </div>
              {/* end-web */}

              <div class="flex flex-col">
                <div class="flex flex-row  border border-gray-200 mx-3 rounded-lg p-2">
                  <div className=' w-4/12  text-right '>

                    <img className=" resize-img-voting rounded-full    object-fill   " src="https://sv1.picz.in.th/images/2022/11/09/vV9j02.jpg" alt="img" />
                    {/* <img className="cornerimage  " src="https://rfid.koder3.com/mask.png" alt="" /> */}


                  </div>
                  <div className='flex flex-col text-xs text-left w-full'>
                    <div className='mt-2 h-full'>
                      Hathairat Jaroenkanjanapaisan
                    </div>
                    <div className='my-2 h-full'>
                      หทัยรัตน์ เจริญกาญจนไพศาล
                    </div>
                    <div className='mb-2 h-full'>
                      <div className='flex flex-row  justify-center items-center '>
                        <div className='mr-2 text-blue-600  font-bold'>122</div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `60%` }}></div>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
                <div>02</div>
                <div>03</div>
              </div>

              {/* 
              <div className='  grid lg:grid-cols-2   grid-cols-1  h-auto  text-xs  ml-7   '>




              </div> */}

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
              <div className=' lg:flex hidden  w-full my-5 text-xs font-bold text-brown  text-center      '>

                <div className='flex-col text-center  w-full 2xl:mx-60   lg:mx-28   bg-gray-200 rounded-full pl-3 py-2 '>
                  {growing_gen.nominees ? growing_gen.nominees : " 0 "} Votes

                </div>


              </div>
              {/* end-web */}

              <div className='  grid lg:grid-cols-2   grid-cols-1  h-auto  text-xs  ml-7   '>


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
  getToken,
  genToken
  // getComplainAll
}

// set when component have input form
// const contForm = reduxForm({
//   form: 'formName',
//   enableReinitialize: true, // set for redux-form can update data form API
// })(NoMinees)

export default connect(mapStateToProps, mapDispatchToProps)(Voting)