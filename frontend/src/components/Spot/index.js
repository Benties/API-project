import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NavLink, useHistory } from "react-router-dom"
import { getAllSpots } from "../../store/spot"
import './allSpots.css'


const AllSpots = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    // const onClick = () => {
    //     history.push(`/spots/${}`)
    // }

    useEffect(() => {
        dispatch(getAllSpots())
    },[dispatch])

    const newSpot = () => {
        history.push('/spot/new')
    }

    const spots = useSelector(state => Object.values(state.spot.allSpots))

    return (
        <div className="spotContainer">
        {spots?.map(spot => (
            <div key={spot.id} className='spotCard' >
                <NavLink to={`/spots/${spot.id}`}>
                    <img className='spotImage' src={spot?.previewImage} width='100px' height='100px'/>
                    <div className='spotName'>
                    {spot.name}
                    </div>
                    <div className="spotLocation">
                    {spot.city}   {spot.country}
                    </div>
                    <div className='spotRating'>{spot.avgRating}</div>
                    <div className="spotPrice">
                    ${spot.price} night
                    </div>
                </NavLink>
            </div>))}
        </div>
    )
}

export default AllSpots
