import {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { postImg, postSpot } from '../../store/spot'


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
    const [imgUrl, setImgUrl] = useState('')
    const [prev, setPreview] = useState(false)


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

        const imgPayload = {
            url: imgUrl,
            preview: true
        }


        let createdSpot = await dispatch(postSpot(formData))
        if(createdSpot){
            dispatch(postImg(createdSpot.id, imgPayload))

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
                        placeholder='name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        />
                    <input
                        type='text'
                        name='address'
                        placeholder='address'
                        required
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
                        placeholder='longitutde'
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
                    <input
                        type='text'
                        name='imageUrl'
                        placeholder='Image Url'
                        value={imgUrl}
                        onChange={e => setImgUrl(e.target.value)}
                        />
                </label>
                <button>Post</button>
            </form>
    )
}

export default CreateSpot
