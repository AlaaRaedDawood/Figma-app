import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './Dashboard.css'
import MainTable from '../../Components/Main/Table.js'
import axios from 'axios'


function Dashboard() {
  const [requests, setRequests] = useState([]);
  const [selectedElements, setSelectedElements] = useState({});


  const fetchRequets = async () => {
    try {
      const response = await axios.get('https://o53hpo7bf9.execute-api.us-west-2.amazonaws.com/dev/orders');
      console.log("helloo" + response.data);
      setRequests(response.data.orders);
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
    // console.log('hhhh ' +itemID);
    // let newSelectedElements = [] ;
    // selectedElements.map((selectedElement) => {


    //   if (selectedElement.id === itemID) {
    //     let flag = !selectedElement.selected ;
    //     let newItem = {"id" :selectedElement.id , "selected" : flag}
    //     newSelectedElements.push(newItem);
    //   }else{
    //     let newItem = {"id" :selectedElement.id , "selected" : selectedElement.selected}
    //     newSelectedElements.push(newItem);
    //   }

    // }
    let flag = ! selectedElements[itemID] ;
    setSelectedElements({ ...selectedElements, [itemID]: flag });
    console.log( itemID + " ====  " + flag );
  //}
    // )
    // setSelectedElements(newSelectedElements);
    // newSelectedElements.map((i) => {
    //   console.log('hhhh ' +i[id] );
    // })
  }
  const createSelectedElements = (requestItems) => {
    console.log('item ' + requestItems.length);

    // let newSelectedElement = [];
    // requestItems.map(requesrequestItem => {
    //   let item = { id :  false };
    //   newSelectedElement.push(item);
    //   console.log('item');
    // })

    //setSelectedElements(newSelectedElement);
    const newSelectedElements = {} ;
    requestItems.map(requestrequestItem => {
      console.log('item 222222 ' + requestrequestItem.id);
      newSelectedElements[requestrequestItem.id] = false ;


    })
    setSelectedElements(newSelectedElements);
    console.log('item 1111111111 ' + newSelectedElements[1]);

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

      <MainTable rows={requests} filterFunction={handleFiltering} selectedElements={selectedElements} setSelectedItem={setSelectedItem}></MainTable>
    </div>
  );
}

export default Dashboard;
