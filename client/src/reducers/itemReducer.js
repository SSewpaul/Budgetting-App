import { bindActionCreators } from 'redux';
import {v4 as uuid} from 'uuid';
import {GET_ITEMS, POST_ITEMS,DELETE_ITEMS} from '../actions/types';

//defining the initial state of the items
const initialState={
    items:[
        {id:uuid(), name:'Milk', cost:100, category:'food', username:'John'},
        {id:uuid(), name:'Water', cost:100, category:'food', username:'John'},
        {id:uuid(), name:'spoon', cost:100, category:'other', username:'Jack'},
        {id:uuid(), name:'rent', cost:100, category:'rent', username:'Jill'}
]}

/*
 * @desc perform relevant changes to the state based on the action 
 * @params initalState - holds the initial state of the page
 *         action - action that needs to be performed
 * @return new state
 */
export default function(state=initialState,action)
{
    switch(action.type)
    {
        case GET_ITEMS:
            //returns current items
            return{...state};

        case DELETE_ITEMS:
            //deletes the item with a specific id
            return{...state, items: state.items.filter(item => item.id!=action.payload)};

        default:
            return state;
    }
}

