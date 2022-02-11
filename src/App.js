import React, { useState } from 'react'
import NavBar from './components/common/NavBar'
import Movies from './components/MoviesFunc'
import Customers from './components/Customers'
import Rentals from './components/Rentals'
import NotFound from './components/NotFound'
import MovieForm from './components/MovieForm'
import LoginForm from './components/FuncLoginForm'
import RegisterForm from './components/FuncRegisterForm'
import Logout from './components/Logout'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import auth from './services/authService'
import './App.css'

const App = () => {
	const [user] = useState(auth.getCurrentUser())

	const navigate = useNavigate()

	return (
		<main className='container-fluid p-0'>
			<NavBar user={user} />
			<ToastContainer />
			<div className='container'>
				<Routes>
					<Route path='register' element={<RegisterForm />} />
					<Route path='login' element={<LoginForm />} />
					<Route path='logout' element={<Logout />} />
					<Route
						path='movies'
						element={<Movies user={user} navigate={navigate} />}
					/>
					<Route path='movies/new' element={<MovieForm />} />
					<Route path='movies/:movieId' element={<MovieForm />} />
					<Route path='customers' element={<Customers />} />
					<Route path='rentals' element={<Rentals />} />
					<Route path='/' element={<Navigate to='/movies' />} />
					<Route path='not-found' element={<NotFound />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</div>
		</main>
	)
}

export default App
