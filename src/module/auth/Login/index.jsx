import Field from "@/components/Field";
import { useForm } from "@/hooks/useForm";
import { loginThunkAction } from "@/stores/authReducer";
import { min, regex, require } from "@/utils";
import React, { memo, useState } from "react";
import { toast } from "react-toastify";
import { getUser } from "@/utils";
import Button from "@/components/Button";
import { useDispatch } from "react-redux";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { form, validate, formRef, register } = useForm({
    username: [
      require({ message: "Vui lòng nhập địa chỉ email" }),
      regex("email", "Email chưa chính xác"),
    ],
    password: [
      require({ message: "Vui lòng nhập mật khẩu" }),
      min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    ],
  });

  const onLogin = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        await dispatch(loginThunkAction(form)).unwrap();
        toast.success(
          <p>
            Chúc mừng{" "}
            <span className="text-[#34d399] font-bold">{getUser().name}</span>{" "}
            đã đăng nhập thành công!
          </p>,
          {
            position: "top-center",
          }
        );
      } catch (error) {
        toast.error(
          <p>
            <span className="text-red-500 font-semibold">Email</span> hoặc{" "}
            <span className="text-red-500 font-semibold">Mật khẩu</span> không
            đúng. Vui lòng kiểm tra lại
          </p>
        );
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="col-12 col-md-6">
      {/* Card */}
      <div className="card card-lg mb-10 mb-md-0">
        <div className="card-body">
          {/* Heading */}
          <h6 className="mb-7">Đăng nhập</h6>
          {/* Form */}
          <form
            className="select-none"
            onSubmit={onLogin}
            autoComplete="off"
            ref={formRef}
          >
            <div className="row">
              <div className="col-12">
                {/* Email */}
                <Field
                  className="form-control form-control-sm"
                  id="loginEmail"
                  placeholder="Email Address *"
                  label="Email Address *"
                  {...register("username")}
                />
              </div>
              <div className="col-12">
                {/* Password */}
                <Field
                  className="form-control form-control-sm"
                  id="loginPassword"
                  type="password"
                  placeholder="Password *"
                  label="Password *"
                  {...register("password")}
                />
              </div>
              <div className="col-12 col-md">
                {/* Remember */}
                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="loginRemember"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="loginRemember"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-auto">
                {/* Link */}
                <div className="form-group select-none">
                  <a
                    className="font-size-sm text-reset"
                    data-toggle="modal"
                    href="#modalPasswordReset"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
              <div className="col-12">
                {/* Button */}
                <Button loading={loading}>Đăng nhập</Button>
              </div>
              <div className="col-12">
                <p className="font-size-sm text-muted mt-5 mb-2 font-light">
                  Tài khoản demo:{" "}
                  <b className="text-black">demo@spacedev.com / Spacedev@123</b>
                </p>
                <p className="font-size-sm text-muted mt-5 mb-2 font-light text-justify">
                  Chúng tôi cung cấp cho bạn tài khoản demo vì mục đích học tập,
                  để đảm bảo những người khác có thể sử dụng chung tài khoản
                  chúng tôi sẽ hạn chế rất nhiều quyền trên tài khoản này ví dụ:{" "}
                  <br />
                  - Không thay đổi thông tin cá nhân, mật khẩu <br />
                  - không reset password,... <br />
                  <br />
                  Để có thể sử dụng toàn bộ chức năng trên website, vui lòng
                  tiến hành <b className="text-black">đăng ký</b> bằng tài khoản
                  email có thật
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(Login);
