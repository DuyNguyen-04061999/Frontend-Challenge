import Button from "@/components/Button";
import Field from "@/components/Field";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import useQuery from "@/hooks/useQuery";
import { userService } from "@/services/user.service";
import {
  clearWaititngQueue,
  cn,
  object,
  regex,
  required,
} from "@/utils";
import handleError from "@/utils/handleError";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import _ from "lodash";
import UploadImage from "@/components/UploadImage";
import { Spin } from "antd";
import PortalTitle from "@/components/PortalTitle";
import { PROFILE_TITLE_ID } from "@/config";

// =====
const ProfilePage = () => {
  const { user } = useAuth();
  const fileRef = useRef();
  const dispatch = useDispatch();
  const {
    register,
    validate: validateForm,
    formRef,
    form,
    setForm,
  } = useForm(
    {
      username: [required({ message: 'Vui lòng nhập họ tên' })],
      email: [required({ message: 'Vui lòng nhập email' }), regex('email')],
      bio: [required({ message: 'Vui lòng giới thiệu về bản thân' })],
    },
    {
      initialValue: {
        username: user?.username,
        email: user?.email,
        bio: user?.bio,
      },
    }
  );

  //======service======
  const { loading, fetchData: updateService } = useQuery({
    enabled: false,
    queryFn: ({ params }) => userService.updateUserInfo(...params),
    limitDuration: 1000,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    clearWaititngQueue();

    //=== upload image ===
    const checkSubmit = object.isEqual(form, {
      username: user?.username,
      email: user?.email,
      bio: user?.bio,
    })
    if (validateForm()) {
      if (checkSubmit && !fileRef.current) {
        return toast.warn("Vui lòng nhập thông tin mới để cập nhật")
      }

      if (!checkSubmit || fileRef.current) {
        try {
          const res = await updateService({ ...form, image: fileRef.current })
          if (res) {
            toast.success("Cập nhật thông tin thành công")
            fileRef.current = null
          }
        } catch (error) {
          handleError(error)
        }
      }
    }

  };
  return (
    <>
      {/* Form */}
      <PortalTitle selector={PROFILE_TITLE_ID}>Thông tin cá nhân</PortalTitle>
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
                          visible: loading,
                          invisible: !loading,
                        }
                      )}
                      size="large"
                    />
                    <img
                      src={previewLink || user?.image}
                      className={cn("transition-all", {
                        "grayscale-[50%]": loading,
                      })}
                    />
                    <i className="icon flex items-center justify-center !bg-[rgba(255,255,255,0.6)] !bg-opacity-80">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                      >
                        <path d="M15 12a1 1 0 01-1 1H2a1 1 0 01-1-1V6a1 1 0 011-1h1.172a3 3 0 002.12-.879l.83-.828A1 1 0 016.827 3h2.344a1 1 0 01.707.293l.828.828A3 3 0 0012.828 5H14a1 1 0 011 1v6zM2 4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1.172a2 2 0 01-1.414-.586l-.828-.828A2 2 0 009.172 2H6.828a2 2 0 00-1.414.586l-.828.828A2 2 0 013.172 4H2z" />
                        <path d="M8 11a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm0 1a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM3 6.5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                      </svg>
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
              {...register("username")}
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
              {...register("email")}
            />
          </div>
          <div className="col-12 col-lg-6">
            {/* Gender */}
            <Field
              label="Giới thiệu bản thân *"
              className="form-control form-control-sm"
              {...register("bio")}
              renderInput={({ _onChange, ...props }) => (
                <textarea {...props} onChange={_onChange} />
              )}
            />
          </div>
          <div className="col-12">
            {/* Button */}
            <Button
              loading={loading}
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
