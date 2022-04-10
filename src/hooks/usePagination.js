import { useState, useEffect } from 'react'

export const usePagination = ({ apiCall, onNewData, onError }) => {
	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)

	useEffect(() => {
		let cancel = false
		const cancelLer = () => {
			cancel = true
		}
		const fetchData = async () => {
			setIsError(false)
			setIsLoading(true)

			try {
				const data = await apiCall()
				setData(data)
				if (cancel) return
				onNewData(data)
			} catch (error) {
				setIsError(true)
				onError(error)
			}

			setIsLoading(false)
		}

		fetchData()
		return cancelLer
	}, [apiCall, onNewData, onError])

	return { data, isLoading, isError }
}
