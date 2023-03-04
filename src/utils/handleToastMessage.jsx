import { toast } from "react-toastify";
import { clearWaititngQueue } from "./clearWaititngQueue";

export const handleToastMessage = ({ promise, pending, success, error }) => {
  clearWaititngQueue();
  toast.dismiss();
  return toast.promise(promise, {
    pending: {
      render() {
        return pending || "Đang gửi thông tin";
      },
    },
    success: {
      render() {
        return success || "Đã gửi thông tin thành công";
      },
    },
    error: {
      render({ data }) {
        // When the promise reject, data will contains the error
        return error || data.response.data.message;
      },
    },
  });
};
