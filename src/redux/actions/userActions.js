import {ActionTypes} from '../constants/action-types'

export const setUser = (payload) => {
    return{
        type: ActionTypes.SET_USER,
        payload: payload
    }
}