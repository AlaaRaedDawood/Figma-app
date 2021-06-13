import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar' ;
import './Dashboard.css'
import MainTable from '../../Components/Main/Table.js'
import axios from 'axios'


function Dashboard() {
  const [requests,setRequests] = useState([]);


  const fetchRequets = async () => {
    try{
      const response =  await axios.get('https://o53hpo7bf9.execute-api.us-west-2.amazonaws.com/dev/orders');
      console.log("helloo" + response.data);
      setRequests(response.data.orders);
    }
    catch(error){
      setRequests([]);
    }

  }
  useEffect(() => {
    fetchRequets()
  }, [])

  const handleFiltering = (filterRows) => {
    if(filterRows){
      let newFilteredRows = []
       requests.map((row) => {
          if((row.total >= 2000) && (row.total <= 3000) ){
            newFilteredRows.push(row);
          }
       })

       setRequests(newFilteredRows);
    }
    else{
      fetchRequets()
    } ;
  }


  // axios({
  //   method: 'get',
  //   url: 'https://o53hpo7bf9.execute-api.us-west-2.amazonaws.com/dev/orders',
  // }).then((response) => {
  //   console.log("aaaaaaaaaaaaa");
  //   console.log(response.data.orders);
  //   setEvents(response.data.orders);

  // });


  return (
    <div className='dashboardnav'>
        <Sidebar></Sidebar>

        <MainTable rows={requests} filterFunction={handleFiltering}></MainTable>
    </div>
  );
}

export default Dashboard;
