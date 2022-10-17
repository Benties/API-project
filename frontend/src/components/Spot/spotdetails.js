import { useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot, deleteSpot} from "../../store/spot";
import EditSpot from "./editSpot";
import { getReviews } from "../../store/review";
import AllReviews from '../Review'



const SingleSpot = () => {
   const dispatch = useDispatch()
   const { spotId } = useParams()
   const history = useHistory()

/// TODO: Click on button to delete spot by spotId then redirect to home page
   const removeSpot = () => {
    const deleted = dispatch(deleteSpot(spotId))
    if(deleted){
    history.push('/')
    }
}


// TODO: redirect to edit page of the target spot
   const onClick = () => {
    history.push(`/${spotId}/edit`)
}

// TODO: dipatch thunk with a payload of the current spots Id
   useEffect(() => {
           dispatch(getOneSpot(spotId))
   },[dispatch, spotId])

// TODO: use redux to get the current spot and set that to a const
    const spot = useSelector(state => state.spot.singleSpot)

// TODO: call your thunk to dispatch the current spot to get reviews

    useEffect(() => {
        dispatch(getReviews(spotId))
    },[dispatch,spotId])

///TODO: query the state of redux to get the reviews
    const reviews = useSelector(state => Object.values(state.review))

// TODO: Optional chaining????
    if(!spot) return null
    let review
    if(reviews[0]) review = reviews[0].id
// TODO: set a ternary so that you can query for the current spot and give your page time to render
    let content
    spot? content = <div><li>{spot.name}</li> <li>{review}</li> </div> : content = <div></div>
    return (
        <div>
            {content}
            <AllReviews/>
            <button onClick={onClick}>Edit Spot</button>

            <button onClick={removeSpot}>Remove Spot</button>

        </div>
    )
}



export default SingleSpot
