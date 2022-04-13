import { http } from './httpService'

const apiEndpoint = `/rentals`

export const getRentals = async () => {
	const { data } = await http.get(apiEndpoint)
	return data
}

export const postRental = async (rental) => {
	const { data } = await http.post(apiEndpoint, rental)
	return data
}
