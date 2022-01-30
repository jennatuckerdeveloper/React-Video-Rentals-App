const FormInput = ({
	type,
	name,
	value,
	label,
	onChange,
	error,
	placeholder
}) => {
	return (
		<div className='form-group'>
			<label htmlFor={name}>{label}</label>
			<input
				type={type}
				id={name}
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				className='form-control'
				aria-describedby={name}
			/>
			{error && (
				<div className='alert alert-warning' role='alert'>
					{error}
				</div>
			)}
		</div>
	)
}

export default FormInput
