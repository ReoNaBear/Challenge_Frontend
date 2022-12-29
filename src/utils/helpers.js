import axios from "axios";
import Swal from "sweetalert2";

const baseURL = "http://localhost:3000/api/";

export const apiHelper = axios.create({
  baseURL,
});
export const Toast = Swal.mixin({
  target: "#custom-target",
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});
