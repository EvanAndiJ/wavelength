import '../styles/playerArea.css'
import React, {useState, useEffect} from 'react';

interface LightBoxProps {
  team: number
}
function LightBox({team}: LightBoxProps) {
  const [green,setGreen] = useState(false)
  const [red, setRed] = useState(false)
  
  return (<>
    <div className='lightBox' id={`t${team}lights`}>
      <div className="greenlight" id='t1g'><span className="teamName">Team {team}</span></div>
    </div>
    </>
  )
}

export default LightBox;