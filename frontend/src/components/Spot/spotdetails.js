import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot, deleteSpot} from "../../store/spot";
import AllReviews from '../Review'
import CreateFormModal from "../Review/reviewModal";
import './spotDetails.css'



const SingleSpot = () => {
   const dispatch = useDispatch()
   const { spotId } = useParams()
   const history = useHistory()



// TODO: use redux to get the current spot and set that to a const
const spot = useSelector(state => state.spot.singleSpot)

// TODO: dipatch thunk with a payload of the current spots Id
useEffect(() => {
    dispatch(getOneSpot(spotId))
},[dispatch, spotId])


// TODO: Optional chaining????
    if(!spot) return null
// TODO: set a ternary so that you can query for the current spot and give your page time to render
    let content
    spot? content =
    <div>
        <h2>{spot.name}</h2>
        <div className="spotDescription">
            <h6>{spot.avgStarRating}</h6>
            <h6>{spot.numReviews}</h6>
            <h6>SuperHost</h6>
            <h6>{spot.city},{spot.state},{spot.country}</h6>
        </div>
        <div className='spotImages'>
            {spot?.SpotImages?.map(img => (
                <img className='eachImg' src={img?.url} width='100px' height='100px'/>
            ))}
        </div>
        <div className='ownerInfo'>
            <h3>Entire Spot hosted by {spot?.Owner?.firstName}</h3>
            <p>3 guests . 2 bedrooms . 14 beds . .5 baths</p>
        </div>
        <AllReviews spot={spot}/>

    </div>
    : content = <div></div>
    return (
        <div className="spotDetails">
            {content}

     {/* TODO: review Modal */}
            <CreateFormModal spot={spot}/>
        </div>
    )
}



export default SingleSpot
