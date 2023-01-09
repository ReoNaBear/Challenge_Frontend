import { apiHelper } from "./../utils/helpers";
const getToken = () => localStorage.getItem("token");
export default {
  getCurrentUser() {
    return apiHelper.get("/users/current_user", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  getCurrentPunchData() {
    return apiHelper.get("/users/current_punch_data", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  putPassword({ oldPassword, newPassword }) {
    return apiHelper.put(
      "users/password",
      {
        oldPassword,
        newPassword,
      },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
  },
};
