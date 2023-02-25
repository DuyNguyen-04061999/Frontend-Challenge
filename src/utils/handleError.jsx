import { toast } from "react-toastify";
const handleError = (error) => {
  console.log(
    "%cerror handleError.js line:3 ",
    "color: red; display: block; width: 100%;",
    error
  );
  toast.dismiss();
  if (error?.response?.data?.message === "Username or Password incorrect!") {
    return toast.error(
      () => (
        <p>
          <span className="text-red-500 font-semibold">Email</span> hoặc{" "}
          <span className="text-red-500 font-semibold">Mật khẩu</span> không
          đúng. Vui lòng kiểm tra lại
        </p>
      ),
      {
        autoClose: 2000,
      }
    );
  }
  toast.error(error?.response?.data?.message, {
    style: {
      fontSize: 14,
    },
    autoClose: 2000,
  });
};
export default handleError;
