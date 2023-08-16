import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
interface MenuProps {
    gameToggle:()=>void,
}
function Menu ({gameToggle}: MenuProps) {
// function Menu () {
    const [show, setShow] = useState(false)

    return (
        <div>
            <DropdownButton title="&#9776;" id="Menu">
                <Dropdown.Item as="span" onClick={gameToggle}>
                    Game Toggle</Dropdown.Item>
            </DropdownButton>
        </div>
    )
}

export default Menu;