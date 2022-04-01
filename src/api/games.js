import apiUrl from '../apiConfig'
import axios from 'axios'

//Index page function
//  Shows all games - Home page
//  Route /games
export const getAllGames = () => {
    return axios(`${apiUrl}/games`)
}

// Show game function
//   Show a specific game
//   Route  /games/:gameId
export const getOneGame = (gameId) => {
    return axios(`${apiUrl}/games/${gameId}`)
}

// Create game function
// POST route /games -> create function
export const createGame = (user, newGame) => {
    console.log('user', user)
    console.log('this is the newGame', newGame)

    return axios({
        url: `${apiUrl}/games`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { game: newGame }
    })
}

// Update game function
// PATCH route /games/:updatedGameId-> update function
export const updateGame = (user, updatedGame) => {
    console.log('user', user)
    console.log('this is the updated game', updatedGame)

    return axios({
        url: `${apiUrl}/games/${updatedGame._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { game: updatedGame }
    })
}

//  Delete a game function
// DELETE route /games/:gameId -> remove function
export const removeGame = (user, gameId) => {
    console.log('user', user)

    return axios({
        url: `${apiUrl}/games/${gameId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}