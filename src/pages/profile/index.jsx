import Button from "@/components/Button";
import Field from "@/components/Field";
import Gender from "@/components/Gender";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import useQuery from "@/hooks/useQuery";
import { userService } from "@/services/user.service";
import { setUserAction } from "@/stores/authReducer";
import {
  clearWaititngQueue,
  confirm,
  min,
  object,
  regex,
  require,
  validate,
} from "@/utils";
import handleError from "@/utils/handleError";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import _ from "lodash";
const ProfilePage = () => {
  const minLength = 6;
  const genderList = ["Male", "Female"];
  const { user } = useAuth();
  const dispatch = useDispatch();
  const {
    register,
    validate: validateForm,
    formRef,
    form,
    setForm,
  } = useForm(
    {
      phone: [regex("phone", "Số điện thoại không chính xác")],
      currentPassword: [
        (_, form) => {
          if (form.newPassword?.trim()?.length >= minLength) {
            const errObj = validate(
              {
                currentPassword: [
                  require({ message: "Vui lòng nhập mật khẩu hiện tại" }),
                ],
              },
              form
            );

            return errObj.currentPassword;
          }
          return;
        },
        min(minLength, "Mật khẩu phải có ít nhất 6 ký tự"),
      ],
      newPassword: [
        (_, form) => {
          if (form.currentPassword?.trim().length >= minLength) {
            const errObj = validate(
              {
                newPassword: [require("Vui lòng nhập mật khẩu mới")],
              },
              form
            );

            return errObj.newPassword;
          }
        },

        min(minLength, "Mật khẩu phải có ít nhất 6 ký tự"),
        (value, form) => {
          if (
            form.currentPassword?.trim().length >= minLength &&
            value === form.currentPassword?.trim()
          ) {
            return "Mật khẩu mới không được trùng";
          }
        },
      ],

      confirmPassword: [
        (_, form) => {
          if (
            form.newPassword?.trim().length >= minLength &&
            form.newPassword?.trim() !== form?.currentPassword
          ) {
            const errObj = validate(
              {
                confirmPassword: [
                  require({ message: "Vui lòng xác nhận lại mật khẩu" }),
                ],
              },
              form
            );

            return errObj.confirmPassword;
          }
        },
        confirm("newPassword", "Mật khẩu nhập lại chưa chính xác"),
      ],
    },
    {
      initialValue: { ...user, gender: user?.gender || genderList[0] },

      dependencies: {
        currentPassword: ["newPassword"],
        newPassword: ["confirmPassword"],
        confirmPassword: ["confirmPassword"],
      },
    }
  );
  const { loading, fetchData: updateService } = useQuery({
    enabled: false,
    queryFn: ({ params }) => userService.updateInfo(...params),
    limitDuration: 1000,
  });

  const { fetchData: changePasswordService, loading: loadingPassword } =
    useQuery({
      enabled: false,
      queryFn: ({ params }) => userService.changePassword(...params),
      limitDuration: 1000,
    });
  const onSubmit = async (e) => {
    e.preventDefault();
    clearWaititngQueue();
    const checkSubmit = object.isEqual(
      user,
      form,
      "name",
      "phone",
      "birthday",
      "gender"
    );
    if (validateForm()) {
      if (!form.currentPassword?.trim() && checkSubmit) {
        return toast.warn("Nhập thông tin mới để cập nhật");
      }

      if (!checkSubmit) {
        updateService(form)
          .then((res) => {
            dispatch(setUserAction(res?.data));
            toast.success("Bạn đã cập nhật thông tin thành công");
          })
          .catch(handleError);
      }

      if (form.currentPassword?.trim()) {
        changePasswordService({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        })
          .then((res) => {
            setForm({
              ...form,
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            });
            toast.success(res.message);
          })
          .catch(handleError);
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
              autoComplete="new-password"
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
              autoComplete="new-password"
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
              autoComplete="new-password"
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
              genderActive={user?.gender || genderList?.[0]}
              renderInput={(props) => <Gender {...props} />}
            />
          </div>
          <div className="col-12">
            {/* Button */}
            <Button loading={loading || loadingPassword} className="mt-6">
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProfilePage;
