import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllSpots } from "../../store/spot"


const AllSpots = () => {
    const dispatch = useDispatch()




    useEffect(() => {
        dispatch(getAllSpots())
    },[dispatch])

    const spots = useSelector(state => Object.values(state.spot.allSpots))

    return (
        <>
        {spots.map(spot => (
            <div key={spot.id} className='spotCard' >
                <div className='spotName'>
                {spot.name}
                </div>
                <div className="spotLocation">
                {spot.city}   {spot.country}
                </div>
                <div className="spotPrice">
                ${spot.price} night
                </div>
            </div>))}
        </>


    )
}

export default AllSpots
