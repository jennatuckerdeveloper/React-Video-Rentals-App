import React, { useState } from 'react'
import FormInput from './common/FormInput'
import ComposeForm from './common/ComposeForm'
import Joi from 'joi-browser'
import { useAuth } from '../hooks/useAuth'
import { useNavigate, useLocation } from 'react-router-dom'

const LoginForm = () => {
	const [formData, setFormData] = useState({ username: '', password: '' })
	const [errors, setErrors] = useState({})

	let navigate = useNavigate()
	let location = useLocation()
	let auth = useAuth()
	let from = location.state?.from?.pathname || '/'

	const schema = {
		username: Joi.string().required().label('Username'),
		password: Joi.string().required().min(5).label('Password')
	}

	const doSubmit = async () => {
		const { username: email, password } = formData

		try {
			await auth.login({ email, password }, () => {
				navigate(from, { replace: true })
			})
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
		<React.Fragment>
			<h3 className='mb-3'>Login</h3>
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
		</React.Fragment>
	)
}

export default LoginForm
