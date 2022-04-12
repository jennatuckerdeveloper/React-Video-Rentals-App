import _ from 'lodash'
export const filterDataByInput = (searchString, dataKey) => (data) => {
	if (searchString) {
		return data.filter((dataType) =>
			_.get(dataType, dataKey)
				.toLowerCase()
				.startsWith(searchString.toLowerCase())
		)
	}
	return data
}
