import { csrfFetch } from "./csrf"

const LOAD_REVIEWS = 'review/LOAD_REVIEWS'
const POST_REVIEW = 'review/POST_REVIEW'
const DELETE_REVIEW = 'review/DELETE_REVIEW'

// TODO: ACTION CREATOR
export const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}

export const postReview = (review) => {
    return {
        type: POST_REVIEW,
        review
    }
}

export const deleteOneReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
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

export const createReview = (spotId, payload) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(payload)
    })
    if (res.ok){
        const review = await res.json()
        dispatch(postReview(review))
        return review
    }
}

export const deleteReview = (reviewId) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    if (res.ok){
        dispatch(deleteOneReview(reviewId))
    }
}


const reviewReducer = (state={}, action) => {
    switch (action.type) {
        case LOAD_REVIEWS:
            const newState = {}
            action.reviews.Reviews.forEach(review => {
                newState[review.id] = review
            })
            return newState
        case POST_REVIEW:
            const newerState = {...state }
            newerState[action.review.id] = action.review
            return newerState
        case DELETE_REVIEW:
            const newererState = {...state}
            delete newererState[action.reviewId]
            return newererState

        default:
            return state
    }
}


export default reviewReducer
