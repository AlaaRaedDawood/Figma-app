import React, { useEffect, useState } from 'react';
import './Sidebar.css'
import SidebarMenu from './Components/Main/SidebarMenu'
import Profile from './Components/Profile/profile.js'
function Sidebar() {

  return (
    <div className='sidenav'>
      <p className='titleSideBar'>XO.</p>
      <Profile></Profile>
      <SidebarMenu></SidebarMenu>

    </div>
  );
}

export default Sidebar;
