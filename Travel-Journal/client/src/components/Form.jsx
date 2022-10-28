import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const Form = () => {

    // const [data, setData] = React.useState({
    //     placeName: '',
    //     countryName: '',
    //     imageURL: '',
    //     fromDate: '',
    //     toDate: '',
    //     description: '',
    //     mapURL: ''
    // })

    const [placeName, setPlaceName] = React.useState('')
    const [countryName, setCountryName] = React.useState('')
    const [imageUrl, setImageUrl] = React.useState('')
    const [fromDate, setFromDate] = React.useState('')
    const [toDate, setToDate] = React.useState('')
    const [description, setDescription] = React.useState('')
    // const [mapUrl, setMapUrl] = React.useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()
        const data = {placeName, countryName, description, fromDate, toDate, imageUrl}
        const response = await fetch('http://localhost:5000/api/place/add', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })

        if(response.ok){
            setPlaceName('')
            setCountryName('')
            setDescription('')
            setFromDate('')
            setToDate('')
            setImageUrl('')
            // setMapUrl('')
        }
    }


  return (
    <>
        <Navbar />
        <div className='flex justify-center items-center pt-[10%] flex-col'>
            <div>
                <form className='flex flex-col gap-3 border-4 w-[30vw] p-8 border-[#F55A5A]' onSubmit={handleSubmit}>
                    <label>
                        Name of Place
                        <input 
                        type='text'
                        placeholder='Enter place name'
                        name='placeName'
                        value={placeName}
                        onChange = {(e) => setPlaceName(e.target.value)}
                        className='w-full border-2 border-[#F55A5A]'
                    />
                    </label>
                    <label>
                        Country Name
                        <input 
                        type='text'
                        placeholder='Enter country name'
                        name='countryName'
                        value={countryName}
                        onChange = {(e) => setCountryName(e.target.value)}
                        className='w-full border-2 border-[#F55A5A]'
                    />
                    </label>
                    <label>
                        Description
                        <input 
                        type='text'
                        placeholder='Enter description'
                        name='description'
                        value={description}
                        onChange = {(e) => setDescription(e.target.value)}
                        className='w-full border-2 border-[#F55A5A]'
                    />
                    </label>
                    <label>
                        Arrival Date
                        <input 
                        type='text'
                        placeholder='Enter the arrival date'
                        name='fromDate'
                        value={fromDate}
                        onChange = {(e) => setFromDate(e.target.value)}
                        className='w-full border-2 border-[#F55A5A]'
                    />
                    </label>
                    <label>
                        Departure Date
                        <input 
                        type='text'
                        placeholder='Enter the date of departure'
                        name='toDate'
                        value={toDate}
                        onChange = {(e) => setToDate(e.target.value)}
                        className='w-full border-2 border-[#F55A5A]'
                    />
                    </label>
                    <label>
                        Image URL
                        <input 
                        type='text'
                        placeholder='Enter an image url'
                        name='imageUrl'
                        value={imageUrl}
                        onChange = {(e) => setImageUrl(e.target.value)}
                        className='w-full border-2 border-[#F55A5A]'
                    />
                    </label>
                    {/* <label>
                        Google maps URL
                        <input 
                        type='text'
                        placeholder='Enter google maps url'
                        name='mapUrl'
                        value={mapUrl}
                        onChange = {(e) => setMapUrl(e.target.value)}
                        className='w-full border-2 border-[#F55A5A]'
                    />
                    </label> */}
                    <button type="submit" className='bg-[#F55A5a] text-xl text-white'>Submit</button>
                </form>
            </div>
            <Link to='/'>
                <button className='bg-[#F55A5a] m-4 text-white rounded text-xl w-[13vw]'>Back to homepage</button>
            </Link>
        </div>
    </>
  )
}

export default Form