import { PATH } from "@/config";
import { userService } from "@/services/user.service";
import { handleToastMessage } from "@/utils";
import withListLoading from "@/utils/withListLoading";
import moment from "moment/moment";
import React, { useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import AddressPaymentCardLoading from "../AddressCardLoading";
import Button from "../Button";

const PaymentCard = ({
  cardName,
  cardNumber,
  expired,
  type,
  _id,
  refetchPaymentList,
  ...props
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onSetDefaultPayment = async () => {
    setLoading(true);
    await handleToastMessage({
      promise: userService.editPayment(_id, {
        default: true,
      }),
      pending: "Đang cập nhật thông tin",
      success: "Đã cập nhật thành công",
    });
    setLoading(false);
    await refetchPaymentList();
  };
  const onDeletePayment = async () => {
    await handleToastMessage({
      promise: userService.deletePayment(_id),
      pending: "Đang xóa sổ thanh toán",
      success: "Đã xóa sổ thanh toán thành công",
    });
    await refetchPaymentList();
  };
  return (
    <div className="col-12">
      {/* Card */}
      <div className="payment-card card card-lg bg-light mb-8">
        <div className="card-body">
          {/* Heading */}
          <h6 className="mb-6">
            {type === "card" ? "Debit / Credit Card" : "Paypall"}
          </h6>
          {/* Text */}
          <p className="mb-5">
            <strong>Card Number:</strong> <br />
            <span className="text-muted">
              {cardNumber} ({type})
            </span>
          </p>
          {/* Text */}
          <p className="mb-5">
            <strong>Expiry Date:</strong> <br />
            <span className="text-muted">
              {moment(expired, "MM/YYYY").format("MMM, YYYY")}
            </span>
          </p>
          {/* Text */}
          <p className="mb-0">
            <strong>Name on Card:</strong> <br />
            <span className="text-muted">{cardName}</span>
          </p>
          <div className="card-action-right-bottom">
            {props.default ? (
              <span className="text-[#26bc4e]">Thanh toán mặc định</span>
            ) : (
              <Button
                className="btn-xs text-sm"
                outline
                onClick={onSetDefaultPayment}
                loading={loading}
              >
                Đặt làm mặc định
              </Button>
            )}
          </div>

          {/* Action */}
          <div className="card-action card-action-right flex gap-x-2">
            {/* Button */}
            <div
              className="btn btn-xs btn-circle btn-white-primary"
              href="account-payment-edit.html"
              onClick={() =>
                navigate(
                  generatePath(PATH.profile.editPayment, {
                    id: _id,
                  })
                )
              }
            >
              <i className="fe fe-edit-2" />
            </div>
            {!props?.default && (
              <div
                className="btn btn-xs btn-circle btn-white-primary"
                href="account-payment-edit.html"
                onClick={() => onDeletePayment()}
              >
                <i className="fe fe-trash" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withListLoading(PaymentCard, AddressPaymentCardLoading);
