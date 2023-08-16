import { useState } from 'react'
// import useToken from './useToken'
// import type { User } from '../types'

const useUser = () => {

    const getUser = () => {
        // const userString: string | null = localStorage.getItem('asleepiesUser')
        const userString = localStorage.getItem('wavelengthUser')
        if (typeof userString === 'string') {
            return JSON.parse(userString)       
        } else {
            return null
        }
    }

    const [user, setUser] = useState(getUser())
    // const {setToken} = useToken()
    
    // const saveUser = (userInfo: User) => {
    const saveUser = (userInfo) => {
        localStorage.setItem('wavelengthUser', JSON.stringify(userInfo))
        setUser(userInfo)
    }

    const signOut = () => {
        localStorage.removeItem('wavelengthUser')
        setUser(null)
        // localStorage.removeItem('token')
        // setToken(null)
    }

    return {
        user,
        setUser: saveUser,
        // signOutUser: signOut
    }
}

export default useUser;