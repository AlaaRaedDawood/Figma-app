import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import './SidebarMenu.css'
import SidebarMenuItem from './SidebarMenuItem/SidebarMenuItem.js';
import PowerSettingsNewOutlinedIcon from '@material-ui/icons/PowerSettingsNewOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import { SidebarData } from './SidebarData.js';
function SidebarMenu() {
  const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column ;
    align-items: center;
    margin-top: 10px;
  `;


  return (
    <Container>
      {SidebarData.map((item, index) => {
        return <SidebarMenuItem item={item} key={index} />;
      })}
      <hr className="breakLine"></hr>
      <div className="settingsDiv">
        <span className="itemIcon"> <MoreHorizOutlinedIcon fontSize="small" style={{ fill: "grey" }} /></span>
        <p className="itemTitle">Settings</p>
      </div>
      <div className="logoutDiv">
        <span className="itemIcon"><PowerSettingsNewOutlinedIcon fontSize="small" style={{ fill: "grey" }} /></span>
        <p className="itemTitle">logout</p>
      </div>
    </Container>
  );
}

export default SidebarMenu;
