import axios from 'axios';

import { GET_RANKS, RANKS_LOADING } from './types';

// Get Ranks for leaderboard component
export const getRanks = () => dispatch => {
    dispatch(setRanksLoading());
    axios  
        .get('/api/votes/rankings')
        .then(res => {
            dispatch({
                type: GET_RANKS,
                payload: res.data
            })
        }
        )
        .catch(err =>
            dispatch({
                type: GET_RANKS,
                payload: null
            })
        );
};

// Ranks Loading
export const setRanksLoading = () => {
    return{
        type: RANKS_LOADING
    }
}