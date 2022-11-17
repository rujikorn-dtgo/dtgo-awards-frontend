import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
// import { reduxForm, getFormValues, SubmissionError, Field } from 'redux-form'



import { Container } from './styled'


import FooTer from 'components/FooTer'
import { getChoiceAwards, getNomineesPage, getToken, genToken, con_date_now, con_datetime_now, getVotingPage } from 'ducks/NoMinees'


const Voting = (props) => {
  // console.log(props, 'propsssss')
  const {
    getChoiceAwards,
    ChoiceAwardsData,
    getNomineesPage,
    NoMineesData,
    getToken,
    genToken,
    getVotingPage,
    VotingData
  } = props
  // console.log(NoMineesData, 'NoMineesDatalog')
  console.log(VotingData, "VoingData")
  const [datanominees, setdatanominees] = useState(""
  )

  const [choice_detail, setchoice_detail] = useState({
    nameEn: "",
    nameTh: ""
  }
  )
  const [blooming_gen, setblooming_gen] = useState({
    votes: ""
  }

  )
  const [bloming_detail, setbloming_detail] = useState([])
  const [growing_detail, setgrowing_detail] = useState([])
  const [growing_gen, setgrowing_gen] = useState({
    votes: ""
  })

  const [number, setNumber] = useState(1)


  const goNomineesPage = async (e, name) => {

    await getNomineesPage(e)
    await getVotingPage(e)
    setNumber(e)



  }

  useEffect(() => {


    const date = con_date_now(new Date())
    console.log(typeof date, date, 'date')//20111108

    const chk1 = getChoiceAwards()
    console.log(chk1, 'chk1')
    getNomineesPage("1")
    getVotingPage("1")
    console.log(getVotingPage, 'getVotingPage')


  }, [])
  useEffect(() => {


    if (NoMineesData !== undefined && NoMineesData.length !== 0) {

      choice_detail.nameEn = NoMineesData.choiceDetail.nameEn
      choice_detail.nameTh = NoMineesData.choiceDetail.nameTh
      setchoice_detail({
        ...choice_detail
      })

    }
  }, [NoMineesData])


  useEffect(() => {


    if (VotingData !== undefined && VotingData.length !== 0) {
      console.log(VotingData, 'ef_VotingData')

      blooming_gen.votes = VotingData.bloomingGen.votes


      growing_gen.votes = VotingData.growingGen.votes

      setbloming_detail(VotingData.bloomingGen.listOfVoted)
      setgrowing_detail(VotingData.growingGen.listOfVoted)
      setblooming_gen({
        ...blooming_gen
      })
      setgrowing_gen({
        ...growing_gen
      })
    }
  }, [VotingData])



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
            <div className='lg:mt-10 my-2 h-full mb-20'>
              {/* web */}
              <div className=' lg:flex hidden  w-full my-5 text-xs font-bold text-brown  text-center      '>

                <div className='flex-col text-center  w-full 2xl:mx-60   lg:mx-28   bg-gray-200 rounded-full pl-3 py-2 '>
                  {blooming_gen.votes ? blooming_gen.votes : " 0 "} Votes

                </div>


              </div>

              {/* end-web */}

              {/* mobile */}
              <div className='  flex  w-full my-5 text-xs font-bold text-brown  text-center   lg:hidden     '>

                <div className='flex-col text-center  w-full mx-10   bg-gray-200 rounded-full pl-3 py-2 '>
                  {blooming_gen.votes ? blooming_gen.votes : " 0 "} Votes

                </div>
              </div>
              {/* end-mobile */}

              {/* web */}
              <div className=" lg:flex lg:flex-col lg:w-auto hidden">
                {console.log(bloming_detail, 'bloming_detail')}

                {bloming_detail ? bloming_detail.map((p, index) => (
                  <div class="flex flex-row  border border-gray-200 mx-3 my-1 rounded-lg p-2">

                    <div className=' w-4/12  text-right '>

                      <img className=" resize-img-voting rounded-full    object-fill   " src={p.picUrl !== null ? p.picUrl : "https://sv1.picz.in.th/images/2022/11/09/vV9j02.jpg"} alt="img" />
                      {/* <img className="cornerimage  " src="https://rfid.koder3.com/mask.png" alt="" /> */}

                    </div>
                    <div className='flex flex-col text-xs text-left w-full'>
                      <div className='mt-2 h-full'>
                        {p.nameEn}
                      </div>
                      <div className='my-2 h-full'>
                        {p.nameTh}
                      </div>
                      <div className='mb-2 h-full'>
                        <div className='flex flex-row  justify-center items-center '>


                          <div className='mr-2 text-blue-600  font-bold' style={{
                            color:
                              index + 1 == 1 ? "#D963B0"
                                : index + 1 == 2 ? "#FF993C"
                                  : index + 1 == 3 ? "#71B8F7"
                                    : index + 1 == 4 ? "#B9DD4A"
                                      : index + 1 == 5 ? "#EFACFF"
                                        : "C69F83"
                          }}>{p.totalVote}



                            {/* = {((100 / blooming_gen.votes) * p.totalVote)+"%"}  */}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            {/* <div className="bg-blue-600  h-2.5 rounded-full" style={{ width: `${((100 / blooming_gen.votes) * p.totalVote)}` }}></div> */}
                            <div className="bg-blue-600  h-2.5 rounded-full" style={{
                              width: `${((100 / blooming_gen.votes) * p.totalVote) + "%"} `,
                              backgroundColor:
                                index + 1 == 1 ? "#D963B0"
                                  : index + 1 == 2 ? "#FF993C"
                                    : index + 1 == 3 ? "#71B8F7"
                                      : index + 1 == 4 ? "#B9DD4A"
                                        : index + 1 == 5 ? "#EFACFF"
                                          : "C69F83"
                            }}></div>
                            {/* <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${p.totalVote}` }}></div> */}
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                ))
                  :
                  ""}

              </div>

              {/* end-web */}

              {/* mobile */}
              <div className='lg:hidden flex flex-col '>

                {bloming_detail ? bloming_detail.map((p, index) => (
                  <div class="flex flex-col  border border-gray-200 mx-3 rounded-lg p-2 text-xs">
                    <div className=' w-full mb-2 text-right '>

                      <img className=" resize-img-voting rounded-full    object-fill   " src={p.picUrl !== null ? p.picUrl : "https://sv1.picz.in.th/images/2022/11/09/vV9j02.jpg"} alt="img" />
                      {/* <img className="cornerimage  " src="https://rfid.koder3.com/mask.png" alt="" /> */}

                    </div>
                    <div>
                      <div className='flex flex-row  justify-center items-center '>
                        <div className='mr-2 text-blue-600  font-bold' style={{
                          color:
                            index + 1 == 1 ? "#D963B0"
                              : index + 1 == 2 ? "#FF993C"
                                : index + 1 == 3 ? "#71B8F7"
                                  : index + 1 == 4 ? "#B9DD4A"
                                    : index + 1 == 5 ? "#EFACFF"
                                      : "C69F83"
                        }}>{p.totalVote}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{
                            width: `${((100 / blooming_gen.votes) * p.totalVote) + "%"} `,
                            backgroundColor:
                              index + 1 == 1 ? "#D963B0"
                                : index + 1 == 2 ? "#FF993C"
                                  : index + 1 == 3 ? "#71B8F7"
                                    : index + 1 == 4 ? "#B9DD4A"
                                      : index + 1 == 5 ? "#EFACFF"
                                        : "C69F83"
                          }}></div>
                        </div>
                      </div>
                    </div>
                    <div className='mt-2'>
                      {p.nameEh}
                    </div>
                    <div className='my-2'>
                      {p.nameTh}
                    </div>
                  </div>
                ))
                  :
                  ""}



              </div>
              {/* end-mobile */}



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
            <div className='lg:mt-10 my-2 h-full mb-20'>
              {/* web */}
              <div className=' lg:flex hidden  w-full my-5 text-xs font-bold text-brown  text-center      '>

                <div className='flex-col text-center  w-full 2xl:mx-60   lg:mx-28   bg-gray-200 rounded-full pl-3 py-2 '>
                  {growing_gen.votes ? growing_gen.votes : " 0 "} Votes

                </div>

              </div>

              {/* end-web */}

              {/* mobile */}
              <div className='  flex  w-full my-5 text-xs font-bold text-brown  text-center   lg:hidden     '>

                <div className='flex-col text-center  w-full mx-10   bg-gray-200 rounded-full pl-3 py-2 '>
                  {growing_gen.votes ? growing_gen.votes : " 0 "} Votes

                </div>
              </div>
              {/* end-mobile */}

              {/* web */}
              <div className=" lg:flex lg:flex-col lg:w-auto hidden">
                {growing_detail ? growing_detail.map((p, index) => (
                  <div class="flex flex-row  border border-gray-200 mx-3 my-1 rounded-lg p-2">

                    <div className=' w-4/12  text-right '>

                      <img className=" resize-img-voting rounded-full    object-fill   " src={p.picUrl !== null ? p.picUrl : "https://sv1.picz.in.th/images/2022/11/09/vV9j02.jpg"} alt="img" />
                      {/* <img className="cornerimage  " src="https://rfid.koder3.com/mask.png" alt="" /> */}

                    </div>
                    <div className='flex flex-col text-xs text-left w-full'>
                      <div className='mt-2 h-full'>
                        {p.nameEn}
                      </div>
                      <div className='my-2 h-full'>
                        {p.nameTh}
                      </div>
                      <div className='mb-2 h-full'>
                        <div className='flex flex-row  justify-center items-center '>


                          <div className='mr-2 text-blue-600  font-bold' style={{
                            color:
                              index + 1 == 1 ? "#D963B0"
                                : index + 1 == 2 ? "#FF993C"
                                  : index + 1 == 3 ? "#71B8F7"
                                    : index + 1 == 4 ? "#B9DD4A"
                                      : index + 1 == 5 ? "#EFACFF"
                                        : "C69F83"
                          }}>{p.totalVote}



                            {/* = {((100 / blooming_gen.votes) * p.totalVote)+"%"}  */}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            {/* <div className="bg-blue-600  h-2.5 rounded-full" style={{ width: `${((100 / blooming_gen.votes) * p.totalVote)}` }}></div> */}
                            <div className="bg-blue-600  h-2.5 rounded-full" style={{
                              width: `${((100 / growing_gen.votes) * p.totalVote) + "%"} `,
                              backgroundColor:
                                index + 1 == 1 ? "#D963B0"
                                  : index + 1 == 2 ? "#FF993C"
                                    : index + 1 == 3 ? "#71B8F7"
                                      : index + 1 == 4 ? "#B9DD4A"
                                        : index + 1 == 5 ? "#EFACFF"
                                          : "C69F83"
                            }}></div>
                            {/* <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${p.totalVote}` }}></div> */}
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                ))
                  :
                  ""}
              </div>

              {/* end-web */}

              {/* mobile */}
              <div className='lg:hidden flex flex-col '>

                {growing_detail ? growing_detail.map((p, index) => (
                  <div class="flex flex-col  border border-gray-200 mx-3 rounded-lg p-2 text-xs">
                    <div className=' w-full mb-2 text-right '>

                      <img className=" resize-img-voting rounded-full    object-fill   " src={p.picUrl !== null ? p.picUrl : "https://sv1.picz.in.th/images/2022/11/09/vV9j02.jpg"} alt="img" />
                      {/* <img className="cornerimage  " src="https://rfid.koder3.com/mask.png" alt="" /> */}

                    </div>
                    <div>
                      <div className='flex flex-row  justify-center items-center '>
                        <div className='mr-2 text-blue-600  font-bold' style={{
                          color:
                            index + 1 == 1 ? "#D963B0"
                              : index + 1 == 2 ? "#FF993C"
                                : index + 1 == 3 ? "#71B8F7"
                                  : index + 1 == 4 ? "#B9DD4A"
                                    : index + 1 == 5 ? "#EFACFF"
                                      : "C69F83"
                        }}>{p.totalVote}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{
                            width: `${((100 / growing_gen.votes) * p.totalVote) + "%"} `,
                            backgroundColor:
                              index + 1 == 1 ? "#D963B0"
                                : index + 1 == 2 ? "#FF993C"
                                  : index + 1 == 3 ? "#71B8F7"
                                    : index + 1 == 4 ? "#B9DD4A"
                                      : index + 1 == 5 ? "#EFACFF"
                                        : "C69F83"
                          }}></div>
                        </div>
                      </div>
                    </div>
                    <div className='mt-2'>
                      {p.nameEn}
                    </div>
                    <div className='my-2'>
                      {p.nameTh}
                    </div>
                  </div>
                ))
                  :
                  ""}



              </div>
              {/* end-mobile */}



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
  console.log(state.NoMinees.VotingData.data, 'VotingData')
  return {
    //initial value form  
    ChoiceAwardsData: state.NoMinees.ChoiceAwardsData.data,
    NoMineesData: state.NoMinees.NoMineesData.data,
    VotingData: state.NoMinees.VotingData.data
    // valueForm,


  }
}

const mapDispatchToProps = {
  getChoiceAwards,
  getNomineesPage,
  getToken,
  genToken,
  getVotingPage
  // getComplainAll
}

// set when component have input form
// const contForm = reduxForm({
//   form: 'formName',
//   enableReinitialize: true, // set for redux-form can update data form API
// })(NoMinees)

export default connect(mapStateToProps, mapDispatchToProps)(Voting)