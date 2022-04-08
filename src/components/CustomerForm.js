import React from 'react'
import { useState, useEffect } from 'react'
import FormInput from './common/FormInput'
import FormCheck from './common/FormCheck'
import ComposeForm from './common/ComposeForm'
import Joi from 'joi-browser'
import { useParams, useNavigate } from 'react-router-dom'
import { getCustomer, saveCustomer } from '../services/customerService'

export default function CustomerForm() {
	const [formData, changeFormData] = useState({
		name: '',
		phone: '',
		isGold: false
	})

	const { customerId } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		let cancel = false
		const cancelLer = () => {
			cancel = true
		}

		async function fetchCustomer(customerId) {
			try {
				const customer = await getCustomer(customerId)
				if (cancel) return
				loadCustomer(customer)
			} catch (ex) {
				if (ex.response && ex.response.status === 404) {
					navigate('/not-found')
				}
			}
		}

		if (!customerId) return
		fetchCustomer(customerId)
		return cancelLer
	}, [customerId, navigate])

	const loadCustomer = (customer) => {
		changeFormData({
			_id: customer._id,
			name: customer.name,
			phone: customer.phone,
			isGold: customer.isGold
		})
	}

	const schema = {
		_id: Joi.string(),
		name: Joi.string().required().min(1).label('Name'),
		phone: Joi.string().required().min(7).label('Phone'),
		isGold: Joi.bool().label('Gold Member')
	}

	const doSubmit = async () => {
		try {
			await saveCustomer(formData)
			navigate('/customers')
		} catch (err) {
			return
		}
	}

	const updateFormData = (formData) => {
		changeFormData(formData)
	}

	return (
		<ComposeForm
			doSubmit={doSubmit}
			submitButtonLabel={'Save'}
			formData={formData}
			schema={schema}
			updateFormData={updateFormData}
			errors={{}}>
			<h1>Customer Form {customerId}</h1>
			<FormInput type='text' name='name' label='Name' />
			<FormInput type='text' name='phone' label='Phone' />
			<FormCheck name='isGold' label='Gold Member' />
		</ComposeForm>
	)
}
