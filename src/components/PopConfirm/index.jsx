import React, { useState } from "react";
import { Popconfirm as PopconfirmM } from "antd";
import Button from "../Button";

const PopConfirm = ({ description, onConfirm, ...props }) => {
  return (
    <PopconfirmM
      {...props}
      okButtonProps={{
        hidden: true,
      }}
      cancelButtonProps={{
        hidden: true,
      }}
      description={
        <>
          {description}
          <div className="flex justify-end">
            {props?.cancelText && (
              <Button
                className="mt-5 btn-xs mr-2"
                outline
                onClick={() => props.onCancel()}
              >
                {props.cancelText || "Cancel"}
              </Button>
            )}
            <Button className="mt-5 btn-xs" onClick={onConfirm}>
              {props.okText || "ok"}
            </Button>
          </div>
        </>
      }
    />
  );
};

export default PopConfirm;
