import { useCart } from "@/hooks/useCart";
import { deleteCartAction, updateCartAction } from "@/stores/cart/cartReducer";
import { blockInvalidChar, cn } from "@/utils";
import currency from "@/utils/currency";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import PopConfirm from "../PopConfirm";
const ProductCart = ({
  quantity,
  productId,
  product: { thumbnail_url, name, price, real_price },
}) => {
  const dispatch = useDispatch();
  const { loading } = useCart();
  const _loadingSpin = loading?.[productId] || false;

  const inputRef = useRef();
  function decreaseQuantity() {
    if (+inputRef.current.value === 1) return;
    inputRef.current.value--;
    dispatch(
      updateCartAction({
        id: productId,
        data: {
          quantity: inputRef.current?.value,
        },
      })
    );
  }
  const increaseQuantity = () => {
    inputRef.current.value++;
    dispatch(
      updateCartAction({
        id: productId,
        data: {
          quantity: inputRef.current?.value,
        },
      })
    );
  };

  const onBlur = () => {
    if (!inputRef.current.value) return (inputRef.current.value = quantity);
    if (+inputRef.current.value !== quantity) {
      dispatch(
        updateCartAction({
          id: productId,
          data: {
            quantity: +inputRef.current.value,
          },
        })
      );
    }
  };
  const handleChangeInput = (e) => {
    if (/^0/.test(e.target.value)) {
      e.target.value = e.target.value.replace(/^0/, "");
    }
  };
  return (
    <Spin
      spinning={_loadingSpin}
      indicator={<LoadingOutlined style={{ color: "#000", fontSize: 28 }} />}
    >
      <li className="list-group-item animate-[fadeIn_1s]">
        <div className="row align-items-center">
          <div className="w-[120px]" title={name}>
            {/* Image */}
            <a href="./product.html">
              <img className="img-fluid" src={thumbnail_url} alt="..." />
            </a>
          </div>
          <div className="flex-1 px-2">
            {/* Title */}
            <p className="font-size-sm mb-6">
              <a
                className="text-body line-clamp-2 font-semibold"
                href="./product.html"
                title={name}
              >
                {name}
              </a>{" "}
              <br />
              <span className="card-product-price">
                {real_price < price ? (
                  <>
                    <span className="sale text-primary !text-xl">
                      {currency(real_price)}
                    </span>
                    <span className="text-muted !text-xs line-through ml-1 inline-block">
                      {currency(price)}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="sale text-primary !text-xl">
                      {currency(real_price || price)}
                    </span>
                  </>
                )}
              </span>
            </p>
            {/*Footer */}
            <div className="d-flex align-items-center">
              {/* Select */}
              <div className="btn-group btn-quantity select-none">
                <PopConfirm
                  title="Thông báo"
                  description={
                    <p className="text-base m-0">
                      Bạn có muốn xóa{" "}
                      <span className="font-semibold">"sản phẩm"</span> này?
                    </p>
                  }
                  disabled={+inputRef.current?.value > 1}
                  okText="Xóa"
                  placement="leftBottom"
                  loading={_loadingSpin}
                  overlayClassName="max-w-[300px]"
                  onConfirm={() => {
                    dispatch(deleteCartAction(productId));
                  }}
                >
                  <span
                    className={cn(
                      "outline-none border-none cursor-pointer p-[10px] flex justify-center items-center"
                    )}
                    disabled
                    onClick={decreaseQuantity}
                  >
                    -
                  </span>
                </PopConfirm>
                <input
                  ref={inputRef}
                  className="border !border-y-transparent"
                  defaultValue={quantity}
                  onChange={handleChangeInput}
                  onKeyDown={blockInvalidChar}
                  onBlur={onBlur}
                  type="number"
                />

                <span
                  className={cn(
                    "outline-none border-none cursor-pointer p-[10px] flex justify-center items-center"
                  )}
                  disabled
                  onClick={increaseQuantity}
                >
                  +
                </span>
              </div>
              {/* Remove */}
              <PopConfirm
                title="Thông báo"
                description={
                  <p className="text-base m-0">
                    Bạn có muốn xóa{" "}
                    <span className="font-semibold">"sản phẩm"</span> này?
                  </p>
                }
                okText="Xóa"
                placement="bottomRight"
                overlayClassName="max-w-[300px]"
                loading={_loadingSpin}
                onConfirm={() => {
                  dispatch(deleteCartAction(productId));
                }}
              >
                <span className="font-size-xs text-gray-400 ml-auto flex items-center gap-x-1 select-none cursor-pointer">
                  <i className="fe fe-trash" /> Xóa
                </span>
              </PopConfirm>
            </div>
          </div>
        </div>
      </li>
    </Spin>
  );
};

export default ProductCart;
