import '../styles/gameArea.css'
import { GameAreaProps } from '../types';
//@ts-ignore
import { GameContext, UserContext } from '../context/Contexts.ts';
import React, {useState, useContext} from 'react';

function GameArea({isDraw, setClue, onDraw, submitGuess, changeSecondGuess, submitSecondGuess, gameToggle}: GameAreaProps) {
  const game = useContext(GameContext)
  const user = useContext(UserContext)

  const showPsychButton = ( game.playing && game.phase === 1 && game.turn === user.team && user.psych )
  const showPlayerButton = ( game.playing && game.phase === 2 && game.turn === user.team && !user.psych )
  const isSecondGuess = ( game.playing && game.phase === 3 && game.turn !== user.team )
  // const sgDisabled = ( !game.playing || (game.phase !== 3 && game.turn !== user.team) )

  const [clueInput, setClueInput] = useState<string>(game.clue)
  const inputClue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClueInput(event.target.value)
  } 

  const overUnder = (event: React.MouseEvent<HTMLButtonElement>) => { 
    const side = event.currentTarget.name
    changeSecondGuess(side)
  }

  const onSubmitClue = () => {
    setClue(clueInput)
    setClueInput('')
  } 
  
  return (<>
    <div className="gameArea">

      <div className='gameButtons'>
        <button name='l' id='under' disabled={!isSecondGuess}
          onClick={overUnder} className={game.secondGuess < 1 ? 'glow' : ''}> 
          &#10096; More Left </button>
          
        <div style={{fontSize: '.7em'}}> Second Guess </div>

        <button name='r' id='over' disabled={!isSecondGuess}
          onClick={overUnder} className={game.secondGuess > 1 ? 'glow' : ''}>
          More Right &#10097; </button>
      </div>

      <div className="clueArea">
        <div className='clue' id='clueField'>
          {showPsychButton ? 
          <input id='clueInput' type='text' onChange={inputClue}
          value={clueInput} placeholder='enter clue here'/>
        :  <div>{game.clue}</div>
        }
        </div>
      </div>

      {!game.playing ? 
        <button onClick={gameToggle} 
        disabled={user.name === game.host ? false : true}> 
          {game.playing ? 'End' : 'Start'}
        </button>
        : null
      }

      {showPsychButton && <>
        {isDraw ? <button onClick={onDraw}>Draw</button>
        : <button onClick={onSubmitClue}>Set Clue</button>}
       </>}

      {showPlayerButton && 
      <button onClick={submitGuess}>Set Guess</button>}
      {isSecondGuess && 
      <button onClick={submitSecondGuess}>Second Guess</button>}


    </div>
    </>
  )
}

export default GameArea;