import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import axios from "axios";


// these are the values and color of activity section in the dashboard
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const Activity = (props) => {

    const [resolvedEvents, setResolvedEvents] = useState();
    localStorage.setItem("resolvedEventsCount", resolvedEvents);
    const [unresolvedEvents, setUnResolvedEvents] = useState();
    localStorage.setItem("unresolvedEventsCount", unresolvedEvents);

    const userName = localStorage.getItem("userName");

    useEffect(() => {
        const fetchTotalEventsData = async () => {
            try {
                const response = await axios.get(`http://localhost:55555/api/events/resolved/${userName}`);
                const events = response.data;
                setResolvedEvents(events.length);
            } catch (error) {
                console.error("Error fetching length of resolved events:", error);
            }
        };

        fetchTotalEventsData();
    }, [userName]);

    useEffect(() => {
        const fetchTotalEventsData = async () => {
            try {
                const response = await axios.get(`http://localhost:55555/api/events/unresolved/${userName}`);
                const events = response.data;
                setUnResolvedEvents(events.length);
            } catch (error) {
                console.error("Error fetching length of unresolved events:", error);
            }
        };

        fetchTotalEventsData();
    }, [userName]);

    const data = [
        { name: "Group A", value: resolvedEvents },
        { name: "Group B", value: unresolvedEvents },
    ];

    const COLORS = ["#00e600", "#ff0000"];

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                backgroundColor: "#007bff",
                                color: "white",
                                height: "4rem",
                                width: "4rem",
                                borderRadius: "2rem",
                            }}
                        >
                            <i className="bi bi-activity"></i>
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-center mt-3">
                        <p
                            className={`p-0 text-${
                                props.mode === "light" ? "black" : "white"
                            }`}
                        >
                            Activity - Current Month
                        </p>
                    </div>
                    <div className="col-12 p-0">
                        <PieChart width={306} height={400}>
                            <Pie
                                data={data}
                                cx={153}
                                cy={200}
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                        <div className="col-12 d-flex ps-5 mb-1">
                            <div
                                style={{
                                    height: "1.5rem",
                                    width: "1.5rem",
                                    backgroundColor: "#00e600",
                                }}
                            ></div>
                            <div className="ms-2">
                                <p
                                    className={`m-0 text-${
                                        props.mode === "light"
                                            ? "black"
                                            : "white"
                                    }`}
                                >
                                    : Resolved events
                                </p>
                            </div>
                        </div>
                        <div className="col-12 d-flex ps-5 my-3">
                            <div
                                style={{
                                    height: "1.5rem",
                                    width: "1.5rem",
                                    backgroundColor: "#ff0000",
                                }}
                            ></div>
                            <div className="ms-2">
                                <p
                                    className={`m-0 text-${
                                        props.mode === "light"
                                            ? "black"
                                            : "white"
                                    }`}
                                >
                                    : Unresolved events
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Activity;
