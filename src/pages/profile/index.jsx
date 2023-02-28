import Button from "@/components/Button";
import Field from "@/components/Field";
import Gender from "@/components/Gender";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import useQuery from "@/hooks/useQuery";
import { userService } from "@/services/user.service";
import { setUserAction } from "@/stores/authReducer";
import {
  avatarDefault,
  clearWaititngQueue,
  cn,
  confirm,
  getRemember,
  min,
  object,
  regex,
  require,
  setRemember,
  validate,
} from "@/utils";
import handleError from "@/utils/handleError";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import _ from "lodash";
import { fileService } from "@/services/file.service";
import UploadImage from "@/components/UploadImage";
import { Spin } from "antd";
import DateField from "@/components/DateField";
import Radio from "@/components/Radio";

// =====
const ProfilePage = () => {
  const minLength = 6;
  const genderList = ["male", "female"];
  const { user } = useAuth();
  const fileRef = useRef();
  const dispatch = useDispatch();
  const [initialForm, setInitialForm] = useState({
    ...user,
    gender: genderList[0] || user?.gender,
    avatar: user?.avatar || avatarDefault,
  });
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
      birthday: [
        regex("date", "thời gian phải đúng format DD/MM/YYYY (15/02/2023)"),
      ],
    },
    {
      initialValue: initialForm,

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

  const { fetchData: uploadService, loading: loadingUpload } = useQuery({
    enabled: false,
    queryFn: ({ params }) => fileService.uploadFile(...params),
    limitDuration: 1000,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    clearWaititngQueue();

    //=== upload image ===
    let avatar;
    if (fileRef?.current) {
      const res = await uploadService(fileRef?.current);
      if (res.success) {
        avatar = res.link;
        fileRef.current = null;
      }
    }

    const checkSubmit = object.isEqual(
      user,
      form,
      "name",
      "phone",
      "birthday",
      "gender"
    );
    if (validateForm()) {
      if (!form.currentPassword?.trim() && checkSubmit && !avatar) {
        return toast.warn("Nhập thông tin mới để cập nhật");
      }

      if (!checkSubmit || avatar) {
        updateService({ ...form, avatar: avatar || form?.avatar })
          .then((res) => {
            dispatch(setUserAction(res?.data));
            setInitialForm({ ...form, ...res?.data });
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
            if (getRemember()?.checked) {
              setRemember({ ...getRemember(), password: form.newPassword });
            }
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
              <UploadImage ref={fileRef}>
                {(previewLink, trigger) => (
                  <div className="wrap" onClick={trigger}>
                    <Spin
                      className={cn(
                        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 spin-avatar z-40 transition-all",
                        {
                          visible: loadingUpload,
                          invisible: !loadingUpload,
                        }
                      )}
                      size="large"
                    />
                    <img
                      src={previewLink || form.avatar}
                      className={cn("transition-all", {
                        "grayscale-[50%]": loadingUpload,
                      })}
                    />
                    <i className="icon">
                      <img src="/img/icons/icon-camera.svg" />
                    </i>
                  </div>
                )}
              </UploadImage>
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
              label="Date of Birth"
              type="date"
              {...register("birthday")}
              renderInput={(props) => <DateField {...props} />}
            />
          </div>
          <div className="col-12 col-lg-6">
            {/* Gender */}
            <Field
              label="Gender"
              {...register("gender")}
              genderActive={user?.gender || genderList?.[0]}
              renderInput={({ onChange, ...props }) => (
                <Radio.Group
                  defaultValue={form?.gender || genderList[0]}
                  onSetFilter={onChange}
                >
                  <div className="btn-group-toggle" data-toggle="buttons">
                    <Radio.Gender gender="male">Male</Radio.Gender>
                    <Radio.Gender gender="female">Female</Radio.Gender>
                  </div>
                </Radio.Group>
              )}
            />
          </div>
          <div className="col-12">
            {/* Button */}
            <Button
              loading={loading || loadingPassword || loadingUpload}
              className="mt-6"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProfilePage;
