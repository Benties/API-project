import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot } from "../../store/spot";


const SingleSpot = () => {
   const dispatch = useDispatch()
   const { spotId } = useParams()

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
        </div>
    )
}



export default SingleSpot
