import { toast } from "react-toastify";
const handleError = (error) => {
  console.log(
    "%cerror handleError.js line:3 ",
    "color: red; display: block; width: 100%;",
    error
  );
  toast.error(error?.response?.data?.message, {
    style: {
      fontSize: 14,
    },
  });
};
export default handleError;
