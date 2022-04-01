import React, { useState } from 'react'
import { createGame } from '../../api/games'
import {createGameSuccess, createGameFailure} from '../shared/AutoDismissAlert/messages'
import { useNavigate } from 'react-router-dom'
import GameForm from '../shared/GameForm'

////////////////////////////////////////////////////////////////
// Create game renders a form and calls the createGame function
// When complete it navigates to the game show page.
// props necessary are user and msgAlert
const CreateGame = (props) => {
    const {user, msgAlert} = props
    console.log('user in create', user)
    const navigate = useNavigate()

    // we'll need two states
    const [game, setGame] = useState({name: '', company: '', description: '', 
        players: '', price: '', educational: false, puzzle: false, family: false})

    console.log('In create game', game)

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

        createGame(user, game)
            // if create is successful, we should navigate to the show page
            .then(res => {navigate(`/games/${res.data.game._id}`)})
            // then we send a success message
            .then(() =>
                msgAlert({
                    heading: 'Game Added! Success!',
                    message: createGameSuccess,
                    variant: 'success',
                }))
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Failed to create a game!',
                    message: createGameFailure,
                    variant: 'danger',
                }))
        // console.log('this is the game', game)
    }

    return (
        <GameForm 
            game={game}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading="Add new game!"
        />
    )
}

export default CreateGame