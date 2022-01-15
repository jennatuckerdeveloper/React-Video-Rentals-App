import TableHeader from './TableHeader'
import TableBody from './TableBody'

const Table = ({ columns, data, selectedSort, onSort }) => {
	return (
		<table className='table'>
			<TableHeader
				columns={columns}
				onSort={onSort}
				selectedSort={selectedSort}
			/>
			<TableBody columns={columns} data={data} />
		</table>
	)
}

export default Table
