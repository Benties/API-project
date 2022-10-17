import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getReviews } from "../../store/review"



const AllReviews = ({spot}) => {
let spotId
if(spot) spotId = spot
const dispatch = useDispatch()
// TODO: call your thunk to dispatch the current spot to get reviews

    useEffect(() => {
        dispatch(getReviews(spotId))
    },[dispatch,spotId])

///TODO: query the state of redux to get the reviews
    const reviews = useSelector(state => Object.values(state.review))


    let review
    if(reviews[0]) review = reviews[0].id
    return (
        <div>REVIEWS!!!!</div>
    )
}



export default AllReviews
