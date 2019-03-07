import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { SET_CURRENT_USER, GET_ERRORS } from './types';



// Facebook Login - Get User Token
export const loginUser = ({id, name, email}) => dispatch => {
    axios.post('/auth/token-fb', {id, name, email})
        .then(res => {
            // Save to localStorage
            const { token } = res.data;
            console.log(token);
            // Set token to ls
            localStorage.setItem('jwtToken', token);
            // Set token to Auth headers
            setAuthToken(token);
            // Decode token to get user details
            const decoded = jwt_decode(token);
            // Set current user(Action)
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
};



// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// Log user out
export const logoutUser = () => dispatch => {
    // Remove the token from localstorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
}