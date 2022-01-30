import React from 'react'
import Joi from 'joi-browser'
// import PasswordComplexity from 'joi-password-complexity'
import _ from 'lodash'

// const passwordError = PasswordComplexity(undefined, 'Password').validate()

class ComposeForm extends React.Component {
	state = {
		errors: {}
	}

	validate = () => {
		const joiOptions = { abortEarly: false }
		const { error } = Joi.validate(
			this.props.formData,
			this.props.schema,
			joiOptions
		)
		const errors = {}
		if (error) error.details.map((er) => (errors[er.path[0]] = er.message))
		// if (this.state.account.password && !errors.password) {
		// 	const { error: passwordErrors } = PasswordComplexity(
		// 		undefined,
		// 		'Password'
		// 	).validate(this.state.account.password)
		// 	if (passwordErrors) {
		// 		errors['password'] = passwordErrors.details[0].message
		// 	}
		// }
		return errors
	}

	validateProperty = ({ name, value }) => {
		const obj = { [name]: value }
		const schema = { [name]: this.props.schema[name] }
		const { error } = Joi.validate(obj, schema)
		return error ? error.details[0].message : null
	}

	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors }
		const errorMessage = this.validateProperty(input)
		if (errorMessage) errors[input.name] = errorMessage
		else delete errors[input.name]

		const formData = { ...this.props.formData }
		formData[input.id] = input.value
		this.props.updateFormData(formData)
		this.setState({ errors })
	}

	handleSubmit = (e, doSubmit) => {
		e.preventDefault()
		const errors = this.validate()
		this.setState({ errors })
		if (!_.isEmpty(errors)) return
		doSubmit()
	}

	renderFormInput = (child) => {
		const possibleError = this.state.errors[child.props.name]
		const error = possibleError ? possibleError : ''
		return React.cloneElement(child, {
			onChange: this.handleChange,
			error,
			value: this.props.formData[child.props.name]
		})
	}

	render() {
		const { children, doSubmit, submitButtonLabel } = this.props
		return (
			<form onSubmit={(e) => this.handleSubmit(e, doSubmit)}>
				{React.Children.toArray(children).map((child) =>
					this.renderFormInput(child)
				)}
				<button type='submit' className='btn btn-primary'>
					{submitButtonLabel}
				</button>
			</form>
		)
	}
}

export default ComposeForm
