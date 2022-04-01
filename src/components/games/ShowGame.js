import React, {useState, useEffect} from 'react'
import { getOneGame, updateGame, removeGame } from '../../api/games'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner, Container, Card, Button } from 'react-bootstrap'
import {showGameSuccess, showGameFailure} from '../shared/AutoDismissAlert/messages'
import EditGameModal from './EditGameModal'


const ShowGame = (props) => {

    const [game, setGame] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const {user, msgAlert} = props
    const { id } = useParams()
    const navigate = useNavigate()

    console.log('id in showGame', id)

    // empty dependency array in useEffect to act like component did mount
    useEffect(() => {
        getOneGame(id)
            .then(res => setGame(res.data.game))
            .then(() => {
                msgAlert({
                    heading: 'Game has been retrieved!',
                    message: showGameSuccess,
                    variant: 'success',
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'Failed to find the game',
                    message: showGameFailure,
                    variant: 'danger',
                })
            })
    }, [updated])

    const removeTheGame = () => {
        console.log("removeTheGame id", game.id)
        console.log("removeTheGame _id", game._id)
        removeGame(user, game._id)
            .then(() => {
                msgAlert({
                    heading: 'The game has been removed!',
                    message: 'The game has been deleted',
                    variant: 'success',
                })
            })
            .then(() => {navigate(`/`)})
            .catch(() => {
                msgAlert({
                    heading: 'Game deletion failed.',
                    message: 'Gailed to delete game',
                    variant: 'danger',
                })
            })
    }

    if (!game) {
        return (
            <Container fluid className="justify-content-center">
                <Spinner animation="border" role="status" variant="warning" >
                    <span className="visually-hidden">Loading....</span>
                </Spinner>
            </Container>
        )
    }

    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{game.name}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small>Desscription: {game.description}</small><br/>
                            <small>Company: {game.company}</small><br/>
                            <small>Players: {game.players}</small><br/>
                            <small>Price: $ {game.price}</small><br/>
                            <small>
                                Educational: {game.educational ? 'yes' : 'no'}
                            </small><br/>
                            <small>
                                Puzzle: {game.puzzle ? 'yes' : 'no'}
                            </small><br/>
                            <small>
                                Family: {game.family ? 'yes' : 'no'}
                            </small><br/>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                         <Button onClick={() => setModalOpen(true)} className="m-2" variant="warning">
                            Edit Game
                        </Button>
                        <Button onClick={() => removeTheGame()} className="m-2" variant="danger">
                            Delete Game
                        </Button>
                    </Card.Footer>
                </Card>
            </Container>
            <EditGameModal 
                game={game}
                show={modalOpen}
                user={user}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                updateGame={updateGame}
                handleClose={() => setModalOpen(false)}
            />
        </>
    )
}

export default ShowGame