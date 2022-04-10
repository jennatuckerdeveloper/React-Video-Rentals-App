import _ from 'lodash'

export const sortUtil = (key, order) => (a, b) => {
	const aSelector = _.get(a, key)
	const bSelector = _.get(b, key)
	const compareStatement =
		order === 'asc' ? aSelector < bSelector : aSelector > bSelector

	return compareStatement ? -1 : 1
}
