import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal'

function HowTo ({show, toggleShow}) {

    return (
        <div>
            <Modal show={show} onHide={toggleShow}>
                <Modal.Header  closeButton>
                How To Play
                </Modal.Header>
                <Modal.Body>
                    <h4>The Psychic:</h4>
                    <p>Each team picks a psychic, or a random one is chosen at the start of the game.</p>
                    <p>The psychic will draw a range, and get a randomized target, <br/>
                        while the target window screen will close for everyone else.</p>
                    <hr/>
                    
                    <h4>The Rnage:</h4>
                    <p>The range is like a spectrum</p>
                    <p>img</p>
                    <p>The left side is cold. The Right side is Hot</p>
                    <hr/>

                    <h4>The Target and The Clue:</h4>
                    <p>The main objective is guess the location of the target in the target window.</p>
                    <p>This is done by giving a one or two word clue relating to the range</p>
                    <p>img</p>
                    <p>The target is only slightly on the "hot" side, how could we describe that?</p>
                    <p>"Luke Warm" img </p>
                    <hr/>

                    <h4>The Guess:</h4>
                    <p>After the psychic gives the clue, the rest of their team will discuss where they think the target is, <br/>
                        and move the slider to that location.</p>
                    <p>Click "Submit Guess" when a concensus is made.</p>
                    <p>Points are awarded based on the closeness of your guess.</p>
                    <hr/>

                    <h3>The Second Guess:</h3>
                    <p>After the psychic's team makes their guess, <br/>
                        the other team guesses whether the target is actually to the left or right of the slider.</p>
                    <hr/>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default HowTo;