import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useHistory } from "react-router-dom"
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
            // history.push('/Loading')
            setTimeout(() => {
                history.push('/hosting')
            },200)
        }
    }

    const logInModal = () => {
        history.push(<LoginFormModal/>)
    }

    useEffect(() => {
        dispatch(getCurrentOwnerSpot())
    },[dispatch])

    let content
    if(user?.id){
        spots.length ?
        content = (
            <div>
                <h1 className="managerBanner">
                   Hi {user?.firstName}, welcome to your listing management
                </h1>
                <div className="spotManager">
                {spots?.map((spot) => (
                    <div className="eachSpotContainer">
                    <div className="spotManagerName">{spot.name}</div>
                    <img className='spotManagerImage' src={spot?.previewImage} width='100px' height='100px'/>
                    <div className="spotManageButtons">
                        <button className="manageButtons" onClick={() => editSpot(spot?.id)}>Edit Spot</button>
                        <button className="manageButtons" onClick={() => removeSpot(spot?.id)}>Remove Spot</button>
                    </div>
                    </div>
                ))}
                </div>
            </div>
        )
        :
        content = (
            <div >
                <h1  className="managerBanner">Start your hosting journey today</h1>
                {/* <button onClick={() => {history.push('/spot/new')}}>Click here to start hosting today</button> */}
                <NavLink to='/spot/new'>Click here to start hosting today</NavLink>
            </div>

        )
    } else {
        content = (
            <div className="spotManagerOff">
                <h1 className="managerBannerOff" >Start your hosting journey today </h1>
                {/* <div className="modalContainer"> */}
                    <LoginFormModal />
                {/* </div> */}
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
