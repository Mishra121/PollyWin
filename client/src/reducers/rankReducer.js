import { GET_RANKS, RANKS_LOADING, RAND_USER } from '../actions/types';

const initialState = {
    random: null,
    ranks: null,
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case RANKS_LOADING:
            return{
                ...state,
                loading: true
            }
        case GET_RANKS:
            return{
                ...state,
                ranks: action.payload,
                loading: false
            }
        case RAND_USER:
            return{
                ...state,
                random: action.payload    
            }
        default:
            return state;
    }
}