import React, { useState } from 'react';
import AdjustOutlinedIcon from '@material-ui/icons/AdjustOutlined';

import './SidebarMenuItem.css'

function SidebarMenuItem({ item }) {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);
  const handleOnMouseEnter = () => { setSubnav(true) }
  const handleOnMouseLeave = () => { setSubnav(false) }
  return (
    <div className="sidebarmenu"
      onClick={item.subNav && showSubnav}
      onMouseEnter={item.subNav && handleOnMouseEnter}
      onMouseLeave={item.subNav && handleOnMouseLeave}>

      <div className='item'>
        <span className="itemIcon">{subnav ? item.iconHover : item.icon}</span>
        <p className={subnav? "itemTitleHover" : "itemTitle"}>{item.title}</p>
      </div>

      <div className='subItem'>
        {subnav ?
          item.subNav.map((item, index) => {
            return (
              <div className="sidebarmenuitem" key={index}>
                {item.title == 'Pending' ? <AdjustOutlinedIcon fontSize="small" style={{ fill: "#FFB946" }} /> : ""}
                {item.title == 'Confirmed' ? <AdjustOutlinedIcon fontSize="small" style={{ fill: "#2ED47A" }} /> : ""}
                {item.title == 'Accounting' ? <AdjustOutlinedIcon fontSize="small" style={{ fill: "#F7685B" }} /> : ""}
                {item.title == 'Warehouse' ? <AdjustOutlinedIcon fontSize="small" style={{ fill: "#1C0705" }} /> : ""}
                {item.title == 'Ordering' ? <AdjustOutlinedIcon fontSize="small" style={{ fill: "#2ED47A" }} /> : ""}
                {item.title == 'Admins' ? <AdjustOutlinedIcon fontSize="small" style={{ fill: "#885AF8" }} /> : ""}
                {item.title == 'Customers' ? <AdjustOutlinedIcon fontSize="small" style={{ fill: "#FFB946" }} /> : ""}
                {item.title == 'All Requests' ? <AdjustOutlinedIcon fontSize="small" style={{ fill: "transparent" }} /> : ""}
                {item.title == 'All Orders' ? <AdjustOutlinedIcon fontSize="small" style={{ fill: "transparent" }} /> : ""}
                <a herf='#' className="sidebarmenuitemtitle">{item.title}</a>
              </div>
            );
          }) : ""}
      </div>
    </div>
  );
}

export default SidebarMenuItem;
