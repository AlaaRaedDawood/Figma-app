import React, { useEffect, useState } from 'react';
import styled from 'styled-components'

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
    <Container onClick={item.subNav && showSubnav}>
       {/* <Span active={active} className="iconify" data-inline="false" data-icon={`mdi-light:${icon}`}></Span> */}
       <Title>{item.title}</Title>
       
       {subnav ?
       item.subNav.map((item, index) => {
          return (
            <DropdownLink  key={index}>
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        }) : "" }
    </Container>
    );
}

export default SidebarMenuItem;