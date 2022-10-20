import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getAllSpots, getCurrentOwnerSpot, loadCurrentOwners, deleteSpot } from "../../store/spot"
import LoginFormModal from "../LoginFormModal"
import './spotManagement.css'


const Manager = () => {
    const dispatch = useDispatch()
    const history = useHistory()


    const user = useSelector(state => state?.session?.user)

    const spots = useSelector(state => Object.values(state?.spot?.ownersSpot))

    // TODO: onclick takes you to the edit page of the corrensponding spot by id
    const editSpot = (spotId) => {
        history.push(`/${spotId}/edit`)
    }
    // TODO: dispatches the delete thunk for the correspond spot by id (settime out so the slice of state can get read before render)
    const removeSpot = (spotId) => {
        const deleted = dispatch(deleteSpot(spotId))
        if(deleted){
            history.push('/Loading')
            setTimeout(() => {
                history.push('/hosting')
            },500)
        }
    }


    useEffect(() => {
        dispatch(getCurrentOwnerSpot())
    },[dispatch])

    let content
    if(user?.id){
        spots.length ?
        content = (
            <div className="spotManager">
                <h1 className="managerBanner">
                   Hi {user?.firstName}, welcome to your listing management
                </h1>
                {spots?.map((spot) => (
                    <div className="eachSpotContainer">
                    <div>{spot.name}</div>
                    <img className='spotImage' src={spot?.previewImage} width='100px' height='100px'/>
                    <button onClick={() => editSpot(spot?.id)}>Edit Spot</button>
                    <button onClick={() => removeSpot(spot?.id)}>Remove Spot</button>
                    </div>
                ))}
            </div>
        )
        :
        content = (
            <div>
                <h1>Start your hosting journey today</h1>
                <button onClick={() => {history.push('/spots/new')}}>Create a listing</button>
            </div>

        )
    } else {
        content = (
            <div>
                <h1>Start your hosting journey today</h1>
                <LoginFormModal/>
            </div>
        )

    }
    return (
        <div className="spotManagerMasterContainer">
            {content}
        </div>

    )
}

export default Manager
