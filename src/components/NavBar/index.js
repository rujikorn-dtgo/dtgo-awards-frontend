import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getFormValues } from 'redux-form'
import { getTextResult, textKey } from 'core/textResult'

// import { saveTodo } from 'ducks/todo'

// import { Container } from './styled'


const NavBar = (props) => {

    const {
        valueForm,
        saveTodo,
    } = props


    const handleChange = (e, name) => {

        console.log(name)
        localStorage.setItem('language', name);
        // setLanguage(name)

        window.location.reload()


    }
    useEffect(() => {
        if (localStorage.getItem('language') == "") {
            localStorage.setItem('language', "en");
        }
    }, [])



    return (
        <div className=' flex  h-12 w-full  m-auto font-bold '>

            <div className="grid grid-cols-3  content-center  ">
                <div className=' mx-2'>
                    {localStorage.getItem('language') == "th" ?
                        <button className=' text-sm bg-gray-500 hover:bg-yellow-500 text-white  hover:text-white py-1 px-3 border border-grey hover:border-transparent rounded  ' onClick={(e) => handleChange(e, "en")} >EN</button>
                        : ""}
                    {localStorage.getItem('language') == "en" ?
                        <button className=' text-sm bg-gray-500 hover:bg-yellow-500 text-white  hover:text-white py-1 px-3 border border-grey hover:border-transparent rounded  ' onClick={(e) => handleChange(e, "th")} >TH</button>
                        : ""}




                    <div>

                    </div>
                </div>
                <div>
                    <button className='text-sm bg-white  text-gray-500  py-1 px-3 border-l border-grey hover:border-transparent rounded '> {getTextResult(textKey.BACK)}   </button>

                </div>

            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    var valueForm = getFormValues('formName')(state)
    return {
        //initial value form
        initialValues: {
            firstname: 'Foo',
            lastname: 'Bar'
        },
        valueForm,
    }
}

const mapDispatchToProps = {

}



export default connect(mapStateToProps, mapDispatchToProps)(NavBar)