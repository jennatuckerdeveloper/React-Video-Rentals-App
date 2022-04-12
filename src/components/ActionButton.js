const ActionButton = ({ label, onClick }) => {
	return (
		<button type='button' className='btn btn-primary btn-sm' onClick={onClick}>
			{label}
		</button>
	)
}

export default ActionButton
