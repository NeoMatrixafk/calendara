import React, { useState } from "react";
import { addEventApi } from "../../Redux/actions";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

const UploadEvents = (props) => {
    const navigate = useNavigate();

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

    const [csvFile, setCsvFile] = useState(null);
    const [excelFile, setExcelFile] = useState(null);

    const userName = localStorage.getItem("userName");

    const handleCSVChange = (e) => {
        setCsvFile(e.target.files[0]);
    };

    const handleExcelChange = (e) => {
        setExcelFile(e.target.files[0]);
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
            const uploadResponse = await axios.post(
                `http://localhost:55555/api/uploadcsv/${userName}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            // Log the response from the server (API calls completion message)
            console.log(uploadResponse.data);

            // Optionally, you can handle the response or provide user feedback
            alert("CSV file uploaded and Events are created!");
            navigate("/events");
        } catch (error) {
            console.error("Error uploading CSV file:", error.response.data);
            // Handle the error as needed
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
            const uploadResponse = await axios.post(
                `http://localhost:55555/api/uploadxlsx/${userName}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            // Log the response from the server (API calls completion message)
            console.log(uploadResponse.data);

            // Optionally, you can handle the response or provide user feedback
            alert("XLSX file uploaded and Events are created!");
            navigate("/events");
        } catch (error) {
            console.error("Error uploading XLSX file:", error.response.data);
            // Handle the error as needed
        }
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
            <div className="container my-5" style={{ width: "50%" }}>
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
                    className="btn btn-success btn-lg mt-3"
                    onClick={handleCsvUpload}
                >
                    Upload .csv
                </button>
            </div>
            <div
                className="container mb-5"
                style={{ width: "50%", marginTop: "7rem" }}
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
                    className="btn btn-success btn-lg mt-3"
                    onClick={handleXlsxUpload}
                >
                    Upload .xlsx
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
