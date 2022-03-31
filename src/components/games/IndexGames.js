import React, { useState, useEffect } from 'react'
import { getAllGames } from '../../api/games'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {indexGamesSuccess, indexGamesFailure} from '../shared/AutoDismissAlert/messages'

// I'm going to declare a style object
// this will be used to corral my cards
// we can use basic CSS, but we have to use JS syntax
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const IndexGames = (props) => {
    const [games, setGames] = useState(null)
    const {user, msgAlert} = props

    useEffect(() => {
        getAllGames()
        .then(res => {
            setGames(res.data.games)
        })
        .then(() => {
            msgAlert({
                heading: 'Games have been found!',
                message: indexGamesSuccess,
                variant: 'success',
            })
        })
        .catch(() => {
            msgAlert({
                heading: 'No games found!!',
                message: indexGamesFailure,
                variant: 'danger',
            })
        })
    }, [])

    if (!games) {
        return <p>Loading ...</p>
    } else if (games.length === 0) {
        return <p>No games yet, go add some</p>
    }

    let gameCards

    if (games.length > 0 ) {
        gameCards = games.map(game => (
            <Card key={game.id} style={{ width: '30%' }} className="m-2">
                <Card.Header>{game.name}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Link to={`/games/${game.id}`}>
                        View {game.name}
                        </Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        ))
    }

    return (
        <> 
        <h3>All the Games</h3>
        <div style={cardContainerLayout}>
                {gameCards}
        </div>
        </>
    )
}

export default IndexGames