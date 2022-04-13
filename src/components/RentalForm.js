import React from 'react'
import { useState, useEffect } from 'react'
import DisplayCustomer from './DisplayCustomer'
import FormSelect from './common/FormSelect'
import ComposeForm from './common/ComposeForm'
import { useParams, useNavigate } from 'react-router-dom'
import { getCustomer } from '../services/customerService'
import { getMovies } from '../services/movieService'
import { postRental } from '../services/rentalService'
import { getCustomers } from '../services/customerService'
import Joi from 'joi-browser'

export default function RentalForm() {
	const [customer, setCustomer] = useState({})
	const [movies, setMovies] = useState([])
	const [customers, setCustomers] = useState({})
	const [formData, changeFormData] = useState({ customerId: '', movieId: '' })

	const navigate = useNavigate()
	const { customerId } = useParams()

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

		if (!customerId) {
			return fetchCustomers()
		}
		fetchCustomer(customerId)
		return cancelLer
	}, [customerId, navigate])

	useEffect(() => {
		try {
			fetchMovies()
		} catch (ex) {}
	}, [])

	const fetchMovies = async () => {
		const movies = await getMovies()
		setMovies(movies)
	}

	const fetchCustomers = async () => {
		const customers = await getCustomers()
		setCustomers(customers)
	}

	const loadCustomer = (customer) => {
		setCustomer({
			_id: customer._id,
			name: customer.name,
			phone: customer.phone,
			isGold: customer.isGold
		})
		changeFormData({ customerId: customer._id })
	}

	const schema = {
		customerId: Joi.string().required(),
		movieId: Joi.string().required()
	}

	const doSubmit = async () => {
		try {
			await postRental(formData)
			navigate('/rentals')
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
			<h1>Rental Form </h1>
			{customerId ? (
				<DisplayCustomer customer={customer} />
			) : (
				<FormSelect
					name='customerId'
					label='Customer'
					options={customers}
					dataKey={'name'}
				/>
			)}

			<FormSelect
				name='movieId'
				label='Movie'
				options={movies}
				dataKey={'title'}
			/>
		</ComposeForm>
	)
}
