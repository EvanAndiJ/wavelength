import { useState } from 'react'

const defaultTeams = [[],[],[]]

const useTeams = () => {

    var getTeams = () => {
        const teamsString = localStorage.getItem('wavelengthTeams')
        if (teamsString && teamsString != 'undefined') {
            return JSON.parse(teamsString)       
        } else {
            // return null
            localStorage.setItem('wavelengthTeams', JSON.stringify(defaultTeams))
            return defaultTeams
        }
    }

    const [teams, setTeams] = useState(getTeams())
    
    var saveTeams = (teams) => {
        localStorage.setItem('wavelengthTeams', JSON.stringify(teams))
        setTeams(teams)
    }

    var clearTeams = () => {
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