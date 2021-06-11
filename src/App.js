import './App.css';
import axios  from 'axios'; 
import React, { useEffect, useState } from 'react';
import Dashboard from './Container/Dasboard/Dashboard.js'
function App() {
  const [events, setEvents] = useState([])
  const getEvents = async () => {
    try {
      
      axios({
        method: 'get',
        url: 'https://o53hpo7bf9.execute-api.us-west-2.amazonaws.com/dev/orders',
      }).then((response) => {
        console.log("aaaaaaaaaaaaa");
        console.log(response.data.orders);
        setEvents(response.data.orders);

      });
    } catch (error) {
        console.log(error);
    }

};
useEffect(() => {
  getEvents()
}, [])
  return (
    <div className="App">
      <h1>hello</h1>
      {/* {events ? events.map(event => (
                    < li key={event._id} >
                        
                        <strong>{event.created_at}</strong>
                        
                        <span>Event Description: {event.customer.email}</span>
                       
                    </li>
      )): "" } */}
      <Dashboard></Dashboard>
    </div>
  );
}

export default App;
