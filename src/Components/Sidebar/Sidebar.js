import React, { useEffect, useState } from 'react';
import './Sidebar.css'
import SidebarMenu from './Components/Main/SidebarMenu'
import Profile from './Components/Profile/profile.js'
function Sidebar() {

  return (
    <div className='sidenav'>
      <h1>hello11</h1>
      <Profile></Profile>
      <SidebarMenu></SidebarMenu>

    </div>
  );
}

export default Sidebar;
