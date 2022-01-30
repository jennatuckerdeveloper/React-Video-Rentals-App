import React from 'react'
import './App.css'
import NavBar from './components/common/NavBar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Movies from './components/Movies'
import Customers from './components/Customers'
import Rentals from './components/Rentals'
import NotFound from './components/NotFound'
import MovieForm from './components/MovieForm'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
const App = () => {
	const navigate = useNavigate()
	return (
		<main className='container-fluid p-0'>
			<NavBar />
			<ToastContainer />
			<div className='container'>
				<Routes>
					<Route path='register' element={<RegisterForm />} />
					<Route path='login' element={<LoginForm />} />
					<Route path='movies' element={<Movies navigate={navigate} />} />
					<Route path='movies/new' element={<MovieForm />} />
					<Route path='movies/:id' element={<MovieForm />} />
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
