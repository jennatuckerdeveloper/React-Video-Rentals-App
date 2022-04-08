import React from 'react'

const FormCheck = ({ name, label, value, error, onChange }) => {
	return (
		<React.Fragment>
			<div className='form-check mt-4 mb-4'>
				<input
					className='form-check-input'
					type='checkbox'
					name={name}
					id={name}
					value={value}
					onChange={onChange}
					checked={value}
				/>
				<label className='form-check-label' htmlFor='flexCheckChecked'>
					{label}
				</label>
			</div>
			{error && (
				<div className='alert alert-warning' role='alert'>
					{error}
				</div>
			)}
		</React.Fragment>
	)
}

export default FormCheck
