import Button from "@/components/Button";
import Field from "@/components/Field";
import Gender from "@/components/Gender";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import useQuery from "@/hooks/useQuery";
import { userService } from "@/services/user.service";
import { onSetUser, setUserAction } from "@/stores/authReducer";
import { confirm, getPassword, min, regex, require, setUser } from "@/utils";
import handleError from "@/utils/handleError";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [genderList] = useState(["Male", "Female"]);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { register, validate, formRef, form } = useForm(
    {
      name: [require({ message: "Vui lòng điền họ tên của bạn" })],
      phone: [
        require({ message: "Vui lòng nhập số điện thoại" }),
        regex("phone", "Số điện thoại không chính xác"),
      ],
      currentPassword: [
        require({ message: "Vui lòng nhập lại mật khẩu" }),
        (value, form) => {
          if (value !== getPassword()) {
            return "Mật khẩu không chính xác";
          }
        },
      ],
      newPassword: [
        require({ message: "Vui lòng nhập mật khẩu mới" }),
        min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
        (value, form) => {
          if (value === form?.currentPassword) {
            return "Mật khẩu không được trùng";
          }
        },
      ],

      confirmPassword: [
        require({ message: "Vui lòng nhập lại mật khẩu mới" }),
        confirm("newPassword", "Mật khẩu nhập lại chưa chính xác"),
      ],
      birthday: [require({ message: "Nhập ngày tháng năm sinh của bạn" })],
      gender: [require()],
    },
    {
      initialValue: user,

      dependencies: {
        currentPassword: ["newPassword", "confirmPassword"],
        newPassword: ["confirmPassword"],
        confirmPassword: ["confirmPassword"],
      },
    }
  );

  useEffect(() => {
    formRef?.current
      ?.querySelectorAll(".sr-only")
      .forEach((e) => e.classList.remove("sr-only"));
  }, []);
  const { loading, fetchData: updateService } = useQuery({
    enabled: false,
    queryFn: ({ params }) => userService.updateInfo(...params),
    limitDuration: 1000,
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    if (validate()) {
      try {
        const res = await updateService(form);
        dispatch(setUserAction(res?.data));
        toast.success("Bạn đã cập nhật thông tin thành công");
      } catch (error) {
        handleError(error);
      }
    }
  };
  return (
    <>
      {/* Form */}
      <form
        className="form-update select-none"
        ref={formRef}
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <div className="row">
          <div className="col-12">
            <div className="profile-avatar">
              <div className="wrap">
                <img src="/img/avt.png" />
                <i className="icon">
                  <img src="/img/icons/icon-camera.svg" />
                </i>
              </div>
            </div>
          </div>
          <div className="col-12">
            {/* Email */}
            <Field
              className="form-control form-control-sm"
              id="accountFirstName"
              placeholder="Full Name *"
              label="Full Name *"
              {...register("name")}
            />
          </div>
          <div className="col-md-6">
            {/* Email */}
            <Field
              className="form-control form-control-sm"
              id="accountEmail"
              placeholder="Phone Number *"
              label="Phone Number *"
              {...register("phone")}
            />
          </div>
          <div className="col-md-6">
            {/* Email */}
            <Field
              disabled
              className="form-control form-control-sm"
              id="accountEmail"
              placeholder="Email Address *"
              label="Email Address *"
              {...register("username")}
            />
          </div>
          <div className="col-12 col-md-12">
            {/* Password */}
            <Field
              className="form-control form-control-sm"
              id="accountPassword"
              type="password"
              placeholder="Current Password"
              label="Current Password"
              {...register("currentPassword")}
            />
          </div>
          <div className="col-12 col-md-6">
            <Field
              className="form-control form-control-sm"
              id="AccountNewPassword"
              type="password"
              placeholder="New Password"
              label="New Password"
              {...register("newPassword")}
            />
          </div>
          <div className="col-12 col-md-6">
            <Field
              className="form-control form-control-sm"
              id="AccountNewPassword"
              type="password"
              placeholder="Confirm Password"
              label="Confirm Password"
              {...register("confirmPassword")}
            />
          </div>
          <div className="col-12 col-lg-6">
            <Field
              className="form-control form-control-sm"
              type="date"
              placeholder="dd/mm/yyyy"
              label="Date of Birth"
              {...register("birthday")}
            />
          </div>
          <div className="col-12 col-lg-6">
            {/* Gender */}
            <Field
              label="Gender"
              {...register("gender")}
              options={[
                {
                  id: 0,
                  value: "Male",
                },
                {
                  id: 1,
                  value: "Female",
                },
              ]}
              genderActive={form?.gender || genderList?.[0]}
              renderInput={(props) => <Gender {...props} />}
            />
          </div>
          <div className="col-12">
            {/* Button */}
            <Button loading={loading} className="mt-6">
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProfilePage;
