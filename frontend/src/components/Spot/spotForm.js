import {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { postSpot } from '../../store/spot'


const CreateSpot = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [errors,  setErrors] = useState([])


    useEffect(() => {
        let errs = []
        if(!address) errs.push('Street address is required')
        if(!city) errs.push('City is required')
        if(!state) errs.push('State is required')
        if(!country) errs.push('Country is required')
        // if(typeof(lat) !== Number) errs.push('Latitude is not valid')
        // if(typeof lng !== Number) errs.push('Longitude is not valid')
        if(name.length > 50) errs.push('Name must be less than 50 characters')
        if(!description) errs.push('Description is required')
        if(!price) errs.push('Price per day is required')

        setErrors(errs)


    },[address, city, state, country, name, description, price])

    const onSubmit = async e => {
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


        let createdSpot = await dispatch(postSpot(formData))
        if(createdSpot){
            history.push(`/`)
        }
    }
    return (
            <form onSubmit={onSubmit}>
                <ul>
                    {errors.map((ele) => (
                        <li key={ele}>{ele}</li>
                    ))}
                </ul>
                <label>
                    Create a Spot
                    <input
                        type='text'
                        name='name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        />    name
                    <input
                        type='text'
                        name='address'
                        required
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        /> address
                    <input
                        type='city'
                        name='city'
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        /> city
                    <input
                        type='text'
                        name='state'
                        value={state}
                        onChange={e => setState(e.target.value)}
                        /> state
                    <input
                        type='text'
                        name='country'
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        /> country
                    <input
                        type='number'
                        name='lat'
                        value={lat}
                        onChange={e => setLat(e.target.value)}
                        /> latitude
                    <input
                        type='number'
                        name='lng'
                        value={lng}
                        onChange={e => setLng(e.target.value)}
                        /> longitude
                    <input
                        type='text'
                        name='description'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        /> description
                    <input
                        type='number'
                        name='price'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        /> price
                </label>
                <button>Post</button>
            </form>
    )
}

export default CreateSpot
