import { useState } from 'react'

const useTeams = () => {

    const getTeams = () => {
        const teamsString = localStorage.getItem('wavelengthTeams')
        if (teamsString && teamsString != 'undefined') {
            return JSON.parse(teamsString)       
        } else {
            return null
        }
    }

    const [teams, setTeams] = useState(getTeams())
    
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