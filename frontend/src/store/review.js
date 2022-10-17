import { csrfFetch } from "./csrf"

const LOAD_REVIEWS = 'review/LOAD_REVIEWS'



// TODO: ACTION CREATOR
export const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}



// TODO:  THUNK
export const getReviews = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if (res.ok) {
        const reviews = await res.json()
        dispatch(loadReviews(reviews))
    }
}



const reviewReducer = (state={}, action) => {
    switch (action.type) {
        case LOAD_REVIEWS:
            const newState = {...state}
            action.reviews.Reviews.forEach(review => {
                newState[review.id] = review
            })
            return newState

        default:
            return state
    }
}


export default reviewReducer
