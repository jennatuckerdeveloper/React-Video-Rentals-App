import React from 'react'
import { useState, useEffect } from 'react'
import FormInput from './common/FormInput'
import FormSelect from './common/FormSelect'
import ComposeForm from './common/ComposeForm'
import Joi from 'joi-browser'
import { useParams, useNavigate } from 'react-router-dom'
import { getGenres } from '../services/genreService'
import { getMovie, saveMovie } from '../services/movieService'

export default function MovieForm() {
	const [formData, changeFormData] = useState({
		title: '',
		genreId: '',
		numberInStock: '',
		dailyRentalRate: ''
	})

	const [genres, setGenres] = useState([])

	const { movieId } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		let cancel = false
		const cancelLer = () => {
			cancel = true
		}

		async function fetchMovie(movieId) {
			try {
				const movie = await getMovie(movieId)
				if (cancel) return
				loadMovie(movie)
			} catch (ex) {
				if (ex.response && ex.response.status === 404) {
					navigate('/not-found')
				}
			}
		}

		async function fetchGenres() {
			// You can await here
			const genres = await getGenres()
			if (cancel) return
			return setGenres(genres)
		}
		fetchGenres()
		if (!movieId) return
		fetchMovie(movieId)
		return cancelLer
	}, [movieId, navigate])

	const loadMovie = (movie) => {
		changeFormData({
			_id: movie._id,
			title: movie.title,
			genreId: movie.genre._id,
			numberInStock: movie.numberInStock,
			dailyRentalRate: movie.dailyRentalRate
		})
	}

	const schema = {
		_id: Joi.string(),
		title: Joi.string().required().min(5).label('Title'),
		genreId: Joi.string().required().min(3).label('Genre'),
		numberInStock: Joi.number()
			.integer()
			.min(0)
			.max(100)
			.required()
			.label('Number in stock '),
		dailyRentalRate: Joi.number()
			.required()
			.min(0)
			.max(10)
			.label('Daily Rental Rate')
	}

	const doSubmit = async () => {
		try {
			await saveMovie(formData)
			navigate('/movies')
		} catch (err) {
			return
		}
	}

	const updateFormData = (formData) => {
		changeFormData(formData)
	}

	return (
		<ComposeForm
			doSubmit={doSubmit}
			submitButtonLabel={'Save'}
			formData={formData}
			schema={schema}
			updateFormData={updateFormData}
			errors={{}}>
			<h1>Movie Form {movieId}</h1>
			<FormInput type='text' name='title' label='Title' />
			<FormSelect
				name='genreId'
				label='Genre'
				options={genres}
				dataKey={'name'}
			/>
			<FormInput type='text' name='numberInStock' label='In Stock' />
			<FormInput type='text' name='dailyRentalRate' label='Daily Rate' />
		</ComposeForm>
	)
}
