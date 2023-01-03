import { apiHelper } from "./../utils/helpers";
const getToken = () => localStorage.getItem("token");
export default {
  postPunchRecord({ latitude, longitude }) {
    return apiHelper.post(
      "/records/punch_record",
      {
        latitude: latitude,
        longitude: longitude,
      },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
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
