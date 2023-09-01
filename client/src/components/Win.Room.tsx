import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal'

function Win ({show, toggleShow, team}) {

    return (
        <div>
            <Modal show={show} onHide={toggleShow}>
                <Modal.Header closeButton closeVariant="white">
                Winners!
                </Modal.Header>
                <Modal.Body>
                    <h1 style={{margin: "auto"}}>Team {team} Wins!</h1>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Win;