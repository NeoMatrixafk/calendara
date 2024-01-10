import axios from "axios";

export const event = axios.create({
    baseURL: "http://localhost:3001/api/events"
  });

