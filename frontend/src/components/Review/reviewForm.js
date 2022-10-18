import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { createReview } from "../../store/review"
import { getOneSpot } from "../../store/spot"



const CreateReview = ({spot, setShowModal}) => {
    const dispatch = useDispatch()
    const [rev, setReview] = useState()
    const [star, setStar] = useState(5)

    const starButton = (e, rate) => {
        e.preventDefault()
        setStar(rate)
    }

    const onSubmit = async e => {
        e.preventDefault()
        const formVals = {
            review: rev,
            stars: star
        }
        let newRev = dispatch(createReview(spot.id, formVals))

        if(newRev){
            setShowModal(false)
        }

        dispatch(getOneSpot(spot.id))
    }

    return (
        <form
            onSubmit={onSubmit}
            >
            {spot.name}
            <input
                type='text'
                name='rev'
                placeholder='Your Review'
                value={rev}
                onChange={e => setReview(e.target.value)}
                />

            <div>
                <button className="star" onClick={(e) => starButton(e, 1)}>1</button>
                <button className="star" onClick={(e) => starButton(e, 2)}>2</button>
                <button className="star" onClick={(e) => starButton(e, 3)}>3</button>
                <button className="star" onClick={(e) => starButton(e, 4)}>4</button>
                <button className="star" onClick={(e) => starButton(e, 5)}>5</button>
            </div>
            <button
            type="submit"
            >Submit Review</button>
        </form>
    )
}


export default CreateReview
