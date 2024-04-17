import '../styles/playerArea.css'
import { PlayerAreaProps, TeamBoxProps} from "../types";
import React, { useContext } from 'react';

import { GameContext, UserContext } from '../context/Contexts.ts';


function PlayerArea({context, game, user, onJoin}: PlayerAreaProps) {

  return (<>

    <div className='playArea'>
      {/* <button onClick={()=>console.log(teamsProp)}>prop</button> */}

      <TeamBox game={game} user={user} team={1} onJoin={onJoin}/>
      <TeamBox game={game} user={user} team={2} onJoin={onJoin}/>

    </div>
    
  </>)
}

function TeamBox ({context, game, user, team, onJoin}: TeamBoxProps) {

  const gameContext = useContext(GameContext)
  const userContext = useContext(UserContext)
  const score = gameContext.score[team-1]

  const playing = gameContext.playing

  const psych = gameContext.psych[team-1]

  const users = gameContext.teams[team]

  const lightClass = (playing && gameContext.turn === team) ? 
    'greenlight turn' : 'greenlight' 

  return (
      <div className="teamBox" id={`t${team}b`}>
          <div className='lightBox'>
              <span className={lightClass} id={`t${team}g`}>
                  Team {team}
              </span>
          </div>

          <div  id={`t${team}Score`} >

              <div className='score' >{score}</div> 
              
          </div>

      </div>
  )
}

export default PlayerArea;