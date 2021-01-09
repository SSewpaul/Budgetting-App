import axios from 'axios';
import {getErrors} from './errorActions';
import history from '../history';

import {
    USERS_LOADED,
    USERS_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from './types';

//Look for token and set headers
export const checkToken=getState=>
{
    //fetching token
    const token= getState().auth.token;

    //configuring header
    const config= {
        headers:{
            'Content-Type': 'application/json'
        }
    };

    //if token is found add token to header
    if(token){
        config.headers['x-auth-token'] = token;
    }

    return config;
}

//Register
export const register = ({username,email,password})=>dispatch=>{

    //Request
    const body =JSON.stringify({username,email,password});

    const head={
        headers: {
            'Content-Type': 'application/json'
        }
    };

    axios.post('/api/user',body,head)
    .then(res=>{ 
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        });
        history.push('/');
        window.location.reload();
    })
    .catch(err=>{
        dispatch(getErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
        dispatch({
            type:REGISTER_FAIL
        });
    });
};

//Login
export const login = ({username, password})=>dispatch=>{

    //Request
    const body =JSON.stringify({username,password});

    const head={
        headers: {
            'Content-Type': 'application/json'
        }
    };

    axios.post('/api/auth',body,head)
    .then(res=>{ 
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        });
        history.push('/');
        window.location.reload();
    })
    .catch(err=>{
        dispatch(getErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
        dispatch({
            type:LOGIN_FAIL
        });
    });
};

//Load user
export const loadUser = () => (dispatch,getState) => {

    //Loading user
    dispatch({type:USERS_LOADING});

    axios.get('/api/auth/user',checkToken(getState))
    .then(res=>dispatch({
        type: USERS_LOADED,
        payload:res.data
    }))
    .catch(err=> {
        dispatch({
            type:AUTH_ERROR
        });
        dispatch(getErrors(err.response.data,err.response.status));
    });
};

//Logout user
export const logout =()=>
{
    return {
        type:LOGOUT_SUCCESS
    };
}

