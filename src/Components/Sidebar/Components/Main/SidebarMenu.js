import React, { useState } from 'react';
import './SidebarMenu.css'
import SidebarMenuItem from './SidebarMenuItem/SidebarMenuItem.js';
import PowerSettingsNewOutlinedIcon from '@material-ui/icons/PowerSettingsNewOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import { SidebarData } from './SidebarData.js';
function SidebarMenu() {
  const [mouseOverSettings, setMouseOverSettings] = useState(false);
  const [mouseOverLogout, setMouseOverLogout] = useState(false);
  const handleOnMouseEnterSettingsDiv = () => { setMouseOverSettings(true) }
  const handleOnMouseLeaveSettingsDiv = () => { setMouseOverSettings(false) }
  const handleOnMouseEnterLogoutDiv = () => { setMouseOverLogout(true) }
  const handleOnMouseLeaveLogoutDiv = () => { setMouseOverLogout(false) }
  return (
    <div className="container">
      {SidebarData.map((item, index) => {
        return <SidebarMenuItem item={item} key={index} />;
      })}
      <div
        className="settingsDiv"
        onMouseEnter={handleOnMouseEnterSettingsDiv}
        onMouseLeave={handleOnMouseLeaveSettingsDiv} >
        {mouseOverSettings ?
          <span className="itemIcon"> <MoreHorizOutlinedIcon fontSize="small" style={{ fill: "black" }} /></span> :
          <span className="itemIcon"> <MoreHorizOutlinedIcon fontSize="small" style={{ fill: "grey" }} /></span>}
        <p className={mouseOverSettings ? "itemTitleHover" : "itemTitle"}>Settings</p>
      </div>
      <div
        className="logoutDiv"
        onMouseEnter={handleOnMouseEnterLogoutDiv}
        onMouseLeave={handleOnMouseLeaveLogoutDiv} >
        {mouseOverLogout ?
          <span className="itemIcon"><PowerSettingsNewOutlinedIcon fontSize="small" style={{ fill: "black" }} /></span> :
          <span className="itemIcon"><PowerSettingsNewOutlinedIcon fontSize="small" style={{ fill: "grey" }} /></span>}
        <p className={mouseOverLogout ? "itemTitleHover" : "itemTitle"}>logout</p>
      </div>
    </div>
  );
}

export default SidebarMenu;
