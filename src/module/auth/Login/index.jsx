import Field from "@/components/Field";
import { useForm } from "@/hooks/useForm";
import { loginAction, loginByCodeAction } from "@/stores/auth/authReducer";
import {
  copyToClipBoard,
  getRemember,
  setRemember,
  min,
  regex,
  required,
  clearRemember,
} from "@/utils";
import React, { memo, useEffect, useState } from "react";
import Button from "@/components/Button";
import { useDispatch } from "react-redux";
import useQueryParams from "@/hooks/useQueryParams";
import { message } from "antd";
import ResetPasswordModal from "@/components/ResetPasswordModal";
import { useOpenModal } from "@/hooks/useOpenModal";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  const { loading } = useAuth();
  const _loading = loading.login || false;
  const [checkRemember, setCheckRemember] = useState(
    getRemember()?.checked || false
  );
  const dispatch = useDispatch();
  const [{ code }] = useQueryParams();
  const { open, onOpenModal, onCloseModal } = useOpenModal();
  const { form, validate, formRef, register } = useForm(
    {
      email: [
        required({ message: "Vui lòng nhập địa chỉ email" }),
        regex("email", "Email chưa chính xác"),
      ],
      password: [
        required({ message: "Vui lòng nhập mật khẩu" }),
        min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
      ],
    },
    {
      initialValue: {
        username: getRemember()?.username,
        password: getRemember()?.password,
      },
    }
  );

  const onLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(
        loginAction({
          ...form,
          onSuccess: (user) =>
            toast.success(
              <p>
                Chúc mừng{" "}
                <span className="text-[#34d399] font-bold">
                  {user?.username}
                </span>{" "}
                đã đăng nhập thành công!
              </p>,
              {
                position: "top-center",
              }
            ),
        })
      );

      if (checkRemember) {
        setRemember({
          username: form.username,
          password: form.password,
          checked: true,
        });
      } else {
        clearRemember();
      }
    }
  };

  useEffect(() => {
    if (code) {
      dispatch(
        loginByCodeAction({
          code,
          onSuccess: (user) => {
            console.log("user :>> ", user);
            return toast.success(
              <p>
                Chúc mừng{" "}
                <span className="text-[#34d399] font-bold">
                  {user?.username}
                </span>{" "}
                đã đăng nhập thành công!
              </p>,
              {
                position: "top-center",
              }
            );
          },
        })
      );
    }
  }, []);

  const _copyToClipBoard = async (e) => {
    await copyToClipBoard(e.target.innerText);
    message.info("Copied");
  };

  return (
    <>
      <ResetPasswordModal open={open} onCancel={onCloseModal} />
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
                    {...register("email")}
                  />
                </div>
                <div className="col-12">
                  {/* Password */}
                  <Field
                    className="form-control form-control-sm"
                    id="loginPassword"
                    type="password"
                    placeholder="Password *"
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
                        checked={checkRemember}
                        onChange={(e) => setCheckRemember(e.target.checked)}
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

                <div className="col-12">
                  {/* Button */}
                  <Button loading={_loading}>Đăng nhập</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Login);
