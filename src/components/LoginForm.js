import React from 'react'
import FormInput from './common/FormInput'
import ComposeForm from './common/ComposeForm'
import Joi from 'joi-browser'

class LoginForm extends React.Component {
	state = {
		formData: { username: '', password: '' }
	}

	schema = {
		username: Joi.string().alphanum().min(3).required().label('Username'),
		password: Joi.string().required().min(3).label('Password')
	}

	doSubmit = () => {
		console.log('SUBMIT')
	}

	updateFormData = (newData) => {
		this.setState({ formData: newData })
	}

	render() {
		const { formData } = this.state
		return (
			<ComposeForm
				doSubmit={this.doSubmit}
				submitButtonLabel={'Login'}
				formData={formData}
				schema={this.schema}
				updateFormData={this.updateFormData}>
				<FormInput type='text' name='username' label='Username' />
				<FormInput type='password' name='password' label='Password' />
			</ComposeForm>
		)
	}
}

export default LoginForm
