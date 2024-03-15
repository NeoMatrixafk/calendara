import React, {useState, useEffect} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import '../Calendar/calendar2.css';
import axios from "axios";



const Calendar = () => {
  
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events for the logged-in user
    fetchEvents();
  }, []); // Runs only once on component mount

  const fetchEvents = async () => {
    try {
      // Retrieve the username from local storage
      const userName = localStorage.getItem('userName');

      // Fetch events for the specific user from the backend
      const response = await axios.get(`http://localhost:55555/api/events/${userName}`);
      
      // Set the fetched events to the state
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDateSelect = (arg) => {

    const newEvent = {
      title: 'No Title',
      start: arg.startStr,
      end: arg.endStr,
      allDay: arg.allDay
    };

    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (

    <div>

      <FullCalendar

        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, multiMonthPlugin]}
        //Properties
        initialView={"dayGridMonth"}
        themeSystem="standard"
        height={"100vh"}
        selectable="true"
        selectMirror="true"
        eventMaxStack={2}
        dayMaxEvents="true"
        dayMaxEventRows={3}
        editable={true}
        navLinks="true"
        eventResizableFromStart={true}
        nowIndicator="true"

        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay,multiMonthYear,listMonth"
        }}

        views={{
          dayGridMonth: {
            titleFormat: { month: 'long', year: 'numeric' },
          },
          timeGridWeek: {
            titleFormat: { month: 'long', year: 'numeric' },
          },
        }}

        buttonText={{

          today: "Today",
          month: "Month",
          week: "Week",
          day: "Day",
          multiMonthYear: "Year",
          listMonth: "Schedule"

        }}

        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: 'short'
        }}
        
        events={events}
        select={handleDateSelect}

      />

    </div>
  );
};

export default Calendar;
