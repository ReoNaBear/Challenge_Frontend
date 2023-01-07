import axios from "axios";

//const baseURL = "https://api.adams-bear.com/api/";
const baseURL = "http://localhost:3000/api/";

export const apiHelper = axios.create({
  baseURL,
});
