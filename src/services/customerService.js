import { http } from './httpService'

const apiEndpoint = `/customers`

const getCustomerUrl = (id) => `${apiEndpoint}/${id}`

export const getCustomers = async () => {
	const { data } = await http.get(apiEndpoint)
	return data
}

export const getCustomer = async (customerId) => {
	const { data } = await http.get(getCustomerUrl(customerId))
	return data
}

export const saveCustomer = async (Customer) => {
	if (!Customer._id) {
		const { data } = await http.post(apiEndpoint, Customer)
		return data
	} else {
		const CustomerData = { ...Customer }
		delete CustomerData._id
		const { data } = await http.put(getCustomerUrl(Customer._id), CustomerData)
		return data
	}
}

export const deleteCustomer = async (CustomerId) => {
	const { data } = await http.delete(getCustomerUrl(CustomerId))
	return data
}
