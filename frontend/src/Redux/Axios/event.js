import axios from "axios";

export const event = axios.create({
    baseURL: "http://localhost:55555/api/events"
  });

