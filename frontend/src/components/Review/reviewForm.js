import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { createReview } from "../../store/review"
import { getOneSpot } from "../../store/spot"
import './reviewForm.css'



const CreateReview = ({spot, setShowModal}) => {
    const dispatch = useDispatch()
    const [rev, setReview] = useState()
    const [star, setStar] = useState(5)
    const [errors, setErrors] = useState([]);

    const starButton = (e, rate) => {
        e.preventDefault()
        setStar(rate)
    }


    const onSubmit = async e => {
        e.preventDefault()
        setErrors([]);

        const formVals = {
            review: rev,
            stars: star
        }
        let newRev = await dispatch(createReview(spot?.id, formVals)).catch(
            async (res) => {
              const data = await res.json();
              if (data && data.errors){
                  setErrors(data.errors);
              }
            }
          );


        // setTimeout(() => {
        //     console.log(newRev)
        //     if(newRev){
        //         setShowModal(false)
        //     } else {
        //         setShowModal(true)
        //     }
        // },100)

            if(newRev){
                setShowModal(false)
            } else {
                setShowModal(true)
            }

        dispatch(getOneSpot(spot?.id))
    }




    return (
        <form
            onSubmit={onSubmit}
            >
        <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
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
            // onClick={(e) => closeModal()}
            >Submit Review</button>
        </form>
    )
}


export default CreateReview
