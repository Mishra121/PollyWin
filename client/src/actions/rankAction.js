import axios from 'axios';

import { GET_RANKS, RANKS_LOADING, RAND_USER } from './types';


// Random User Generator for making a like dislike move
export const randUser = () => dispatch => {
    axios.
        get('api/votes/randUser')
        .then(
            res => {
                dispatch({
                    type: RAND_USER,
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
}

// Like the random User generated and then give a new random user
export const likeUser = (id) => dispatch => {
    axios.
        post('api/votes/like', {id})
        .then(
            res => {
                if(res.data.success)
                {
                   dispatch(randUser()); 
                }
            }
        ).catch(err =>
            {console.log(err);}
        );
}

// Dislike the random User generated and then give a new random user
export const dislikeUser = (id) => dispatch => {
    axios.
        post('api/votes/dislike', {id})
        .then(
            res => {
                if(res.data.success)
                {
                   dispatch(randUser()); 
                }
            }
        ).catch(err =>
            {console.log(err);}
        );
}

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