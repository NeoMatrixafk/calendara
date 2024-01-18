import React, { useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { addEventApi } from "../../Redux/actions";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const UploadEvents = (props) => {
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    const [userName] = useState(localStorage.getItem("userName") || "");

    const startdate = "2024-01-20";
    const enddate = "2024-01-21";
    const userColor = "#FF6900";

    const handleCsvFileUpload = (e) => {
        const file = e.target.files[0];
        Papa.parse(file, {
            header: true,
            complete: (results) => {
                setData(results.data);
            },
        });
    };

    const handleXlsxFileUpload = (e) => {
        const file = e.target.files[0];

        if (file && file.name.endsWith(".xlsx")) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: "array" });

                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                setData(jsonData);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const onSubmit = async () => {
        const values = {
            admin: userName,
            title: "Upload",
            start: `${startdate}T09:30:00.000+00:00`,
            end: `${enddate}T14:30:00.000+00:00`,
            describe: "",
            color: userColor || "#3174ad",
        };

        props.addEventApi(values)
            .then(() => {
                window.alert("Uploaded Events!");
                navigate("/events");
            })
            .catch((error) => {
                console.error("Error uploading events:", error);
            });
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
            </div>
            <div className="container">
                <label
                    htmlFor=""
                    className={`text-${
                        props.mode === "light" ? "black" : "white"
                    }`}
                >
                    .csv file
                </label>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleCsvFileUpload}
                    className="form-control w-25 my-3"
                    style={{
                        backgroundColor:
                            props.mode === "light" ? "" : "#4d4d4d",
                        WebkitTextFillColor:
                            props.mode === "light" ? "black" : "#e6e6e6",
                    }}
                />

                {data.length ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Gender</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.name}</td>
                                    <td>{row.gender}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : null}
            </div>
            <div className="container mb-5">
                <label
                    htmlFor=""
                    className={`text-${
                        props.mode === "light" ? "black" : "white"
                    }`}
                >
                    .xlsx file
                </label>
                <input
                    type="file"
                    accept=".xlsx"
                    onChange={handleXlsxFileUpload}
                    className="form-control w-25 my-3"
                    style={{
                        backgroundColor:
                            props.mode === "light" ? "" : "#4d4d4d",
                        WebkitTextFillColor:
                            props.mode === "light" ? "black" : "#e6e6e6",
                    }}
                />

                {data.length ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Gender</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    <td>{row[0]}</td>
                                    <td>{row[1]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : null}
            </div>
            <div className="container mb-5">
                <button
                    type="submit"
                    className="btn btn-success btn-lg"
                    onClick={onSubmit}
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
 