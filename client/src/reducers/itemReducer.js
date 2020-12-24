import {GET_ITEMS, POST_ITEMS,DELETE_ITEMS,ITEMS_LOADING} from '../actions/types';

//defining the initial state of the items
const initialState={
    items:[],
    loading: false
}

/*
 * @desc perform relevant changes to the state based on the action 
 * @params initalState - holds the initial state of the page
 *         action - action that needs to be performed
 * @return new state
 */
function itemReducer(state=initialState,action)
{
    switch(action.type)
    {
        case GET_ITEMS:
            //returns current items
            return{...state,items:action.payload,loading:false};

        case DELETE_ITEMS:
            //deletes the item with a specific id
            return{...state, items: state.items.filter(item => item._id!==action.payload)};
        
        case POST_ITEMS:
            //adds the item
            return{...state, items: [action.payload,...state.items]};

        
        case ITEMS_LOADING:
            return{...state,loading:true};

        default:
            return state;
    }
}

export default itemReducer;
