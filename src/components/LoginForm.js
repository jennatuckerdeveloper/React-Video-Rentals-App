import React from 'react'
import FormInput from './common/FormInput'
import ComposeForm from './common/ComposeForm'
import Joi from 'joi-browser'
import auth from '../services/authService'

class LoginForm extends React.Component {
	state = {
		formData: { username: '', password: '' },
		errors: {}
	}

	schema = {
		username: Joi.string().required().label('Username'),
		password: Joi.string().required().min(5).label('Password')
	}

	doSubmit = async () => {
		try {
			const { formData } = this.state
			await auth.login(formData.username, formData.password)
			window.location = '/'
		} catch (err) {
			if (
				err.response &&
				err.response.status >= 400 &&
				err.response.status < 500
			) {
				const errors = { ...this.state.errors, username: err.response.data }
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
				submitButtonLabel={'Login'}
				formData={formData}
				schema={this.schema}
				updateFormData={this.updateFormData}
				errors={errors}>
				<FormInput type='text' name='username' label='Username' />
				<FormInput type='password' name='password' label='Password' />
			</ComposeForm>
		)
	}
}

export default LoginForm
