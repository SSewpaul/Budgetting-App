import {
    USERS_LOADED,
    USERS_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from '../actions/types';

const initialState={
    token:localStorage.getItem('token'),
    isAuth:false,
    isLoading:false,
    user:[]
};

function authReducer(state=initialState,action)
{
    switch(action.type)
    {
        case USERS_LOADING:
            return {...state, isLoading:true};
        
        case USERS_LOADED:
            return {...state,isLoading:false,isAuth:true,user:action.payload};

        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token);
            localStorage.setItem('username',action.payload.user.username);
            return {...state,...action.payload,isLoading:false,isAuth:true};
        
        case REGISTER_SUCCESS:
            localStorage.setItem('token',action.payload.token);
            localStorage.setItem('username',action.payload.user.username);
            return {...state,...action.payload,isLoading:false,isAuth:true};
        
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            return {...state,token:null,isLoading:false,isAuth:false,user:null};
        
        default:
            return state;
    };
};

export default authReducer;