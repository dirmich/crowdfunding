import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import CreateCampaign from './pages/CreateCampaign'
import Home from './pages/Home'
import Profile from './pages/Profile'
import CampaignDetails from './pages/CampaignDetails'

const App = () => {
  return <div className='relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row'>
    <div className='sm:flex hidden mr=10 relative'><Sidebar/></div>
    <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'><Navbar/>
    <div className='pl-5'>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/create-campaign' element={<CreateCampaign/>}/>
    <Route path='/campaign-details/:id' element={<CampaignDetails/>}/>
    </Routes>
    </div>
    </div>
  </div>
}

export default App
