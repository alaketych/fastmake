import React, { useState } from 'react'
import {} from '../configuration/app';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Field, Form, Formik } from 'formik';
import { getUserData } from '../api';
import * as Yup from 'yup'

const SendMessage = Yup.object().shape({    
    name: Yup.string()
        .min(2, 'Name should have at least 2 symbols')
        .max(20, 'Name must not exceed more than 20 symbols')
        .required('Required to fill'),

    email: Yup.string()
            .email('Please enter a valid email address')
            .required('Required to fill'),
        
    password: Yup.string()
            .min(6, 'Password can not contain at least 6 character')
            .required('Required to fill')
})


function Log({ setToken }) {

    const dispatch = useDispatch();
    const history = useHistory();

    const onLoginHandler = (e, credits) => {
        e.preventDefault();
        const redirectToMainPage = () => {
            history.push('/')
        }
        dispatch(getUserData(credits, redirectToMainPage));
    };

    return (
        <Formik
            initialValues={{
                email : '',
                password: '',
            }}
            validationSchema={ SendMessage }
            handleSubmit = {() => {}}
        >
            {
                ({ values, touched, errors, isValid,
                    handleBlur, isSubmitting,
                    handleChange, handleSubmit, ...rest }) => (
                        <Form autoComplete="off"
                            onSubmit={ e => onLoginHandler(e, {
                                email: values.email,
                                password: values.password,
                            })}>

                            <label htmlFor="email">Email</label>
                            <Field
                                id="email"
                                name="email"
                                type="email"
                                onBlur={ handleBlur }
                                value={ values.email || '' }
                                placeholder="Your email"
                                onChange={ handleChange }
                                className={errors.email && touched.email && "error"}
                            />
                            {
                                errors.email && touched.email && (
                                    <div className="input-feedback">
                                        {errors.email}
                                    </div>
                                )
                            }
                            
                            <label htmlFor="password">Password</label>
                            <Field
                                id="password"
                                type="password"
                                name="password"
                                value={ values.password || ''}
                                onBlur={ handleBlur }
                                placeholder="Your passowrd"
                                onChange={ handleChange }
                                className={errors.password && touched.password && "error"}
                            />
                            {
                                errors.password && touched.password && (
                                    <div className="input-feedback">
                                        {errors.password}
                                    </div>
                                )
                            }


                            <button
                                type="submit"
                                className="button foreground center medium-space-top"
                            >
                                Sign in
                            </button>
                        </Form>
                )
            }
        </Formik>
    )
}

export default Log