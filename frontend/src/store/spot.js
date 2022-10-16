import { csrfFetch } from "./csrf"
//TODO:
const LOAD_SPOTS = 'spots/LOAD_SPOTS'
const LOAD_ONE_SPOT = 'spots/LOAD_ONE_SPOT'
const ADD_ONE_SPOT = 'spots/ADD_ONE_SPOT'
const DELETE_SPOT = 'spots/DELETE_SPOT'

// TODO: regular action creator
export const load = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

export const loadOne = (spot) => {
    return {
        type: LOAD_ONE_SPOT,
        spot
    }
}

export const addOne = (spot) => {
    return {
        type: ADD_ONE_SPOT,
        spot
    }
}

export const deleteOne = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}


// TODO: thunk action creator
export const getAllSpots = () => async dispatch =>{
    const res = await csrfFetch('/api/spots')
    if(res.ok){
        const spots = await res.json()
        dispatch(load(spots))
    }
}

export const getOneSpot = (id) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${id}`)
    console.log('res', res)
    if(res.ok){
        const spot = await res.json()
        console.log('this is spot' , spot)
        dispatch(loadOne(spot))

    }
}

export const postSpot = (payload) => async dispatch => {
    const res = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(payload)
    })
    if(res.ok){
        const spot = await res.json()
        dispatch(addOne(spot))
        return spot

    }
}

export const editSpot = (payload, id) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(payload)
    })
    if (res.ok){
        const spot = await res.json()
        dispatch(loadOne(spot))
        return spot
    }
}

export const deleteSpot = (payload) => async dispatch => {
    console.log('sebas',   payload)
    const res = await csrfFetch(`/api/spots/${payload}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        dispatch(deleteOne(payload))
    }
}

const initialState = {
    allSpots: {},
    singleSpot: {}
}


// TODO: reducer
const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            const newState = {...initialState, allSpots: {...state.allSpots}}
            action.spots.Spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            })
            return newState
        case LOAD_ONE_SPOT:
            const newSpot = {...initialState, allSpots: {...state.allSpots}}
            newSpot.singleSpot = action.spot
            return newSpot
        case ADD_ONE_SPOT:
            const newerSpot = {...initialState, allSpots: {...state.allSpots} }
            newerSpot.allSpots[action.spot.id] = action.spot
            return newerSpot
        case DELETE_SPOT:
            const newerState = {...initialState, allSpots: {...state.allSpots} }
            delete newerState.allSpots[action.spotId]
            return newerState
        default:
            return state
    }
}



export default spotReducer
