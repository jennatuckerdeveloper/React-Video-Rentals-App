import React, { useState, useEffect } from 'react'
import Joi from 'joi-browser'
// import PasswordComplexity from 'joi-password-complexity'
import _ from 'lodash'

// const passwordError = PasswordComplexity(undefined, 'Password').validate()

const ComposeForm = ({
	formData,
	schema,
	updateFormData,
	errors: initialErrors,
	children,
	doSubmit,
	submitButtonLabel
}) => {
	const [errors, setErrors] = useState(initialErrors)

	useEffect(() => {
		setErrors(initialErrors)
	}, [initialErrors])

	const validate = () => {
		const joiOptions = { abortEarly: false }
		const { error } = Joi.validate(formData, schema, joiOptions)
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

	const validateProperty = ({ name, value }) => {
		const obj = { [name]: value }
		const propertySchema = { [name]: schema[name] }
		const { error } = Joi.validate(obj, propertySchema)
		return error ? error.details[0].message : null
	}

	const handleChange = ({ currentTarget: input }) => {
		const newErrors = { ...errors }
		const errorMessage = validateProperty(input)
		if (errorMessage) newErrors[input.name] = errorMessage
		else delete newErrors[input.name]

		const newFormData = { ...formData }
		if (input.type === 'checkbox') {
			newFormData[input.id] = input.checked
		} else {
			newFormData[input.id] = input.value
		}
		updateFormData(newFormData)
		setErrors(newErrors)
	}

	const handleSubmit = (e, doSubmit) => {
		e.preventDefault()
		const errors = validate()
		setErrors(errors)
		if (!_.isEmpty(errors)) return
		doSubmit()
	}

	const renderFormInput = (child) => {
		const possibleError = errors[child.props.name]
		const error = possibleError ? possibleError : ''
		return React.cloneElement(child, {
			onChange: handleChange,
			error,
			value: formData[child.props.name]
		})
	}

	return (
		<form onSubmit={(e) => handleSubmit(e, doSubmit)}>
			{React.Children.toArray(children).map((child) => renderFormInput(child))}
			<button type='submit' className='btn btn-primary'>
				{submitButtonLabel}
			</button>
		</form>
	)
}

export default ComposeForm
