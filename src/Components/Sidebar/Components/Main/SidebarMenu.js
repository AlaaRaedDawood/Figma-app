import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import SidebarMenuItem from './SidebarMenuItem/SidebarMenuItem.js';
import { SidebarData } from './SidebarData.js';
function SidebarMenu() {
    const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column ;
    align-items: center;
  `;


  return (
    <Container> 
      {SidebarData.map((item, index) => {
              return <SidebarMenuItem item={item} key={index} />;
      })}
    </Container>
  );
}

export default SidebarMenu;