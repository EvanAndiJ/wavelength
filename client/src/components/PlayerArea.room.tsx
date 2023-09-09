import '../styles/playerArea.css'
import { PlayerAreaProps, TeamBoxProps} from "../types";
import React, { useContext } from 'react';

import { useOutletContext } from 'react-router-dom';

//@ts-ignore
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
  // const score = game.score[team-1]

  const playing = gameContext.playing
  // const playing = game.playing

  const psych = gameContext.psych[team-1]
  // const psych = game.psych[team-1]

  const users = gameContext.teams[team]
  // const users = game.teams[team]

  // const user = context.user
  // const game = context.game

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
              {playing ? 
                (<div style={{ display:'flex', flexDirection:'column'}}>
                <div className='joinButton '></div>
                </div>)

               : (<div style={{ display:'flex', flexDirection:'column' }}>

                  <button onClick={()=>onJoin(team,0)} disabled={userContext.team === team ? true : false}
                      className={`join${team} joinButton gameButtons`}>join team</button>

                  <button onClick={()=>onJoin(team,1)} disabled={psych ? true : false} 
                      className={`join${team} joinButton gameButtons`}>join psych</button>

               </div>)
              }
              
          </div>
          <div className='teamList'>
              <div>Psychic: {gameContext.psych[team-1]} 
                  { (!playing && userContext.psych && userContext.team === team) &&
                    <button onClick={()=>onJoin(team,0)} className='cancelPsych'>x</button> }
              </div>
              {users.map(user => user != psych ? <div key={user}>{user}</div> : null)}
          </div>

      </div>
  )
}

export default PlayerArea;