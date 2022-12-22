import {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { postImg, postSpot } from '../../store/spot'
import './spotForm.css'


const CreateSpot = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    // const [lat, setLat] = useState('')
    // const [lng, setLng] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [errors,  setErrors] = useState([])
    const [imgUrl, setImgUrl] = useState(null)
    // const [prev, setPreview] = useState(false)

    const testCreate = () => {
        setAddress('test')
        setCity('test')
        setState('test')
        setCountry('test')
        // setLat(3)
        // setLng(42)
        setName('testing')
        setDescription('testtesttsetstest')
        setPrice(9999)
        setImgUrl('https://i.imgur.com/bJhQYx1.jpg')
    }

    // useEffect(() => {
    //     let errs = []
    //     if(!address) errs.push('Street address is required')
    //     if(!city) errs.push('City is required')
    //     if(!state) errs.push('State is required')
    //     if(!country) errs.push('Country is required')
    //     if(name.length > 50) errs.push('Name must be less than 50 characters')
    //     if(!description) errs.push('Description is required')
    //     if(!price) errs.push('Price per day is required')

    //     setErrors(errs)


    // },[address, city, state, country, name, description, price])

    const onSubmit = async e => {
        e.preventDefault()
        setErrors([]);
        const formData = {
            address,
            city,
            state,
            country,
            // lat,
            // lng,
            name,
            description,
            price
        }

        // const imgPayload = {
        //     url: imgUrl,
        //     preview: true
        // }

        if(imgUrl) {
            let createdSpot = await dispatch(postSpot(formData)).catch(
                async (res) => {
                  const data = await res.json();
                  if (data && data.errors) {
                      setErrors(data.errors);
                  }
                }
              );
            if(createdSpot){
                const form = document.getElementById('form')
                dispatch(postImg(createdSpot.id, imgUrl, form))
                history.push(`/`)
            }
        } else {
            setErrors(['Image Url is required'])
        }
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImgUrl(file);
      };
    return (
            <form onSubmit={onSubmit} className='createSpotForm' id='form'>
                <ul className='errors'>
                  {errors.map((error, idx) => (
                    <li key={idx}> <i className='fa fa-exclamation-circle' /> {error}</li>
                    ))}
                </ul>
                <label className='createInputContainer'>
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
                    <label for='file-upload' className='spot-upload-label'>
                        Spot Image :
                        <input
                            id='file-upload'
                            type="file"
                            onChange={updateFile} />
                    </label>
                </label>
                <div className='createbuttContainer'>
                    <button id='postNewSpot'>Post</button>
                    {/* <button id='testCreateSpot' onClick={testCreate}>Testing</button> */}
                </div>
            </form>
    )
}

export default CreateSpot
