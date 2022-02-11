import React, { useState } from 'react'
import FormInput from './common/FormInput'
import ComposeForm from './common/ComposeForm'
import Joi from 'joi-browser'
import auth from '../services/authService'

const LoginForm = () => {
	const [formData, setFormData] = useState({ username: '', password: '' })
	const [errors, setErrors] = useState({})

	const schema = {
		username: Joi.string().required().label('Username'),
		password: Joi.string().required().min(5).label('Password')
	}

	const doSubmit = async () => {
		try {
			await auth.login(formData.username, formData.password)
			window.location = '/'
		} catch (err) {
			if (
				err.response &&
				err.response.status >= 400 &&
				err.response.status < 500
			) {
				const newErrors = { ...errors, username: err.response.data }
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
			submitButtonLabel={'Login'}
			formData={formData}
			schema={schema}
			updateFormData={updateFormData}
			errors={errors}>
			<FormInput type='text' name='username' label='Username' />
			<FormInput type='password' name='password' label='Password' />
		</ComposeForm>
	)
}

export default LoginForm
