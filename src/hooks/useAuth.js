import * as React from 'react'
import auth from '../services/authService'

let AuthContext = React.createContext(null)

export function AuthProvider({ children }) {
	let [user, setUser] = React.useState(null)

	let login = (loginData, callback) => {
		return auth.login(loginData, () => {
			setUser(loginData)
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
	let value = { user, login, signout }

	// This is where you create a Provider React component for the Context object
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Using the context created above
export function useAuth() {
	return React.useContext(AuthContext)
}
