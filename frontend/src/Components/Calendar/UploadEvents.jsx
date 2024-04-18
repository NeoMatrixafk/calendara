//React imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import axios from "axios";

const UploadEvents = (props) => {
    //Hooks
    const navigate = useNavigate();

    //States
    const [csvFile, setCsvFile] = useState(null);
    const [excelFile, setExcelFile] = useState(null);
    const [csvUploaded, setCsvUploaded] = useState(false);
    const [excelUploaded, setExcelUploaded] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [events, setEvents] = useState([]);

    const email = localStorage.getItem("email");

    const handleCsvDownload = () => {
        const downloadLink = document.createElement("a");
        downloadLink.href =
            process.env.PUBLIC_URL + "/Templates/csv_template.csv";
        downloadLink.download = "csv_template.csv";
        downloadLink.click();
    };

    const handleXlsxDownload = () => {
        const downloadLink = document.createElement("a");
        downloadLink.href =
            process.env.PUBLIC_URL + "/Templates/xlsx_template.xlsx";
        downloadLink.download = "xlsx_template.xlsx";
        downloadLink.click();
    };

    const handleCSVChange = (e) => {
        setCsvFile(e.target.files[0]);
    };

    const handleExcelChange = (e) => {
        setExcelFile(e.target.files[0]);
    };

    const fetchEvents = async () => {
        try {
            const response = await axios.get(
                `http://localhost:55555/api/events/uploaded/${email}`
            );
            setEvents(response.data);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const handleCsvUpload = async () => {
        if (!csvFile) {
            alert("Please select a CSV file.");
            return;
        }

        const formData = new FormData();
        formData.append("csvFile", csvFile);

        try {
            // Upload the CSV file to the server
            await axios.post(
                `http://localhost:55555/api/uploadcsv/${email}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            // Fetch events after successful upload
            await fetchEvents();

            // Show modal after successful upload
            setShowModal(true);
            setCsvUploaded(true); // Set upload status to true after successful upload
            setCsvFile(null); // Reset file input
        } catch (error) {
            if (error.response && error.response.data && error.response.data.invalidEvents) {
                const invalidEvents = error.response.data.invalidEvents;
                invalidEvents.forEach((invalidEvent) => {
                    window.alert(`Invalid date format for event: ${invalidEvent.title}`);
                });
            } else {
                // If no invalidEvents found in the response, show generic error message
                window.alert("Error uploading CSV file. Please try again.");
            }
    
            // Log the error
            console.error("Error uploading CSV file:", error);

            // Fetch events even if upload fails to update the UI
            await fetchEvents();

            // Show the modal regardless of upload success or failure
            setShowModal(true);
            setCsvUploaded(true); // Set upload status to true after successful upload
            setCsvFile(null); // Reset file input
        }
    };

    const handleXlsxUpload = async () => {
        if (!excelFile) {
            alert("Please select a Excel file.");
            return;
        }

        const formData = new FormData();
        formData.append("excelFile", excelFile);

        try {
            // Upload the Excel file to the server
            await axios.post(
                `http://localhost:55555/api/uploadxlsx/${email}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            // Fetch events after successful upload
            await fetchEvents();

            // Show modal after successful upload
            setShowModal(true);
            setExcelUploaded(true); // Set upload status to true after successful upload
            setExcelFile(null); // Reset file input
            } catch (error) {
                if (error.response && error.response.data && error.response.data.invalidEvents) {
                    const invalidEvents = error.response.data.invalidEvents;
                    invalidEvents.forEach((invalidEvent) => {
                        window.alert(`Invalid date format for event: ${invalidEvent.title}`);
                    });
                } else {
                    // If no invalidEvents found in the response, show generic error message
                    window.alert("Error uploading XLSX file. Please try again.");
                }
        
                // Log the error
                console.error("Error uploading XLSX file:", error);
    
                // Fetch events even if upload fails to update the UI
                await fetchEvents();
    
                // Show the modal regardless of upload success or failure
                setShowModal(true);
                setExcelUploaded(true); // Set upload status to true after successful upload
                setExcelFile(null); // Reset file input
            }
        };

    const handleHideModal = async () => {
        try {
            await axios.delete("http://localhost:55555/api/events/deleteUploaded");
            setCsvFile(null);
            setExcelFile(null);
            setEvents([]);
            setShowModal(false);
        } catch (error) {
            console.error("Error deleting uploaded events:", error);
        }
    };

    const handleUploadButtonClick = async () => {
        // Update the 'uploaded' field for each event
        try {
            await Promise.all(
                events.map(async (event) => {
                    await axios.put(
                        `http://localhost:55555/api/events/${event._id}/update`,
                        { uploaded: false }
                    );
                })
            );
        } catch (error) {
            console.error("Error updating uploaded status for events:", error);
        }
    
        setShowModal(false);
        alert("CSV/XLSX file uploaded and Events are created!");
        navigate("/events2");
    };

    return (
        <>
            <div className="container my-5">
                <h1
                    className={`text-${
                        props.mode === "light" ? "black" : "white"
                    }`}
                >
                    Upload Events
                </h1>
                <p
                    className={`text-${
                        props.mode === "light" ? "black" : "white"
                    }`}
                >
                    Note: We accept only .csv or .xlsx formats only (as of now)
                </p>
                <p
                    className={`text-${
                        props.mode === "light" ? "black" : "white"
                    }`}
                >
                    Download Template(s):
                </p>

                <button
                    onClick={handleCsvDownload}
                    className="btn btn-info me-1"
                >
                    Download .csv template
                </button>
                <button
                    onClick={handleXlsxDownload}
                    className="btn btn-info ms-1"
                >
                    Download .xlsx template
                </button>
            </div>
            <div className="container my-5 input-field w-50">
                <input
                    className={`form-control ${
                        props.mode === "light" ? "" : "border-secondary"
                    }`}
                    style={{
                        backgroundColor:
                            props.mode === "light" ? "" : "#4d4d4d",
                        WebkitTextFillColor:
                            props.mode === "light" ? "" : "#e6e6e6",
                    }}
                    type="file"
                    accept=".csv"
                    onChange={handleCSVChange}
                    required
                />
                <button
                    type="submit"
                    className="btn btn-success btn-lg mt-3 profile-btn"
                    onClick={handleCsvUpload}
                    disabled={csvUploaded} // Disable the button if CSV is already uploaded
                >
                    {csvUploaded ? "CSV Uploaded" : "Upload .csv"}
                </button>
            </div>
            <div
                className="container mb-5 input-field w-50"
                style={{ marginTop: "7rem" }}
            >
                <input
                    className={`form-control ${
                        props.mode === "light" ? "" : "border-secondary"
                    }`}
                    style={{
                        backgroundColor:
                            props.mode === "light" ? "" : "#4d4d4d",
                        WebkitTextFillColor:
                            props.mode === "light" ? "" : "#e6e6e6",
                    }}
                    type="file"
                    accept=".xlsx"
                    onChange={handleExcelChange}
                    required
                />
                <button
                    type="submit"
                    className="btn btn-success btn-lg mt-3 profile-btn"
                    onClick={handleXlsxUpload}
                    disabled={excelUploaded} // Disable the button if Excel is already uploaded
                >
                    {excelUploaded ? "Excel Uploaded" : "Upload .xlsx"}
                </button>
            </div>
            <Modal show={showModal} onHide={() => handleHideModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>Uploaded Events</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {events.length > 0 ? (
                        <ul>
                            {events.map((event, index) => (
                                <li key={index}>
                                    <h3>{event.title}</h3>
                                    <p>
                                        <strong>Description:</strong>{" "}
                                        {event.describe}
                                    </p>
                                    <p>
                                        <strong>Start:</strong>{" "}
                                        {new Date(event.start).toLocaleString()}
                                    </p>
                                    <p>
                                        <strong>End:</strong>{" "}
                                        {new Date(event.end).toLocaleString()}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No events uploaded yet.</p>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <button
                        className="btn btn-primary"
                        onClick={handleUploadButtonClick}
                    >
                        Upload
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UploadEvents;
