import { useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot, deleteSpot} from "../../store/spot";
import EditSpot from "./editSpot";
import AllReviews from '../Review'



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
    },'1000')
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


// TODO: Optional chaining????
    if(!spot) return null
// TODO: set a ternary so that you can query for the current spot and give your page time to render
    let content
    spot? content = <div><li>{spot.name}</li> <AllReviews spot={spot}/> </div> : content = <div></div>
    return (
        <div>
            {content}
            {/* <AllReviews spot={spot}/> */}
            <button onClick={onClick}>Edit Spot</button>

            <button onClick={removeSpot}>Remove Spot</button>

        </div>
    )
}



export default SingleSpot
