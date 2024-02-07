import React, { useState, useEffect } from "react";
import axios from "axios";

function EventList() {
  const [events, setEvents] = useState([]);
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    // Fetch events from backend when component mounts
    async function fetchEvents() {
      try {
        const response = await axios.get(`http://localhost:55555/api/reminders/${userName}`);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchEvents();
  }, [userName]); // Run this effect only once when the component mounts

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h2>{event.title}</h2>
            <p><strong>Start:</strong> {new Date(event.start).toLocaleString()}</p>
            <p><strong>End:</strong> {new Date(event.end).toLocaleString()}</p>
            <p><strong>Description:</strong> {event.describe}</p>  
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
