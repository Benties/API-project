import { csrfFetch } from "./csrf"
//TODO:
const LOAD_SPOTS = 'spots/LOAD_SPOTS'
const LOAD_ONE_SPOT = 'spots/LOAD_ONE_SPOT'
const LOAD_CURRENT_OWNERS_SPOT = 'spots/LOAD_CURRENT_OWNERS_SPOT'
const ADD_ONE_SPOT = 'spots/ADD_ONE_SPOT'
const DELETE_SPOT = 'spots/DELETE_SPOT'
const ADD_IMG = 'spots/ADD_IMG'

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

export const loadCurrentOwners = (spots) => {
    return {
        type: LOAD_CURRENT_OWNERS_SPOT,
        spots
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

export const addImg = (spotId, imgObj) => {
    return {
        type: ADD_IMG,
        spotId,
        imgObj
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
    if(res.ok){
        const spot = await res.json()
        dispatch(loadOne(spot))

    }
}

export const getCurrentOwnerSpot = () => async dispatch => {
    const res = await csrfFetch('/api/spots/current')
    if (res.ok) {
        const spots = await res.json()
        dispatch(loadCurrentOwners(spots))
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
    const res = await csrfFetch(`/api/spots/${payload}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        dispatch(deleteOne(payload))
    }
}

export const postImg = (spotId, imgUrl, form) => async dispatch => {
    // console.log(imgUrl)
    // console.log('this is the form', form)
    const formData = new FormData();
    const image = imgUrl
    // const preview = imgUrl.preview
    // console.log('frontend img', image)
    // formData.append('preview', preview)
    formData.append("image", image);
    // console.log('formmmmmmmmmmmmmmm', formData)
    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data",
          },
        body: formData,
    })
    if (res.ok) {
        const imgObj = await res.json()
        console.log('this is ressssssssssss', imgObj)
        dispatch(addImg(spotId, imgObj))
    }
}

const initialState = {
    allSpots: {},
    singleSpot: {},
    ownersSpot: {}
}


// TODO: reducer
const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            const newState = {...state, allSpots: {...state.allSpots}}
            action.spots.Spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            })
            return newState
        case LOAD_ONE_SPOT:
            const newSpot = {...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot }}
            newSpot.singleSpot = action.spot
            return newSpot
        case LOAD_CURRENT_OWNERS_SPOT:
            const newesterestSpot = {...state, ownersSpot: {}}
            action.spots.Spots.forEach(spot => {
                newesterestSpot.ownersSpot[spot.id] = spot
            })
            return newesterestSpot
        case ADD_ONE_SPOT:
            const newerSpot = {...state, allSpots: {...state.allSpots} }
            newerSpot.allSpots[action.spot.id] = action.spot
            return newerSpot
        case DELETE_SPOT:
            const newerState = {...state, allSpots: {...state.allSpots}, ownersSpot: {...state.ownersSpot} }
            delete newerState.allSpots[action.spotId]
            delete newerState.ownersSpot[action.spotId]
            return newerState
        case ADD_IMG:
            const newNewState = { ...state, allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot} }
            newNewState.allSpots[action.spotId].previewImage = action.imgObj.url
            // newNewState.singleSpot.SpotImages.push(action.imgObj)
            return newNewState
        default:
            return state
    }
}



export default spotReducer
