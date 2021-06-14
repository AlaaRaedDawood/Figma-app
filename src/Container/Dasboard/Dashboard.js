import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './Dashboard.css'
import MainTable from '../../Components/Main/Table.js'
import axios from 'axios'


function Dashboard() {
  const [requests, setRequests] = useState([]);
  const [allrequests, setAllRequests] = useState([]);
  const [selectedElements, setSelectedElements] = useState({});


  const fetchRequets = async () => {
    try {
      const response = await axios.get('https://o53hpo7bf9.execute-api.us-west-2.amazonaws.com/dev/orders');
      console.log("helloo" + response.data);
      setRequests(response.data.orders);
      setAllRequests(response.data.orders);
      createSelectedElements(response.data.orders);

    }
    catch (error) {
      setRequests([]);
      createSelectedElements([]);
    }

  }

  useEffect(() => {
    fetchRequets()
  }, [])

  const setSelectedItem = (itemID) => {
    let flag = ! selectedElements[itemID] ;
    setSelectedElements({ ...selectedElements, [itemID]: flag });
    console.log( itemID + " ====  " + flag );

  }
  const createSelectedElements = (requestItems) => {
    console.log('item ' + requestItems.length);
    const newSelectedElements = {} ;
    requestItems.map(requestrequestItem => {
      console.log('item 222222 ' + requestrequestItem.id);
      newSelectedElements[requestrequestItem.id] = false ;


    })
    setSelectedElements(newSelectedElements);
    console.log('item 1111111111 ' + newSelectedElements[1]);

  }

  //searchRows
  const handleSearchChange = (name) => {
    if (name) {
      let newRows = []
      allrequests.map((row) => {
        const currentName = (row.customer.fname + " " + row.customer.lname).toLowerCase() ;
        if (currentName.includes(name)) {
          newRows.push(row);
        }
      })

      setRequests(newRows);
    }
    else {
      fetchRequets()
    };
  }
  //filterRows
  const handleFiltering = (filterRows) => {
    if (filterRows) {
      let newFilteredRows = []
      requests.map((row) => {
        if ((row.total >= 2000) && (row.total <= 3000)) {
          newFilteredRows.push(row);
        }
      })

      setRequests(newFilteredRows);
    }
    else {
      fetchRequets()
    };
  }






  return (
    <div className='dashboardnav'>
      <Sidebar></Sidebar>

      <MainTable
      rows={requests}
      filterFunction={handleFiltering}
      selectedElements={selectedElements}
      setSelectedItem={setSelectedItem}
      setSearchChange={handleSearchChange} />
    </div>
  );
}

export default Dashboard;
