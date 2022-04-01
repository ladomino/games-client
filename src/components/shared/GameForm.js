import React from 'react'
import { Form , Container, Button } from 'react-bootstrap'

const GameForm = (props) => {
    const { game, handleSubmit, handleChange, heading } = props

    return (
        <Container className="justify-content-center">
        <h3>{heading}</h3>
        <Form onSubmit={handleSubmit}>
        <Form.Label>Name</Form.Label>
        <Form.Control 
            placeholder="what is your game's name?"
            value={game.name}
            name='name'
            onChange={handleChange}
        />
        <Form.Label>Description</Form.Label>
        <Form.Control 
            placeholder="what is the description of your game?"
            value={game.description}
            name='description'
            onChange={handleChange}
        />
        <Form.Label>Company</Form.Label>
        <Form.Control 
            placeholder="Name of the game company?"
            value={game.company}
            name='company'
            onChange={handleChange}
        />
        <Form.Label>Players</Form.Label>
        <Form.Control 
            placeholder="How many players are required?"
            value={game.players}
            type="number"
            name='players'
            onChange={handleChange}
        />
        <Form.Label>Price</Form.Label>
        <Form.Control 
            placeholder="what is the suggested online price?"
            value={game.price}
            type="number"
            name='price'
            onChange={handleChange}
        />
        <Form.Check 
            label='is this game educational?'
            name='educational'
            defaultChecked={game.educational}
            onChange={handleChange}
        />
        <Form.Check 
            label='is this game a puzzle?'
            name='puzzle'
            defaultChecked={game.puzzle}
            onChange={handleChange}
        />
        <Form.Check 
            label='is this a family game?'
            name='family'
            defaultChecked={game.family}
            onChange={handleChange}
        />
        <Button type='submit'>Submit</Button>
        </Form>
        </Container>
    )
}

export default GameForm