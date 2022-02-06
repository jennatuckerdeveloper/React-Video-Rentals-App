import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = ({ user }) => {
	const linkStyle = (active) =>
		active ? 'nav-link text-dark font-weight-bold' : 'nav-link text-dark'
	return (
		<nav className='navbar navbar-light bg-light mb-4'>
			<NavLink className='navbar-brand' to='/movies'>
				Navbar
			</NavLink>
			<ul className='nav mr-auto'>
				<li className='nav-item'>
					<NavLink
						className={({ isActive }) => linkStyle(isActive)}
						to='/movies'>
						Movies
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink
						className={({ isActive }) => linkStyle(isActive)}
						to='/customers'>
						Customers
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink
						className={({ isActive }) => linkStyle(isActive)}
						to='/rentals'>
						Rentals
					</NavLink>
				</li>
				{!user && (
					<React.Fragment>
						{' '}
						<li className='nav-item'>
							<NavLink
								className={({ isActive }) => linkStyle(isActive)}
								to='/login'>
								Login
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink
								className={({ isActive }) => linkStyle(isActive)}
								to='/register'>
								Register
							</NavLink>
						</li>
					</React.Fragment>
				)}
				{user && (
					<React.Fragment>
						{' '}
						<li className='nav-item'>
							<NavLink
								className={({ isActive }) => linkStyle(isActive)}
								to='/account'>
								Account
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink
								className={({ isActive }) => linkStyle(isActive)}
								to='/logout'>
								Logout
							</NavLink>
						</li>
					</React.Fragment>
				)}
			</ul>
		</nav>
	)
}

export default NavBar
