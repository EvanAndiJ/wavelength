import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal'

function HowTo ({show, toggleShow}) {

    return (
        <div>
            <Modal show={show} onHide={toggleShow}>
                <Modal.Header  closeButton closeVariant="white">
                How To Play
                </Modal.Header>
                <Modal.Body>
                    <h4>The Goal:</h4>
                        <p>Move the Arrow on the slider as close to the center of the target area as possible.</p>
                    <hr/>
                    <h4>How to Play:</h4>
                    
                    <p>Each team picks a psychic, or a random one is chosen at the start of the game.</p>
                    <p>Each round the psychic will be the only one able to see the location of the target.</p>
                    <p>The psychic will choose a range of opposing concepts, such as "Hot / Cold", and give a clue about the location of the target on the spectrum of those opposing concepts.</p>
                    <p>The rest of their team tries to guess where that is by using the slider.</p>
                    <p>After the team submit's their guess, the opposing team has a chance to earn 1 point by guessing if the target is to the left or right of the current guess </p>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default HowTo;