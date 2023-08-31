import '../styles/gameArea.css'
import { GameAreaProps } from '../types';
//@ts-ignore
import { GameContext, UserContext } from '../context/Contexts.ts';
import React, {useState, useContext} from 'react';

function GameArea({isDraw, setClue, onDraw, submitGuess, changeSecondGuess, submitSecondGuess, gameToggle}: GameAreaProps) {
  const game = useContext(GameContext)
  const user = useContext(UserContext)

  // const showPsychButton = ( game.playing && game.phase === 1 && game.turn === user.team && user.psych )
  // const showPlayerButton = ( game.playing && game.phase === 2 && game.turn === user.team && !user.psych )
  // const isSecondGuess = ( game.playing && game.phase === 3 && game.turn !== user.team )
  const showPsychButton = ( game.playing && game.phase === 1 )
  const showPlayerButton = ( game.playing && game.phase === 2  )
  const isSecondGuess = ( game.playing && game.phase === 3 )

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

      <div className='gameButtonsDiv'>
        <button name='l' id='under' disabled={!isSecondGuess}
          onClick={overUnder} className={game.secondGuess < 1 ? 'gameButtons secondGuess glow' : 'gameButtons secondGuess'}> 
          &#10096; Left </button>
          
        {/* <div style={{fontSize: '.7em'}}> Second Guess </div> */}
        {!game.playing &&
          <button onClick={gameToggle} className="gameButtons mainButton"
          disabled={user.name === game.host ? false : true}> 
            START
          </button>
        }

        {showPsychButton && <>
          {isDraw ? 
            <button onClick={onDraw} className="gameButtons mainButton" disabled={(!user.psych || game.turn != user.team)}>
              Draw</button>
          : <button onClick={onSubmitClue} className="gameButtons mainButton"  disabled={(!user.psych || game.turn != user.team)}>
              Set Clue</button>}
        </>}

        {showPlayerButton && 
        <button onClick={submitGuess} className="gameButtons mainButton" disabled={(user.psych || game.turn != user.team)}>Set Guess</button>}
        {isSecondGuess && 
        <button onClick={submitSecondGuess} className="gameButtons mainButton" disabled={game.turn === user.team}>Second Guess</button>}
        

        <button name='r' id='over' disabled={!isSecondGuess}
          onClick={overUnder} className={game.secondGuess > 1 ? 'gameButtons secondGuess glow' : 'gameButtons secondGuess'}>
          Right &#10097; </button>
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

    </div>
    </>
  )
}

export default GameArea;