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
    setTimeout(() => {
        dispatch(getOneSpot(spot?.id))
    },200)
}

const convertTimestampToMonthYear = timestamp =>{
    const date = new Date(timestamp);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${year}`;
  }
const deleteButton = (userid, revId) => userid === userId?.id ? <button id="deleteButtOnRev" onClick={() => deleteRev(revId)}>Delete</button> : null


    return (
        <div className='spotReviewsContainer' >
            <div className='rev-header'>
                ⭐ {spot?.avgStarRating} • {spot?.numReviews} {spot?.numReviews == 1 ? 'review' : 'reviews'}
            </div>
                {reviews.map(ele =>
                    (<ul className="eachReview">
                        <div className="reviewer">
                            <div key={ele?.id} id='reviewer-name'>{ele?.User?.firstName}</div>
                            <div>{convertTimestampToMonthYear(ele?.createdAt)}</div>
                        </div>
                        <div id="review">{ele?.review} ⭐{ele?.stars} </div>
                        <div className="revDeleteButt">

                        {deleteButton(ele?.userId, ele?.id)}
                        </div>
                    </ul>
                    ))}
        </div>
    )
}



export default AllReviews
