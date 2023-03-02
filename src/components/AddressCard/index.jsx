import { PATH } from "@/config";
import useQuery from "@/hooks/useQuery";
import { userService } from "@/services/user.service";
import { handleToastMessage } from "@/utils";
import handleError from "@/utils/handleError";
import withListLoading from "@/utils/withListLoading";
import { message } from "antd";
import React from "react";
import { generatePath, useNavigate } from "react-router-dom";
import AddressCardLoading from "../AddressCardLoading";
import Button from "../Button";

const AddressCard = withListLoading(
  ({
    phone,
    email,
    address,
    province,
    district,
    fullName,
    default: addressDefault,
    refetchAddress,
    _id,
  }) => {
    const navigate = useNavigate();
    const { fetchData: editAddressService, loadingEditAddress } = useQuery({
      enabled: false,
      queryFn: ({ params }) => userService.editAddress(...params),
    });

    const onSetDefaultAddress = async (id) => {
      await handleToastMessage({
        promise: editAddressService(id, { default: true }),
        pending: "Đang cập nhật địa chỉ",
        success: "Đã đặt địa chỉ mặc định theo yêu cầu",
      });
      await refetchAddress();
    };

    const { fetchData: deleteAddressService, loading: loadingDeleteAddress } =
      useQuery({
        enabled: false,
        queryFn: ({ params }) => userService.deleteAddress(...params),
      });

    const onDeleteAddress = async (id) => {
      await handleToastMessage({
        promise: deleteAddressService(id),
        pending: "Đang xóa địa chỉ",
        success: "Đã xóa địa chỉ theo yêu cầu",
      });
      await refetchAddress();
    };
    return (
      <div className="col-12 select-none">
        {/* Card */}
        <div className="card card-lg bg-light mb-8">
          <div className="card-body">
            {/* Text */}
            <p className="font-size-sm mb-0 leading-[35px]">
              <span className="text-body text-xl font-bold ">{fullName}</span>{" "}
              <br />
              <b>Số điện thoại:</b> {phone} <br />
              <b>Email:</b> {email}
              <br />
              <b>Quận / Huyện:</b> {district} <br />
              <b>Tỉnh / thành phố:</b> {province} <br />
              <b>Địa chỉ:</b> {address}
            </p>
            {addressDefault ? (
              <div className="card-action-right-bottom">
                <div className="color-success cursor-pointer">
                  Địa chỉ mặc định
                </div>
              </div>
            ) : (
              <Button
                outline
                className="ml-auto block btn-xs"
                onClick={() => onSetDefaultAddress(_id)}
                loading={loadingEditAddress}
              >
                Đặt làm địa chỉ mặc định
              </Button>
            )}
            <div className="card-action card-action-right gap-2 flex">
              {/* Button */}
              <button
                className="btn btn-xs btn-circle btn-white-primary"
                onClick={() =>
                  navigate(
                    generatePath(PATH.profile.editAddress, {
                      id: _id,
                    })
                  )
                }
              >
                <i className="fe fe-edit-2" />
              </button>
              {!addressDefault && (
                <button
                  className="btn btn-xs btn-circle btn-white-primary"
                  onClick={() => onDeleteAddress(_id)}
                  disabled={loadingDeleteAddress}
                >
                  <i className="fe fe-trash" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
  AddressCardLoading
);

export default AddressCard;
