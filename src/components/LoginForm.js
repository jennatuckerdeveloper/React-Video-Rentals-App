import React, { useState } from 'react'
import FormInput from './common/FormInput'
import ComposeForm from './common/ComposeForm'
import Joi from 'joi-browser'
// import auth from '../services/authService'
import { useAuth } from '../hooks/useAuth'
import { useNavigate, useLocation } from 'react-router-dom'

const LoginForm = () => {
	const [formData, setFormData] = useState({ username: '', password: '' })
	const [errors, setErrors] = useState({})

	let navigate = useNavigate()
	let location = useLocation()
	let auth = useAuth()
	console.log('AUTH', auth)
	let from = location.state?.from?.pathname || '/'

	const schema = {
		username: Joi.string().required().label('Username'),
		password: Joi.string().required().min(5).label('Password')
	}

	const doSubmit = async () => {
		const { username: email, password } = formData
		auth.login({ email, password }, () => {
			// Send them back to the page they tried to visit when they were
			// redirected to the login page. Use { replace: true } so we don't create
			// another entry in the history stack for the login page.  This means that
			// when they get to the protected page and click the back button, they
			// won't end up back on the login page, which is also really nice for the
			// user experience.
			navigate(from, { replace: true })
		})
		// try {
		// 	await auth.login(formData.username, formData.password)
		// 	window.location = '/'
		// } catch (err) {
		// 	if (
		// 		err.response &&
		// 		err.response.status >= 400 &&
		// 		err.response.status < 500
		// 	) {
		// 		const newErrors = { ...errors, username: err.response.data }
		// 		setErrors(newErrors)
		// 	}
		// }
	}

	const updateFormData = (newData) => {
		setFormData(newData)
	}

	return (
		<React.Fragment>
			{/* <p>You must log in to view the page at {from}</p> */}
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
