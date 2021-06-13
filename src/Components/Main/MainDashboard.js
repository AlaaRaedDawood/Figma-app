import React, { useEffect, useState } from 'react';
import './MainTable.css'
import axios  from 'axios';
import MainTable from './Table';
import React, { useEffect, useState, Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

function MainDashboard() {
  const [requests,setRequests] = useState([]);
  const fetchRequets = async () => {
    try{
      const response =  await axios.get('https://o53hpo7bf9.execute-api.us-west-2.amazonaws.com/dev/orders');
      console.log(response.data.orders);
      setEvents(response.data.orders);
    }
    catch(error){
      setRequests([]);
    }

  }
  useEffect(() => {
    fetchRequets()
  }, [])
  // axios({
  //   method: 'get',
  //   url: 'https://o53hpo7bf9.execute-api.us-west-2.amazonaws.com/dev/orders',
  // }).then((response) => {
  //   console.log("aaaaaaaaaaaaa");
  //   console.log(response.data.orders);
  //   setEvents(response.data.orders);

  // });

  return (
    <div className='sidenav'>

    {/* <MainTable requests={requests}></MainTable> */}

    </div>
  );
}

export default MainDashboard;
