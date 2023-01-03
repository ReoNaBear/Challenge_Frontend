import { apiHelper } from "./../utils/helpers";
const getToken = () => localStorage.getItem("token");
export default {
  postPunchRecord() {
    return apiHelper.post("/records/punch_record", null, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  qrcodePunchRecord({ secretCode }) {
    return apiHelper.post(
      "/records/qrcode_punch_record",
      {
        secretCode,
      },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
  },
};
