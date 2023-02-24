import Button from "@/components/Button";
import Field from "@/components/Field";
import useBodyClass from "@/hooks/useBodyClass";
import { useForm } from "@/hooks/useForm";
import useQueryParams from "@/hooks/useQueryParams";
import { changePasswordByCodeAction } from "@/stores/authReducer";
import { confirm, getUser, min, require } from "@/utils";
import handleError from "@/utils/handleError";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
  useBodyClass("bg-light");
  const [loading, setLoading] = useState(false);
  const [{ code }] = useQueryParams();
  const dispatch = useDispatch();
  const { register, form, formRef, validate } = useForm(
    {
      password: [
        require({ message: "Vui lòng nhập mật khẩu mới" }),
        min(6, "Mật khẩu phải có ít nhất 6 kí tự"),
      ],

      confirmPassword: [
        require({ message: "Vui lòng nhập lại mật khẩu" }),
        confirm("password", "Mật khẩu chưa chính xác"),
      ],
    },
    {
      dependencies: {
        password: ["confirmPassword"],
        confirmPassword: ["confirmPassword"],
      },
    }
  );

  const onChangePassword = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        setLoading(true);
        await dispatch(changePasswordByCodeAction({ ...form, code }));
        toast.success(
          <p>
            Chúc mừng{" "}
            <span className="text-[#34d399] font-bold">{getUser().name}</span>{" "}
            đã đăng nhập thành công!
          </p>,
          {
            position: "top-center",
            autoClose: 2000,
          }
        );
      } catch (error) {
        handleError(error?.message);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <section className="py-12">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 mx-auto">
            {/* Card */}
            <div className="card card-lg mb-10 mb-md-0">
              <div className="card-body">
                {/* Heading */}
                <h6 className="mb-7 font-semibold uppercase text-center">
                  Thay đổi mật khẩu
                </h6>
                {/* Form */}
                <form
                  className="select-none"
                  autoComplete="off"
                  ref={formRef}
                  onSubmit={onChangePassword}
                >
                  <div className="row">
                    <div className="col-12">
                      {/* Email */}
                      <Field
                        className="form-control form-control-sm"
                        id="password"
                        placeholder="New password *"
                        label="New password *"
                        type="password"
                        {...register("password")}
                      />
                    </div>
                    <div className="col-12">
                      {/* Email */}
                      <Field
                        className="form-control form-control-sm"
                        id="password"
                        placeholder="Confirm password *"
                        label="Confirm password *"
                        type="password"
                        {...register("confirmPassword")}
                      />
                    </div>

                    <div className="col-6 mx-auto flex items-center justify-center">
                      {/* Button */}
                      <Button className="w-full" loading={loading}>
                        Đăng nhập
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
