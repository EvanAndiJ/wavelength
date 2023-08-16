import '../styles/playerArea.css'
import { TeamBoxProps } from '../types';
import React from 'react';
import { useOutletContext } from 'react-router-dom';

function TeamBox ({context, team, onJoin}: TeamBoxProps) {


    const score = context.game.score[team]
    const playing = context.game.started
    const psych = context.game.psych[team]
    const users = context.teams[team]
    const user = context.user
    const game = context.game

    return (
        <div className="teamBox" id={`t${team}b`}>
            <div className='lightBox'>
                <span className="greenlight" id='t1g'>
                    Team {team}
                </span>
            </div>
            <div  id={`t${team}Score`} >

                <div className='score' >{score}</div>
                {playing ? (<div style={{ display:'flex', flexDirection:'column', width:'45%' }}>
                    <div className='joinSpacer'></div>
                    </div>)
                 : (<div style={{ display:'flex', flexDirection:'column', width:'45%' }}>

                    <button onClick={()=>onJoin(team,0)} disabled={user.team === team ? true : false}
                        className='joinButton'>join team</button>

                    <button onClick={()=>onJoin(team,1)} disabled={psych ? true : false} 
                        className='joinButton'>join psych</button>

                    </div>)
                }
                
            </div>

            <div className='teamList'>
                <div>Psychic: {game.psych[team]} 
                    { (!playing && user.psych && user.team === team) ? 
                        <button onClick={()=>onJoin(team,0)}>x</button> 
                        
                    : null }
                </div>
                {users.map(user => user != psych ? <div key={user}>{user}</div> : null)}
            </div>

        </div>
    )
}

export default TeamBox;