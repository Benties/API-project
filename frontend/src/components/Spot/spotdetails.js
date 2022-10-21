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

const currSession = useSelector(state => (state?.session?.user?.id))

const currReview = useSelector(state => (state?.review))

// TODO: use redux to get the current spot and set that to a const
const spot = useSelector(state => state?.spot?.singleSpot)

// TODO: dipatch thunk with a payload of the current spots Id
useEffect(() => {
    dispatch(getOneSpot(spotId))
},[dispatch, spotId])


// TODO: Optional chaining????
    if(!spot) return null
// TODO: set a ternary so that you can query for the current spot and give your page time to render
    let content
    spot? content =
    <div className="detailsContainer">
        <h2>{spot?.name}</h2>
        <div className="spotDescription">
            <div>⭐</div>
            <h6>{spot?.avgStarRating}</h6>
            <div>•</div>
            <h6 className="spotRevs">{spot?.numReviews} reviews</h6>
            <div>•</div>
            <div>🏅</div>
            <h6>SuperHost</h6>
            <div>•</div>
            <h6 className="spotLocate">{spot?.city},{spot?.state},{spot?.country}</h6>
        </div>
        <div className='spotDetailsImages'>
            {spot?.SpotImages?.map(img => (
                <img className='eachImg' src={img?.url}/>
            ))}
        </div>
        <div className='ownerInfo'>
            <h3>Entire Spot hosted by {spot?.Owner?.firstName}</h3>
            <p>3 guests • 2 bedrooms • 14 beds • 2 baths</p>
        </div>
        <AllReviews spot={spot}/>

    </div>
    : content = <div></div>

    let reviewModal = <CreateFormModal spot={spot}/>

    Object?.values(currReview)?.forEach(ele => {
        if(ele?.userId === currSession) {
            reviewModal = <div></div>
        }
    })
    if(currSession === spot?.ownerId) {
        reviewModal = <div></div>
    }
    if(!currSession){
        reviewModal = <div></div>
    }


    return (
        <div className="spotMasterContainer">
            {content}

     {/* TODO: review Modal */}
            {/* <CreateFormModal spot={spot}/> */}
            {reviewModal}
        </div>
    )
}



export default SingleSpot
