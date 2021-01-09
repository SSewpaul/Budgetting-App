import axios from 'axios';
import {GET_ITEMS, POST_ITEMS,DELETE_ITEMS, ITEMS_LOADING} from '../actions/types';
import {checkToken} from './authActions';
import {getErrors} from './errorActions';

export const getItems= (username,month,year)=>(dispatch,getState)=>
{
    console.log("here");
    dispatch(itemsLoading());
    axios.get(`/api/item/${username}/${month}/${year}`,checkToken(getState))
    .then(res=>dispatch({
        type:GET_ITEMS,
        payload:res.data
    }))
    .catch(err=>dispatch(getErrors(err.response.data,err.response.status)));
    
};

export const deleteItem=id=>(dispatch,getState)=>
{
    axios.delete(`/api/item/${id}`,checkToken(getState))
    .then(res=>dispatch({
        type:DELETE_ITEMS,
        payload: id
    }))
    .catch(err=>dispatch(getErrors(err.response.data,err.response.status)));
};

export const postItem=item=>(dispatch,getState)=>
{
    axios.post('/api/item',item,checkToken(getState))
    .then(res=>dispatch({
        type:POST_ITEMS,
        payload: res.data
    }))
    .catch(err=>dispatch(getErrors(err.response.data,err.response.status)));
};

export function itemsLoading()
{
    return{
        type:ITEMS_LOADING
    };
};