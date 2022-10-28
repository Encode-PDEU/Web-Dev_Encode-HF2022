import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './index.css'
import Navbar from './components/Navbar'
import Place from './components/Place'
import places from './data'
import Form from './components/Form'
import Dashboard from './pages/Dashboard'

const App = () => {
  const place = places.map(entry => 
  <Place 
    country={entry.country}
    name = {entry.name}
    date={entry.date}
    content={entry.content}
    img={entry.img} 
  />)
  return (
    <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/add' element={<Form />} />
    </Routes>
  )
}

export default App