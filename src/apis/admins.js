import { apiHelper } from "../utils/helpers";
const getToken = () => localStorage.getItem("token");
export default {
  getQRcode() {
    return apiHelper.get("/admins/qrcode", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  getUsers() {
    return apiHelper.get("/admins/users", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  updateBannedStatus(userId, status) {
    return apiHelper.put(
      "/admins/update_banned_status",
      {
        userId,
        status,
      },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
  },
  updatePunchStatus(userId, status, date) {
    return apiHelper.put(
      "/admins/update_punch_status",
      {
        userId,
        status,
        date,
      },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
  },
};
