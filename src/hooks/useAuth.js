import { useState, createContext, useContext } from 'react'
import auth from '../services/authService'

let AuthContext = createContext(null)

export function AuthProvider({ children }) {
	let [user, setUser] = useState(auth.getCurrentUser())

	let login = (loginData, callback) => {
		return auth.login(loginData, () => {
			setUser(auth.getCurrentUser())
			callback()
		})
	}

	let register = (jwt, callback) => {
		return auth.loginWithJwt(jwt, () => {
			setUser(auth.getCurrentUser())
			callback()
		})
	}

	let signout = (callback) => {
		return auth.signout(() => {
			setUser(null)
			callback()
		})
	}

	// Why would you call these value and not make those each props?
	let value = { user, login, signout, register }

	// This is where you create a Provider React component for the Context object
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Using the context created above
export function useAuth() {
	return useContext(AuthContext)
}
