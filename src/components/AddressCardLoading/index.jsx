import React from "react";
import Skeleton from "../Skeleton";

const AddressCardLoading = () => {
  return (
    <div className="col-12">
      {/* Card */}
      <div className="card card-lg bg-light mb-8" style={{ height: 274 }}>
        <div className="card-body">
          {/* Text */}
          <p className="font-size-sm mb-0 leading-[35px]">
            <Skeleton
              borderRadius={4}
              display="block"
              height={20}
              width="90%"
            />
            <Skeleton
              borderRadius={4}
              display="block"
              marginTop={20}
              height={20}
              width="75%"
            />
            <Skeleton
              borderRadius={4}
              display="block"
              marginTop={20}
              height={20}
              width="55%"
            />
            <Skeleton
              borderRadius={4}
              display="block"
              marginTop={20}
              height={20}
              width="40%"
            />
            <Skeleton
              borderRadius={4}
              display="block"
              marginTop={20}
              height={20}
              width="35%"
            />
          </p>
          {/* {addressDefault && (
            <div className="card-action-right-bottom">
              <div className="color-success cursor-pointer">
                Địa chỉ mặc định
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default AddressCardLoading;
