import axios from "axios";

export const customUrl = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_LINK}/api/v1`,
});
