import axios from 'axios';
import {GET_ITEMS, POST_ITEMS,DELETE_ITEMS, ITEMS_LOADING} from '../actions/types';

export const getItems= ()=>dispatch=>
{
    dispatch(itemsLoading());
    axios.get('/api/item')
    .then(res=>dispatch({
        type:GET_ITEMS,
        payload:res.data
    }));
};

export const deleteItem=id =>dispatch=>
{
    axios.delete(`/api/item/${id}`)
    .then(res=>dispatch({
        type:DELETE_ITEMS,
        payload: id
    }));
};

export const postItem=item=>dispatch=>
{
    axios.post('/api/item',item)
    .then(res=>dispatch({
        type:POST_ITEMS,
        payload: res.data
    }));
};

export function itemsLoading()
{
    return{
        type:ITEMS_LOADING
    };
};