import React from 'react'
import './Pages.css'
import SideNav from '../Components/SideNav/SideNav'
import ChatArea from '../Components/ChatArea/ChatArea'
const Home = () => {
  return (
    <div className='Homepg'>
      <SideNav/>
      <ChatArea/>
    </div>
  )
}

export default Home
