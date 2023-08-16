import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal'

function DrawRanges({ranges, choose, hide}) {
    function chooseRange(event: React.MouseEvent<HTMLButtonElement>) {
        const range = ranges[event.currentTarget.name]
        choose(range)
    }

    return (
        <Modal show={ranges.length ? true : false} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>Choose 1</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {ranges.map((range, i) => 
                    range ? <button key={range[1]} name={i} onClick={chooseRange}> {range[0][0]} | {range[0][1]}</button>
                    : <div style={{backgroundColor:"red"}}>fuck</div>
                )}
            </Modal.Body>
        </Modal>
    )
}

export default DrawRanges;