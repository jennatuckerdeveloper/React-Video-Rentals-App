const DeleteButton = ({ onClick }) => {
	return (
		<button type='button' className='btn btn-danger btn-sm' onClick={onClick}>
			Delete
		</button>
	)
}

export default DeleteButton
