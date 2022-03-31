import React, { useState, useEffect } from 'react'

import { getAllGames } from '../../api/games'

const IndexGames = (props) => {
    const [games, setGames] = useState(null)

    useEffect(() => {
        getAllGames()
        .then(res => {
            setGames(res.data.games)
        })
        .catch(console.error)
    }, [])

    if (!games) {
        return <p>Loading ...</p>
    } else if (games.length === 0) {
        return <p>no games yet, go add some</p>
    }

    let gamesJsx

    if (games.length > 0 ) {
        gamesJsx = games.map(game => (
            <li key={game.id}> 
            {game.name} 
            </li>
        ))
    }

    return (
        <> 
        <h3>All Games</h3>
        <ul>
        {gamesJsx}
        </ul>
        </>
    )
}

export default IndexGames