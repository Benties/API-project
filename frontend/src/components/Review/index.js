import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteReview, getReviews } from "../../store/review"
import { getOneSpot } from "../../store/spot"
import './reviews.css'


const AllReviews = ({spot}) => {

const dispatch = useDispatch()
// TODO: call your thunk to dispatch the current spot to get reviews

    useEffect(() => {
        dispatch(getReviews(spot?.id))
    },[dispatch, spot?.id, spot])

///TODO: query the state of redux to get the reviews
const reviews = useSelector(state => Object.values(state?.review))

// TODO: query the user id and check if it matches the review.userId
const userId = useSelector(state => state?.session?.user)

const deleteRev = (id) => {
    dispatch(deleteReview(id))
    dispatch(getOneSpot(spot?.id))
}

const deleteButton = (userid, revId) => userid === userId?.id ? <button onClick={() => deleteRev(revId)}>Delete Review</button> : null


    return (
        <div className='spotReviewsContainer' > All Reviews{reviews.map(ele =>
            (<ul className="eachReview">
                <div key={ele?.id}>{ele?.User?.firstName}: {ele?.review}</div>
                {deleteButton(ele?.userId, ele?.id)}
            </ul>

            ))}

            </div>
    )
}



export default AllReviews
