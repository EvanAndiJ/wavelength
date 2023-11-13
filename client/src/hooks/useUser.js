import { useState } from 'react'

const useUser = () => {

    const getUser = () => {
        const userString = localStorage.getItem('wavelengthUser')
        if (typeof userString === 'string') {
            return JSON.parse(userString)       
        } else {
            return null
        }
    }

    const [user, setUser] = useState(getUser())
    const saveUser = (userInfo) => {
        localStorage.setItem('wavelengthUser', JSON.stringify(userInfo))
        setUser(userInfo)
    }

    const clearUser = () => {
        localStorage.removeItem('wavelengthUser')
        setUser(null)
    }

    return {
        user,
        setUser: saveUser,
        clearUser,
    }
}

export default useUser;