import React, {useState, useEffect} from 'react'
import { getOneGame, updateGame, removeGame } from '../../api/games'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner, Container, Card, Button } from 'react-bootstrap'
import {showGameSuccess, showGameFailure} from '../shared/AutoDismissAlert/messages'
// import EditPetModal from './EditPetModal'
// import ShowToy from '../toys/ShowToy'

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

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
                    heading: 'Here is the game!',
                    message: showGameSuccess,
                    variant: 'success',
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'No game found',
                    message: showGameFailure,
                    variant: 'danger',
                })
            })
    }, [updated])

    const removeTheGame = () => {
        removeGame(user, game.id)
            .then(() => {
                msgAlert({
                    heading: 'game has been removed!',
                    message: 'game is gone',
                    variant: 'success',
                })
            })
            .then(() => {navigate(`/`)})
            .catch(() => {
                msgAlert({
                    heading: 'game deletion failed.',
                    message: 'failed to delete game',
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
                        <Button onClick={() => removeTheGame()}className="m-2" variant="danger">
                            Delete Game
                        </Button>

                    </Card.Footer>
                </Card>
            </Container>
        </>
    )
}

export default ShowGame