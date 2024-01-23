import React, { useState } from "react";
import { addEventApi } from "../../Redux/actions";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

const UploadEvents = (props) => {

    const navigate = useNavigate();

    const [csvFile, setCsvFile] = useState(null);

    const userName = localStorage.getItem("userName");

    const handleFileChange = (e) => { 
        setCsvFile(e.target.files[0]);
    };

    const handleCreate = async () => {
        if (!csvFile) {
          alert('Please select a CSV file.');
          return;
        }
    
        const formData = new FormData();
        formData.append('csvFile', csvFile);
    
        try {
          // Upload the CSV file to the server
          const uploadResponse = await axios.post(`http://localhost:55555/api/uploadEvents/${userName}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          // Log the response from the server (API calls completion message)
          console.log(uploadResponse.data);
    
          // Optionally, you can handle the response or provide user feedback
          alert('CSV file uploaded and Events are created!');
          navigate("/events");
        } catch (error) {
            console.error('Error uploading CSV file:', error.response.data);
          // Handle the error as needed
        }

}

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
            </div>
            <div className="container mb-5">
                <input 
                    type="file" 
                    accept=".csv" 
                    onChange={handleFileChange} />
                <button
                    type="submit"
                    className="btn btn-success btn-lg"
                    onClick={handleCreate}
                >
                    Create
                </button>
            </div>
        </>
    );
};

function mapStateToProps({ event, error }) {
    return {
        error,
        // event
    };
}

export default connect(mapStateToProps, (dispatch) => ({
    addEventApi: (values) => addEventApi(values)(dispatch),
}))(UploadEvents);
 