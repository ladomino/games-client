import React, { useState } from 'react'
import {Modal} from 'react-bootstrap'
import GameForm from '../shared/GameForm'

const EditGameModal = (props) => {
    const { user, show, handleClose, updateGame, msgAlert, triggerRefresh } = props
    const [game, setGame] = useState(props.game)

    const handleChange = (e) => {
        // e === event
        e.persist()

        setGame(prevGame => {
            const name = e.target.name
            let value = e.target.value

            console.log('etarget type', e.target.type)
            console.log('this is e.target checked', e.target.checked)

            if(name === "educational" && e.target.checked){
                value = true
            } else if (name === "educational" && !e.target.checked){
                value = false
            }

            if(name === "puzzle" && e.target.checked){
                value = true
            } else if (name === "puzzle" && !e.target.checked){
                value = false
            }

            if(name === "family" && e.target.checked){
                value = true
            } else if (name === "family" && !e.target.checked){
                value = false
            } 

            if (e.target.type === 'number') {
                value = parseFloat(e.target.value)
            }

            const updatedValue = { [name]: value }

            console.log('prevGame', prevGame)
            console.log('updatedValue', updatedValue)

            return {...prevGame, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()

        console.log('the game to submit', game)
        updateGame(user, game)
            // if create is successful, we should navigate to the show page
            .then(() => handleClose())
            // then we send a success message
            .then(() =>
                msgAlert({
                    heading: 'Game updated!',
                    message: 'The game has been updated',
                    variant: 'success',
                }))
            .then(() => triggerRefresh())
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Game update has failed!',
                    message: 'The game has not been updated',
                    variant: 'danger',
                }))
        console.log('this is the game', game)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <GameForm 
                    game={game}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Edit the game!"
                />
            </Modal.Body>
        </Modal>
    )
}
    
export default EditGameModal