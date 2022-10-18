import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot, deleteSpot} from "../../store/spot";
import AllReviews from '../Review'
import CreateFormModal from "../Review/reviewModal";



const SingleSpot = () => {
   const dispatch = useDispatch()
   const { spotId } = useParams()
   const history = useHistory()

/// TODO: Click on button to delete spot by spotId then redirect to home page
   const removeSpot = () => {
    const deleted = dispatch(deleteSpot(spotId))
    if(deleted){
        history.push('/Loading')
    setTimeout(() => {
        history.push('/')
    },500)
    }
}


// TODO: redirect to edit page of the target spot
   const onClick = () => {
    history.push(`/${spotId}/edit`)
}

// TODO: dipatch thunk with a payload of the current spots Id
// const [numReviews, setNumReviews] = useState(false)

// TODO: use redux to get the current spot and set that to a const
const spot = useSelector(state => state.spot.singleSpot)
const spotRev = useSelector(state => state.review)
useEffect(() => {
    dispatch(getOneSpot(spotId))
},[dispatch, spotId, spotRev.length])

    // useEffect(() => {
    //     dispatch(getOneSpot(spotId))
    // },[spot])
// TODO: Optional chaining????
    if(!spot) return null
// TODO: set a ternary so that you can query for the current spot and give your page time to render
    let content
    spot? content =
    <div>
        <h2>{spot.name}</h2>
        <h4>{spot.avgStarRating}</h4>
        <AllReviews spot={spot}/>

    </div>
    : content = <div></div>
    return (
        <div>
            {content}
            {/* <AllReviews spot={spot}/> */}
            <button onClick={onClick}>Edit Spot</button>

            <button onClick={removeSpot}>Remove Spot</button>
            {/* <button onClick={createReview}>Leave a Review</button> */}
            <CreateFormModal spot={spot}/>
        </div>
    )
}



export default SingleSpot
