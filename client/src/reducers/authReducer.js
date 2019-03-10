import { SET_CURRENT_USER, EDIT_BIO } from '../actions/types'
import isEmpty from '../validations/isEmpty';

const initialState = {
    isAuthenticated: false,
    user: {},
    profileLoading: false,
}

export default function(state= initialState, action) {
    switch(action.type){
        case SET_CURRENT_USER:
            return{
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        case EDIT_BIO:
            return{
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}