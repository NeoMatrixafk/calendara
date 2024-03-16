import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import '../Calendar/calendar2.css';
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import moment from "moment";



const Calendar = () => {

  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { register, handleSubmit, control } = useForm();
  const [modalMode, setModalMode] = useState(null);
  const [defaultStartDate, setDefaultStartDate] = useState(null); // State variable for default start date
  const [defaultEndDate, setDefaultEndDate] = useState(null);


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
      const convertedEvents = response.data.map(event => ({
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end),
        id: event._id,
        describe: event.describe,
        color: event.color,
      }));
      
      // Set the fetched events to the state
      setEvents(convertedEvents);
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

    setDefaultStartDate(new Date(arg.startStr));
    setDefaultEndDate(new Date(arg.endStr));

    setSelectedEvent({
      title: "No Title",
      start: arg.startStr,
      end: arg.endStr,
      describe: ""
    });

    setModalMode("create");
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const handleEventClick = async (arg) => {
    try {
      const eventId = arg.event.id; // Assuming event id is available
      const response = await axios.get(`http://localhost:55555/api/events/${eventId}/show`);
      setSelectedEvent({
        ...response.data,
        start: moment(response.data.start).format("ddd DD MMM YY LT"),
        end: moment(response.data.end).format("ddd DD MMM YY LT")
      });
      setModalMode("view");
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      if (selectedEvent && selectedEvent._id) {
        // Ensure selectedEvent and its id are available
        const eventId = selectedEvent._id;
        await axios.delete(`http://localhost:55555/api/events/${eventId}/delete`);
        // Filter out the deleted event from the events array
        setEvents(events.filter(event => event.id !== eventId));
        // Close the modal after deletion
        handleCloseModal();
        window.alert("Event deleted successfully!");
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleCloseModal = () => {
          
    const filteredEvents = events.slice(0, events.length - 1); // Remove the last event 
    setEvents(filteredEvents);
    setSelectedEvent(null);
    setModalMode(null); // Reset modal mode

    setDefaultStartDate(null);
    setDefaultEndDate(null);
  };
  
  

  const handleCreateEvent = async (data) => {
    try {
      // Get the admin (userName) from localStorage
      const admin = localStorage.getItem("userName");
      const title = data.title || "No Title"
  
      // Prepare the event data
      const eventData = {
        admin: admin,
        title: title,
        start: defaultStartDate.toISOString(),
        end: defaultEndDate.toISOString(),
        describe: data.describe,
        // No need to include color here since it has a default value
      };
      // Send a POST request to your backend to create the event
      const response = await axios.post("http://localhost:55555/api/events", eventData);
  
      const newEvent = {
        title: response.data.title,
        start: new Date(response.data.start),
        end: new Date(response.data.end),
        id: response.data._id,
        describe: response.data.describe,
        color: response.data.color,
      };
      setEvents([...events, newEvent]);

      setModalMode("create");
      fetchEvents();
      handleCloseModal();

      // Handle success responses
      console.log("Event created successfully:", response.data);
      window.alert("Event created successfully!");
      navigate("/events2");
  
      // Additional logic if needed
    } catch (error) {
      // Handle error
      console.error("Error creating event:", error);
    }
  };

  const handleMoreOptions = () => {
    // Navigate to the '/add-event' route
    navigate('/add-event', { state: { defaultStartDate, defaultEndDate } });
  };

  return (
   
  <>

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
        eventClick={handleEventClick}

      />

{selectedEvent && modalMode === "view" && (
        <Modal show={selectedEvent !== null} onHide={handleCloseModal}>
          {/* Render your modal content here using selectedEvent */}
          {/* Example: */}
          <Modal.Header closeButton>
            <Modal.Title>{selectedEvent.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{selectedEvent.describe}</p>
            <p>From: {selectedEvent.start}</p>
            <p>To: {selectedEvent.end}</p>
            {/* Additional content and buttons */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleDeleteEvent}>Delete</Button>
          </Modal.Footer>
        </Modal>
      )}

{selectedEvent && modalMode === "create" &&(
  <Modal show={selectedEvent !== null} onHide={handleCloseModal}>
    {/* Render your modal content here using selectedEvent */}
    <Modal.Header closeButton>
      <Modal.Title>Add Event</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <form onSubmit={handleSubmit(handleCreateEvent)}>
      <div className="mb-4">
                            
          <label htmlFor="title" className={`form-label`}>
            Event Title
          </label>
          <input
            {...register("title")}
            type="text"
            placeholder="Title of your Event"
            className={`form-control`}
            id="title"
            autoComplete="off"
          />
        </div>

        <div className="mb-4" style={{ zIndex: "100" }}>
                                <label
                                    htmlFor="start"
                                    className={`form-label me-3`}
                                >
                                    Start Date:
                                </label>
                                <Controller
                                    control={control}
                                    name="start"
                                    render={({ field }) => (
                                        <DatePicker
                                            placeholderText="Select start date"
                                            onChange={(date) =>
                                                field.onChange(date)
                                            }
                                            selected={field.value || defaultStartDate}
                                            value={field.value || defaultStartDate}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            className={`form-control`}
                                            style={{
                                                WebkitTextFillColor: "white",
                                            }}
                                            id="start"
                                            autoComplete="off"
                                        />
                                    )}
                                />
                            </div>
                            <div className="mb-4" style={{ zIndex: "100" }}>
                                <label
                                    htmlFor="end"
                                    className={`form-label me-4`}
                                >
                                    End Date:
                                </label>
                                {/* end date controller*/}
                                <Controller
                                    control={control}
                                    name="end"
                                    render={({ field }) => (
                                        <DatePicker
                                            placeholderText="Select end date"
                                            onChange={(date) =>
                                                field.onChange(date)
                                            }
                                            selected={field.value || defaultEndDate}
                                            value={field.value || defaultEndDate}
                                            timeFormat="HH:mm"
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            showTimeSelect
                                            className={`form-control`}
                                            id="end"
                                            autoComplete="off"
                                        />
                                    )}
                                />
                            </div>

                      <div className="mb-4">
                                <label
                                    htmlFor="describe"
                                    className={`form-label`}
                                >
                                    Event Description{" "}
                                    <span className="text-danger small">
                                        (optional)
                                    </span>
                                </label>
                                <input
                                    {...register("describe")}
                                    type="text"
                                    placeholder="Describe your event"
                                    className={`form-control`}
                                    id="describe"
                                    aria-describedby="describe"
                                    autoComplete="off"
                                />
                            </div>

      </form>
    </Modal.Body>
    <Modal.Footer>
    <Button variant="primary" onClick={handleMoreOptions}>More Options</Button>
      <Button variant="success" onClick={handleSubmit(handleCreateEvent)}>Create</Button>
    </Modal.Footer>
  </Modal>
)}


    </div>

</>

  );
};

export default Calendar;
