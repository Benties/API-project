import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getReviews } from "../../store/review"



const AllReviews = ({spot}) => {

const dispatch = useDispatch()
// TODO: call your thunk to dispatch the current spot to get reviews

    useEffect(() => {
        dispatch(getReviews(spot.id))
        console.log('review spotttttttttttttttt', spot)
    },[dispatch,spot.id])

///TODO: query the state of redux to get the reviews
    const reviews = useSelector(state => Object.values(state.review))
    console.log('REVIEWS!!!!!!!!!!!!!!', reviews)

    let review
    if(reviews[0]) review = reviews[0].id
    return (
        <div> All Reviews{reviews.map(ele => (<li key={ele.id}>{ele.review}</li>))}</div>
    )
}



export default AllReviews
