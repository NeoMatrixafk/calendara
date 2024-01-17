import React, { useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";

const UploadData = (props) => {
    const [data, setData] = useState([]);

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

                // Assuming there is only one sheet in the Excel file
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                // Convert sheet data to JSON format
                const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                setData(jsonData);
            };
            reader.readAsArrayBuffer(file);
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
                    Upload Data
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
                    .xles file
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
        </>
    );
};

export default UploadData;
