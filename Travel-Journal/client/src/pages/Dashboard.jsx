import React from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Place from '../components/Place'

const Dashboard = () => {

  const [data,setData] = React.useState([])

  React.useEffect(() => {
    const getData = async() => {
      const response = await axios.get('http://localhost:5000/api/place/')
      setData(response.data)
    }
    getData()
  }, [])

  const placeData = data.map(entry => {
    return <Place 
              placeName = {entry.placeName} 
              countryName={entry.countryName}
              fromDate = {entry.fromDate}
              toDate = {entry.toDate}
              description = {entry.description}
              imageUrl={entry.imageUrl}
              mapUrl={entry.mapUrl}
            />
  })

  return (
    <>
        <Navbar />
        {placeData}
    </>
  )
}

export default Dashboard