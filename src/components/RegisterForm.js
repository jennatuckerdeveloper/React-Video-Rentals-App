import React, { useState } from 'react'
import FormInput from './common/FormInput'
import ComposeForm from './common/ComposeForm'
import Joi from 'joi-browser'
import { newUser } from '../services/userService'
import { useAuth } from '../hooks/useAuth'
import { useNavigate, useLocation } from 'react-router-dom'

const RegisterForm = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		name: ''
	})
	const [errors, setErrors] = useState({})

	let navigate = useNavigate()
	let location = useLocation()
	let auth = useAuth()
	let from = location.state?.from?.pathname || '/'

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
			await auth.register(jwt, () => {
				navigate(from, { replace: true })
			})
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
		<React.Fragment>
			<h3 className='mb-3'>Register</h3>
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
		</React.Fragment>
	)
}

export default RegisterForm
