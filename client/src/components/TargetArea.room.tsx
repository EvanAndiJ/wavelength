import '../styles/targetArea.css'
import { TargetAreaProps } from '../types';

import React, { useState, useEffect, useContext } from 'react';

//@ts-ignore
import { GameContext } from '../context/Contexts.ts';


function TargetArea({guessLock, updateGuess, screen, toggleScreen}: TargetAreaProps) {

    const game = useContext(GameContext)
    const round = game.round
    const target = game.target
    const range = game.range[0]
    const guess = game.guess
    const [slider, setSlider] = useState(game.guess)
    const screenStyle = screen ? {width:'102%'} : {width:'0%'}

    const [screenWidth, setScreenWidth] = useState({width:'0%'})
    const [guessLine, setGuessLine] = useState({left:'50%'})
    const [hide, setHide] = useState<boolean>(true)

    
    useEffect(()=>{
        setSlider(game.guess)
    }, [guess])

    function onSliderChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSlider(Number(event.target.value))
    }
    function onMouseUp(event: React.MouseEvent<HTMLInputElement>) {
        updateGuess(event.currentTarget.value)
    }
    return (<>
        <div className='targetArea'>
            
            <div className='targetWindow'>
                <div className='target' style={{left: `${target - 12}%`}} id='target'>
                    <div className="targetBlock pt2">2</div>
                    <div className="targetBlock pt3">3</div>
                    <div className="targetBlock pt4">4</div>
                    <div className="targetBlock pt3">3</div>
                    <div className="targetBlock pt2">2</div>
                
                </div>

                <div id='screen' className='screen' style={screen ? {width:'102%'} : {width:'0%'}}></div>

            </div>

            <input type="range" id='targetSlider' disabled={guessLock}
            onMouseUp={onMouseUp}
            onChange={onSliderChange}
            name='targetSlider' min='1' max='99' value={slider}/> 
                
        </div>

        <div className='rangeArea'>
            <div className='rLeft' id='rLeft'>{range ? range[0] : ''}</div>
            <div className='rRight' id='rRight'>{range ? range[1] : ''}</div>
        </div>
        </>
    )
}

export default TargetArea;

