import { useState } from 'react'
// import useToken from './useToken'
// import type { User } from '../types'

const useTeams = () => {

    const getTeams = () => {
        // const userString: string | null = localStorage.getItem('asleepiesUser')
        const teamsString = localStorage.getItem('wavelengthTeams')
        if (teamsString && teamsString != 'undefined') {
            return JSON.parse(teamsString)       
        } else {
            return null
        }
    }

    const [teams, setTeams] = useState(getTeams())
    
    // const saveUser = (userInfo: User) => {
    const saveTeams = (teams) => {
        localStorage.setItem('wavelengthTeams', JSON.stringify(teams))
        setTeams(teams)
    }

    const clearTeams = () => {
        localStorage.removeItem('wavelengthTeams')
        setTeams(null)
    }

    return {
        teams,
        setTeams: saveTeams,
        clearTeams,
    }
}

export default useTeams;