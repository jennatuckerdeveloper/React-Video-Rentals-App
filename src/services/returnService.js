import { http } from './httpService'

const apiEndpoint = `/returns`

export const checkInRental = async (rental) => {
	const { data } = await http.post(apiEndpoint, rental)
	return data
}
