import {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { loadOne, editSpot, getOneSpot, deleteSpot } from '../../store/spot'


const EditSpot = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadOne(spotId))
    },[dispatch, spotId])

    const spot = useSelector(state => state.spot.singleSpot)
    // if (!spot) return null

    const [address, setAddress] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [country, setCountry] = useState(spot.country)
    const [lat, setLat] = useState(spot.lat)
    const [lng, setLng] = useState(spot.lng)
    const [name, setName] = useState(spot.name)
    const [description, setDescription] = useState(spot.description)
    const [price, setPrice] = useState(spot.price)
    const history = useHistory()

    // useEffect(() => {
    //     setAddress(spot.address)
    //     setCity(spot.city)
    //     setState(spot.state)
    //     setCountry(spot.country)
    //     setLat(spot.lat)
    //     setLng(spot.lng)
    //     setName(spot.name)
    //     setDescription(spot.description)
    //     setPrice(spot.price)
    // },[dispatch])

    const updateName = (e) => setName(e.target.value)

    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }


        let createdSpot = await dispatch(editSpot(formData, spotId))
        if(createdSpot){
            history.push(`/spots/${spotId}`)
        }
    }

    const removeSpot = () => {
        dispatch(deleteSpot(spotId))
        history.push('/')
    }
    return (
        <>
        <form onSubmit={onSubmit}>
            <label>
                Create a Spot
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
                    type='number'
                    name='lat'
                    placeholder='latitude'
                    value={lat}
                    onChange={e => setLat(e.target.value)}
                    />
                <input
                    type='number'
                    name='lng'
                    placeholder='longitude'
                    value={lng}
                    onChange={e => setLng(e.target.value)}
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
            <button>Post</button>
        </form>
        <button onClick={removeSpot}>Remove this Spot</button>
        </>
    )
}

export default EditSpot
