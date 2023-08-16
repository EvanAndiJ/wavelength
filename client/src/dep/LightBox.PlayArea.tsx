import '../styles/playerArea.css'
import React, {useState, useEffect} from 'react';

interface LightBoxProps {
  team: number
}
function LightBox({team}: LightBoxProps) {
  const [green,setGreen] = useState(false)
  const [red, setRed] = useState(false)
  // useEffect(()=>{
  // })
  const lightTog = () => {
    // if (document.getElementsByClassName('turn')[0]) {
    //   document.getElementsByClassName('turn')[0].classList.toggle('turn');
    // };
    // let t1g = document.getElementById('t1g');
    // let t1r = document.getElementById('t1r');
    // let t2g = document.getElementById('t2g');
    // let t2r = document.getElementById('t2r');
    // if (game.round > 0 && game.round < 4) {
    //   t1g.classList.toggle('turn');
    // } else if (game.round == 4) {
    //   t2r.classList.toggle('turn');
    // } else if (game.round > 4 && game.round < 9) {
    //   t2g.classList.toggle('turn');
    // } else if (game.round > 8) {
    //   t1r.classList.toggle('turn');
    // }
  }
  return (<>
    <div className='lightBox' id={`t${team}lights`}>
      <div className="greenlight" id='t1g'><span className="teamName">Team {team}</span></div>
      {/* <div className="redlight" id='t1r'><span style={{fontSize:'.5em'}}>Second Chance</span></div> */}
    </div>
    </>
  )
}

export default LightBox;