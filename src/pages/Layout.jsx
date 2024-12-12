import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'


const Layout = () => {

  const [search, setSearch] = useState('')


  return (
    <div>
      <Header search={search} setSearch={setSearch} />
   

      <Outlet context={{search, setSearch}}/>

      <Footer />

      
    </div>
  )
}

export default Layout
