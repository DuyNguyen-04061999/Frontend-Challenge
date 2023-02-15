import { toast } from "react-toastify";

const handleErrorSubmit = (errors) => {
  const arrErrors = Object.values(errors);
  if (arrErrors.length === 1 && arrErrors[0]) {
    toast.error(arrErrors[0], {
      pauseOnHover: false,
      autoClose: 1000,
    });
  }
};
export default handleErrorSubmit;
