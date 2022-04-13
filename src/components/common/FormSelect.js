const FormSelect = ({
	name,
	label,
	options,
	error,
	value,
	onChange,
	dataKey
}) => {
	return (
		<div className='form-group'>
			<label htmlFor={name}>{label}</label>
			<select
				name={name}
				id={name}
				value={value}
				onChange={onChange}
				className='form-control'>
				<option value=''></option>
				{options.map((option) => (
					<option key={option._id} value={option._id}>
						{option[dataKey]}
					</option>
				))}
			</select>
			{error && (
				<div className='alert alert-warning' role='alert'>
					{error}
				</div>
			)}
		</div>
	)
}

export default FormSelect
