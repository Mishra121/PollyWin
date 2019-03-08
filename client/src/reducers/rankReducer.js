import { GET_RANKS, RANKS_LOADING } from '../actions/types';

const initialState = {
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
        default:
            return state;
    }
}