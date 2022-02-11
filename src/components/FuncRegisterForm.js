import React, { useState, useEffect } from 'react'
import FormInput from './common/FormInput'
import ComposeForm from './common/ComposeForm'
import Joi from 'joi-browser'
import { newUser } from '../services/userService'
import auth from '../services/authService'

const RegisterForm = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		name: ''
	})
	const [errors, setErrors] = useState({})

	const schema = {
		email: Joi.string()
			.email({
				minDomainSegments: 2,
				tlds: { allow: ['com', 'net'] }
			})
			.label('Email'),
		password: Joi.string().required().min(5).label('Password'),
		name: Joi.string().alphanum().required().label('Name')
	}

	const doSubmit = async () => {
		try {
			const res = await newUser(formData)
			const jwt = res.headers['x-auth-token']
			auth.loginWithJwt(jwt)
			window.location = '/'
		} catch (err) {
			if (
				err.response &&
				err.response.status >= 400 &&
				err.response.status < 500
			) {
				const newErrors = { ...errors, email: err.response.data }
				setErrors(newErrors)
			}
		}
	}

	const updateFormData = (newData) => {
		setFormData(newData)
	}

	return (
		<ComposeForm
			doSubmit={doSubmit}
			submitButtonLabel={'Register'}
			formData={formData}
			schema={schema}
			updateFormData={updateFormData}
			errors={errors}>
			<FormInput type='text' name='email' label='Email' />
			<FormInput type='password' name='password' label='Password' />
			<FormInput type='text' name='name' label='Name' />
		</ComposeForm>
	)
}

export default RegisterForm
