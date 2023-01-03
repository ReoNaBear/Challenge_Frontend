import { apiHelper } from "../utils/helpers";
const getToken = () => localStorage.getItem("token");
export default {
  getQRcode() {
    return apiHelper.get("/admins/qrcode", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
};
