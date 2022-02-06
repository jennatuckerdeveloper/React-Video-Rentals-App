import React from 'react'
import FormInput from './common/FormInput'
import ComposeForm from './common/ComposeForm'
import Joi from 'joi-browser'
import { newUser } from '../services/userService'
import auth from '../services/authService'

class RegisterForm extends React.Component {
	state = {
		formData: { email: '', password: '', name: '' },
		errors: {}
	}

	schema = {
		email: Joi.string()
			.email({
				minDomainSegments: 2,
				tlds: { allow: ['com', 'net'] }
			})
			.label('Email'),
		password: Joi.string().required().min(5).label('Password'),
		name: Joi.string().alphanum().required().label('Name')
	}

	doSubmit = async () => {
		try {
			const { formData } = this.state
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
				const errors = { ...this.state.errors, email: err.response.data }
				this.setState({ errors })
			}
		}
	}

	updateFormData = (newData) => {
		this.setState({ formData: newData })
	}

	render() {
		const { formData, errors } = this.state
		return (
			<ComposeForm
				doSubmit={this.doSubmit}
				submitButtonLabel={'Register'}
				formData={formData}
				schema={this.schema}
				updateFormData={this.updateFormData}
				errors={errors}>
				<FormInput type='text' name='email' label='Email' />
				<FormInput type='password' name='password' label='Password' />
				<FormInput type='text' name='name' label='Name' />
			</ComposeForm>
		)
	}
}

export default RegisterForm
