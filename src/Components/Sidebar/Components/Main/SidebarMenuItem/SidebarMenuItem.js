import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import  './SidebarMenuItem.css'
import DashBoardIcon from '../../../../../Assets/icon/menu/dashboard.svg';
const Container = styled.div`
    width: 100%;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    transition: 0.2s all ease-in-out;
    &:hover {
        background-color: rgba(0,0,0,0.1);
    }
`


const Title = styled.p`
    font-size: 13px;
    color: ${props => props.active ? props.theme.activeMenu : "#AAA5A5"};
`
const SidebarLabel = styled.p`
  margin-left: 16px;
  font-size: 13px;
`;
  
const DropdownLink = styled.div`
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;
  
  &:hover {
    background: green;
    cursor: pointer;
  }`;

function SidebarMenuItem({ item}) {
    const [subnav, setSubnav] = useState(false);
    const showSubnav = () => setSubnav(!subnav);
    return (
    <div className="sidebarmenu" onClick={item.subNav && showSubnav}>
       {/* <Span active={active} className="iconify" data-inline="false" data-icon={`mdi-light:${icon}`}></Span> */}
       <div className='item'>
           
            <img src={DashBoardIcon}></img>
            
            <p className="itemTitle">{item.title}</p>
       </div>
       
       
       {subnav ?
       item.subNav.map((item, index) => {
          return (
              
            <div className="sidebarmenuitem" key={index}>
              <p className="sidebarmenuitemtitle">{item.title}</p>
            </div>
          );
        }) : "" }
    </div>
    );
}

export default SidebarMenuItem;