import apiUrl from '../apiConfig'
import axios from 'axios'

//index function
export const getAllGames = () => {
    return axios(`${apiUrl}/games`)
}