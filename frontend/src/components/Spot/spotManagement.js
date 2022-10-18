import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getAllSpots } from "../../store/spot"
import LoginFormModal from "../LoginFormModal"



const Manager = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const spots = useSelector(state => Object?.values(state?.spot?.allSpots))
    const user = useSelector(state => state?.session?.user)

    const userSpots = spots?.filter(spot => spot?.ownerId === user?.id)

    // TODO: Dispatch getallspots then filter based on current
    useEffect(() => {
        dispatch(getAllSpots())
    },[dispatch])

    let content
    console.log('thisis' ,user)
    if(user?.email) {

        user?.id === userSpots[0]?.ownerId ?
        // true === false ?

        content = (
        <div>
            <h1>
                Hi {user?.firstName}, welcome to your listing management
            </h1>
            {userSpots?.map(spot => (
                <li key={spot?.id}>
                    {spot?.name}
                </li>
            ))}
        </div> )
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

        <div>
           {content}
        </div>

    )
}


export default Manager
