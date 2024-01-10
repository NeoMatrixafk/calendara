import axios from "axios";

export const event = axios.create({
    baseURL: "http://localhost:5000/api/events"
  });

