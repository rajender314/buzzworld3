
import {ActionTypes} from '../constants/action-types'


const intialState = {
    user: {}
}

export const userReducer = (state=intialState, action) => {
    switch (action.type){
        case ActionTypes.SET_USER:
            return {...state, user:action.payload};
        default:
            return state;    
    }
}

