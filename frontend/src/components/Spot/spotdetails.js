import { useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot, deleteSpot} from "../../store/spot";
import EditSpot from "./editSpot";



const SingleSpot = () => {
   const dispatch = useDispatch()
   const { spotId } = useParams()
   const history = useHistory()


   const removeSpot = () => {
    dispatch(deleteSpot(spotId))
    return history.push('/')
}

   const onClick = () => {
    history.push(`/${spotId}/edit`)
}
    useEffect(() => {
        dispatch(getOneSpot(spotId))
    },[dispatch, spotId])

    const spot = useSelector(state => state.spot.singleSpot)
    if(!spot) return null
    let content
    spot? content = <li>{spot.name}</li> : content = <div></div>
    return (
        <div>
            {content}
            <button onClick={onClick}>Edit Spot</button>
            <Link to={`/`}>
            <button onClick={removeSpot}>Remove Spot</button>
            </Link>
        </div>
    )
}



export default SingleSpot
