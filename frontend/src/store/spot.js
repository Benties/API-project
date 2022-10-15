import { csrfFetch } from "./csrf"
//TODO:
const LOAD_SPOTS = 'spots/LOAD_SPOTS'




// TODO: regular action creator
export const load = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}


// TODO: thunk action creator
export const getAllSpots = () => async dispatch =>{
    const res = await csrfFetch('/api/spots')
    if(res.ok){
        const spots = await res.json()
        console.log('spots', spots)
        dispatch(load(spots))
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
            const newState = {...initialState}
            action.spots.Spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            })
            return newState
        default:
            return state
    }
}



export default spotReducer
