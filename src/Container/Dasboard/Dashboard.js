import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './Dashboard.css'
import MainTable from '../../Components/MainDashBoardContent/Table.js'
import axios from 'axios'
import moment from 'moment'

function Dashboard() {
  const [requests, setRequests] = useState([]);
  const [allrequests, setAllRequests] = useState([]);
  const [selectedElements, setSelectedElements] = useState({});


  const fetchRequets = async () => {
    try {
      const response = await axios.get('https://o53hpo7bf9.execute-api.us-west-2.amazonaws.com/dev/orders');
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
    let flag = !selectedElements[itemID];
    setSelectedElements({ ...selectedElements, [itemID]: flag });

  }
  const getCountSelectedElements = () => {
    let count = 0;
    for (var element in selectedElements) {
      if (selectedElements[element]) {
        count += 1
      }
    }
    return count;

  }
  const createSelectedElements = (requestItems) => {
    const newSelectedElements = {};
    requestItems.map(requestrequestItem => {
      newSelectedElements[requestrequestItem.id] = false;


    })
    setSelectedElements(newSelectedElements);

  }

  //searchRows
  const handleSearchChange = (userInput, column) => {


    if (column && (column !== 'name')) {

      if (userInput) {
        let newRows = []
        allrequests.map((row) => {
          const currentInput = column == 'date' ? (moment(row[column]).format("MMMM D,h:mma,YYYY") + " ").toLowerCase() : (row[column] + " ").toLowerCase();
          if (currentInput.includes(userInput)) {
            newRows.push(row);
          }
        })

        setRequests(newRows);
      }
    } else {
      handleSearchByName(userInput);
    }


  }
  //handle search by name
  const handleSearchByName = (userInput) => {
      if (userInput) {
        let newRows = []
        allrequests.map((row) => {
          const currentName = (row.customer.fname + " ").toLowerCase();
          if (currentName.includes(userInput)) {
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
  const addfilterOptions = (column, from, to) => {

  }
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

        addfilterOptions={addfilterOptions}
        filterFunction={handleFiltering}
        selectedElements={selectedElements}
        getCountSelectedElements={getCountSelectedElements}
        setSelectedItem={setSelectedItem}
        setSearchChange={handleSearchChange}
      />
    </div>
  );
}

export default Dashboard;
