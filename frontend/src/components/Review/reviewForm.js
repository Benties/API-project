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
    const [selected, setSelected] = useState(false)
    // let starType
    // if(!selected) {
    //     starType = &#9734;
    // }

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
            className='reviewForm'
            >
        <ul className="errors">
            {errors.map((error, idx) => <li key={idx}> <i className='fa fa-exclamation-circle' /> {error}</li>)}
        </ul>
            <div className='currSpotName'>
                {spot.name}
            </div>
            <input
                className='reviewBox'
                type='text'
                name='rev'
                placeholder='Your Review'
                value={rev}
                onChange={e => setReview(e.target.value)}
                />
{/* style="font-size:300%;color:yellow;"> */}
            <div className="holdMyStars">
                <button className="star star1" onClick={(e) => starButton(e, 1)}>&#9733;</button>
                <button className="star star2" onClick={(e) => starButton(e, 2)}>&#9733;</button>
                <button className="star star3" onClick={(e) => starButton(e, 3)}>&#9733;</button>
                <button className="star star4" onClick={(e) => starButton(e, 4)}>&#9733;</button>
                <button className="star star5" onClick={(e) => starButton(e, 5)}>&#9733;</button>
            </div>
            <div className="ratingContainer">
                    {star} star
            </div>
            <div className="revSubmitContainer">
                <button
                type="submit"
                id="revSubmit"
                // onClick={(e) => closeModal()}
                >Submit Review</button>
            </div>
        </form>
    )
}


export default CreateReview
