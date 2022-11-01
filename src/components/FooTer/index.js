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

    }, [])



    return (
        <div className=' flex  h-12 w-full   '>

      

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