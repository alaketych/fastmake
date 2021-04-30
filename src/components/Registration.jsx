import React, {useState, useEffect} from 'react'
import { Field, Form, Formik } from 'formik';
import { registerUser } from '../api';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {} from '../configuration/app'
import * as Yup from 'yup';
import { userSetDefaultEmail } from '../redux/actions';

const SendMessage = Yup.object().shape({
    firstName: Yup.string()
            .min(2, 'Name should have at least 2 symbols')
            .max(20, 'Name must not exceed more than 20 symbols')
            .required('Required to fill'),
            
    lastName: Yup.string()
            .min(2, 'Name should have at least 2 symbols')
            .max(20, 'Name must not exceed more than 20 symbols')
            .required('Required to fill'),

    email: Yup.string()
            .email('Please enter a valid email address')
            .required('Required to fill'),

    phone: Yup.number()
            .min(8, 'Phone number has at least 8 digits')
            .required('Required to fill')
            .positive()
            .integer(),

    password: Yup.string()
        .min(6, 'Password should be at least with 6 characters')
        .required(),

    txt: Yup.string()
            .min(10, 'Field should have at least 10 symbols')
            .required('Required to fill')
})

function Registration() {

    const history = useHistory();
    const dispatch = useDispatch();

    const onSubmitHandler = (e, credits) => {
        e.preventDefault();
        
        const redirectToMainPage = email => {
            history.push('/login');
            dispatch(userSetDefaultEmail(email))
        }
        dispatch(registerUser(credits, redirectToMainPage));
    }

    return (
        <Formik
            initialValues={{
                firstName : '',
                lastName: '',
                phone: '',
                email: '',
                password: '',
            }}

            validationSchema={ SendMessage }
            
            onSubmit = {(values, { setSubmitting }) => {(
                setTimeout(() => {
                    console.log('Putted: ', values)
                }, 500))
            }}            
        >
            {
                ({ values, touched, errors, isValid,
                    handleBlur, isSubmitting,
                    handleChange, handleSubmit }) => (
                        <Form autoComplete="off"
                            onSubmit={(e) => onSubmitHandler(e, values) }>

                            <label htmlFor="firstName">First Name</label>
                            <Field
                                id="firstName"
                                name="firstName"
                                value={ values.firstName }
                                onBlur={ handleBlur }
                                placeholder="Your first name"
                                onChange={ handleChange }
                                className={errors.firstName && touched.firstName && "error"}
                            />
                            {
                                errors.firstName && touched.firstName && (
                                    <div className="input-feedback">
                                        {errors.firstName}
                                    </div>
                                )
                            }

                            <label htmlFor="lastName">Last Name</label>
                            <Field
                                id="lastName"
                                name="lastName"
                                value={ values.lastName }
                                onBlur={ handleBlur }
                                placeholder="Your last name"
                                onChange={ handleChange }
                                className={errors.lastName  && touched.lastName && "error"}
                            />
                            {
                                errors.lastName && touched.lastName && (
                                    <div className="input-feedback">
                                        {errors.lastName}
                                    </div>
                                )
                            }

                            <label htmlFor="email">Email</label>
                            <Field
                                id="email"
                                name="email"
                                type="email"
                                onBlur={ handleBlur }
                                value={ values.email }
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
                            <label htmlFor="name">Password</label>
                            <Field
                                id="password"
                                name="password"
                                value={ values.password }
                                type={'password'}
                                onBlur={ handleBlur }
                                placeholder="Your password"
                                onChange={ handleChange }
                                className={errors.password  && touched.password && "error"}
                            />
                            {
                                errors.password && touched.password && (
                                    <div className="input-feedback">
                                        {errors.password}
                                    </div>
                                )
                            }
                            <label htmlFor="name">Phone</label>
                            <Field
                                id="phone"
                                name="phone"
                                value={ values.phone }
                                onBlur={ handleBlur }
                                placeholder="Your last name"
                                onChange={ handleChange }
                                placeholder="+380 XX XXX XX XX"
                                className={errors.phone  && touched.phone && "error"}
                            />
                            {
                                errors.phone && touched.phone && (
                                    <div className="input-feedback">
                                        {errors.phone}
                                    </div>
                                )
                            }

                            <button type="submit" className="button foreground center medium-space-top">Sign up</button>
                        </Form>
                )
            }
        </Formik>
    )
}

export default Registration