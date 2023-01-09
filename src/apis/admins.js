import { apiHelper } from "../utils/helpers";
const getToken = () => localStorage.getItem("token");
export default {
  getQRcode() {
    return apiHelper.get("/admin/qrcode", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  getUsers() {
    return apiHelper.get("/admin/users", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  getMonthRecord(userId) {
    return apiHelper.post(
      "/admin/month_record",
      { userId },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
  },
  updateBannedStatus(userId, status) {
    return apiHelper.put(
      "/admin/update_banned_status",
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
      "/admin/update_punch_status",
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
  putPassword({ userId, newPassword }) {
    return apiHelper.put(
      "admin/password",
      {
        userId,
        newPassword,
      },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
  },
};
