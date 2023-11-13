import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { drawRanges } from '../../../server/controllers/game.controller';
interface MenuProps {
    playing: boolean,
    gameToggle:()=>void,
    howTo: ()=>void,
    reconnectUser: ()=>void,
    reconnectGame: ()=>void,
    drawRanges: ()=>void,
}
function Menu ({playing, gameToggle, howTo, reconnectGame, reconnectUser, drawRanges}: MenuProps) {
// function Menu () {
    const [show, setShow] = useState(false)

    return (
        <div>
            <DropdownButton title="&#9776;" id="Menu">

                <Dropdown.Item as="span" onClick={gameToggle}>
                    {playing ? 'End Game' : 'Start Game'}</Dropdown.Item>

                <Dropdown.Item as="span" onClick={howTo}>
                    How To Play</Dropdown.Item>

                    
            </DropdownButton>
        </div>
    )
}

export default Menu;