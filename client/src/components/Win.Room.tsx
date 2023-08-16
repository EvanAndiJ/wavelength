import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal'

function Win ({show, toggleShow, team}) {

    return (
        <div>
            <Modal show={show} onHide={toggleShow}>
                <Modal.Header  closeButton>
                Winners!
                </Modal.Header>
                <Modal.Body>
                    <p>Team {team} Wins!</p>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Win;