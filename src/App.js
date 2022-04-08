import React from 'react'
import NavBar from './components/common/NavBar'
import Movies from './components/Movies'
import Customers from './components/Customers'
import Rentals from './components/Rentals'
import NotFound from './components/NotFound'
import MovieForm from './components/MovieForm'
import CustomerForm from './components/CustomerForm'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Logout from './components/Logout'
import RequireAuth from './components/RequireAuth'
import { AuthProvider } from './hooks/useAuth'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'

const App = () => {
	const navigate = useNavigate()

	return (
		<main className='container-fluid p-0'>
			<AuthProvider>
				<NavBar />
				<ToastContainer />
				<div className='container'>
					<Routes>
						<Route path='register' element={<RegisterForm />} />
						<Route path='login' element={<LoginForm />} />
						<Route path='logout' element={<Logout />} />
						<Route path='movies' element={<Movies navigate={navigate} />} />
						<Route
							path='movies/new'
							element={
								<RequireAuth>
									<MovieForm />
								</RequireAuth>
							}
						/>
						<Route path='movies/:movieId' element={<MovieForm />} />
						<Route
							path='customers'
							element={<Customers navigate={navigate} />}
						/>
						<Route
							path='customers/new'
							element={
								<RequireAuth>
									<CustomerForm />
								</RequireAuth>
							}
						/>
						<Route path='customers/:customerId' element={<CustomerForm />} />
						<Route path='rentals' element={<Rentals />} />
						<Route path='/' element={<Navigate to='/movies' />} />
						<Route path='not-found' element={<NotFound />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</div>
			</AuthProvider>
		</main>
	)
}

export default App
