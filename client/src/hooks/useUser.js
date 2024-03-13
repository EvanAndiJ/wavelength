import { useState } from 'react'

const defaultUser = {
    name: 'name',
    room: 'code',
    team: 0,
    psych: false,
    screen: false,
    ably: null,
}

const useUser = () => {

    var getUser = () => {
        const userString = localStorage.getItem('wavelengthUser')
        if (typeof userString === 'string') {
            return JSON.parse(userString)       
        } else {
            // return null
            localStorage.setItem('wavelengthUser', JSON.stringify(defaultUser))
            return defaultUser;
        }
    }

    const [user, setUser] = useState(getUser())
    
    var saveUser = (userInfo) => {
        localStorage.setItem('wavelengthUser', JSON.stringify(userInfo))
        setUser(userInfo)
    }

    var clearUser = () => {
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