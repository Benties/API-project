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

    const spots = useSelector(state => Object.values(state?.spot?.allSpots))

    return (
        <div className="spotContainer">
            <div className="gridContainer">
             {spots?.map(spot => (
                 <div key={spot?.id} className='spotCard' >
                     <NavLink className='spotLink' to={`/spots/${spot?.id}`}>
                         <img className='spotImage' src={spot?.previewImage} width='100px' height='100px'/>
                         {/* <div className='spotName'>
                         {spot.name}
                         </div> */}
                         <div className="spotLocation">
                            {spot?.city}   {spot?.state}
                            {/* <div> */}
                            {/* <img className="star" src='https://i.imgur.com/08pAFWv.png'/> */}
                            {/* </div> */}
                            <div className='spotRating'>⭐ {spot?.avgRating}</div>
                        </div>
                        <div className='distanceContainer'>
                            <div>100 miles away</div>
                        </div>
                        <div className='bookingContainer'>
                            <div>Dec 22-30</div>
                        </div>
                        <div className="priceContainer">
                            <div className="spotPrice">  ${spot?.price}  </div>
                            <div className='night'> night </div>
                        </div>
                     </NavLink>
                 </div>))}
            </div>
        </div>
    )
}

export default AllSpots
