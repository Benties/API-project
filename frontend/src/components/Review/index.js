import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteReview, getReviews } from "../../store/review"



const AllReviews = ({spot}) => {

const dispatch = useDispatch()
// TODO: call your thunk to dispatch the current spot to get reviews

    useEffect(() => {
        dispatch(getReviews(spot.id))
    },[dispatch, spot.id, spot])

///TODO: query the state of redux to get the reviews
const reviews = useSelector(state => Object.values(state.review))

// TODO: query the user id and check if it matches the review.userId
const userId = useSelector(state => state.session.user)

const deleteRev = (id) => {
    dispatch(deleteReview(id))
}

const deleteButton = (userid, revId) => userid === userId.id ? <button onClick={() => deleteRev(revId)}>Delete</button> : null


    return (
        <div> All Reviews{reviews.map(ele =>
            (<ul>
                <li key={ele.id}>{ele.review}</li>
                {deleteButton(ele.userId, ele.id)}
            </ul>

            ))}

            </div>
    )
}



export default AllReviews
