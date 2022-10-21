import {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { loadOne, editSpot, getOneSpot, deleteSpot } from '../../store/spot'
import './editSpot.css'

const EditSpot = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const spot = useSelector(state => state.spot.singleSpot)
    useEffect(() => {
        dispatch(getOneSpot(spotId))
    },[dispatch, spotId])


    const [address, setAddress] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [country, setCountry] = useState(spot.country)
    const [name, setName] = useState(spot.name)
    const [description, setDescription] = useState(spot.description)
    const [price, setPrice] = useState(spot.price)
    const [errors, setErrors] = useState([])

    const history = useHistory()

    useEffect(() => {
        setAddress(spot.address)
        setCity(spot.city)
        setState(spot.state)
        setCountry(spot.country)
        setName(spot.name)
        setDescription(spot.description)
        setPrice(spot.price)
    },[spot])

    const updateName = (e) => setName(e.target.value)

    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            address,
            city,
            state,
            country,
            name,
            description,
            price
        }
        setErrors([])

        let editedSpot = await dispatch(editSpot(formData, spotId)).catch(
            async (res) => {
              const data = await res.json();
              if (data && data.errors) {
                  setErrors(data.errors);
              }
            }
          );
        if(editedSpot){
            history.push(`/spots/${spotId}`)
        }
    }

    const removeSpot = () => {
        dispatch(deleteSpot(spotId))
        history.push('/')
    }

    return (
        <div className='editSpotContainer'>
        <form  className='editSpotForm' onSubmit={onSubmit}>
            <ul className="errors" >
              {errors.map((error, idx) => (
                <li key={idx}> <i className='fa fa-exclamation-circle' /> {error}</li>
                ))}
            </ul>
            <label className='formLabel'>
                Edit your spot
                <input
                    type='text'
                    name='name'
                    placeholder='name'
                    value={name}
                    onChange={updateName}
                    />
                <input
                    type='text'
                    name='address'
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    />
                <input
                    type='city'
                    name='city'
                    placeholder='city'
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    />
                <input
                    type='text'
                    name='state'
                    placeholder='state'
                    value={state}
                    onChange={e => setState(e.target.value)}
                    />
                <input
                    type='text'
                    name='country'
                    placeholder='country'
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    />
                <input
                    type='text'
                    name='description'
                    placeholder='description'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    />
                <input
                    type='number'
                    name='price'
                    placeholder='price'
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    />
            </label>
            <button className='editFormButt'>Post</button>
        </form>
        <div className='editDeleteContainer'>
            <button  className='editDeleteFormButt' onClick={removeSpot}>Remove this Spot</button>
        </div>
        </div>
    )
}

export default EditSpot
