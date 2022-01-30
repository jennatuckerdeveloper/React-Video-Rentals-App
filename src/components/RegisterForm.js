import React from 'react'
import FormInput from './common/FormInput'
import ComposeForm from './common/ComposeForm'
import Joi from 'joi-browser'

class RegisterForm extends React.Component {
	state = {
		formData: { email: '', password: '', name: '' }
	}

	schema = {
		email: Joi.string()
			.email({
				minDomainSegments: 2,
				tlds: { allow: ['com', 'net'] }
			})
			.label('Email'),
		password: Joi.string().required().min(3).label('Password'),
		name: Joi.string().alphanum().required().label('Name')
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
				submitButtonLabel={'Register'}
				formData={formData}
				schema={this.schema}
				updateFormData={this.updateFormData}>
				<FormInput type='text' name='email' label='Email' />
				<FormInput type='password' name='password' label='Password' />
				<FormInput type='text' name='name' label='Name' />
			</ComposeForm>
		)
	}
}

export default RegisterForm
