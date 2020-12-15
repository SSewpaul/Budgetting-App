import {GET_ITEMS, POST_ITEMS,DELETE_ITEMS} from '../actions/types';

export function getItems()
{
    return{
        type:GET_ITEMS
    };
}

export function deleteItem(id)
{
    return{
        type:DELETE_ITEMS,
        payload: id
    }
}