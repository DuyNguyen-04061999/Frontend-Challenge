import { handleToastMessage } from "@/utils";
import handleError from "@/utils/handleError";
import { message } from "antd";
import { useId, useRef } from "react";

const useAction = ({
  promise,
  pendingMessage,
  successMessage,
  errorMessage,
  onSuccess,
  recall = true,
  antd = false,
}) => {
  const flagRef = useRef(false);
  const key = useId();
  const onAction = async (...params) => {
    if (flagRef.current) return;
    flagRef.current = true;
    try {
      if (antd) {
        message.open({
          type: "loading",
          key,
          content: pendingMessage,
        });
        await promise(...params);
        if (successMessage) {
          message.open({
            key,
            type: "success",
            content: successMessage,
          });
        } else {
          message?.destroy(key);
        }
      } else {
        await handleToastMessage({
          promise: promise(...params),
          pending: pendingMessage,
          success: successMessage,
          error: errorMessage,
        });
      }
      await onSuccess?.();
    } catch (error) {
      if (antd) {
        handleError(error, antd, key);
      }
      console.log(
        "%cerror index.jsx line:40 ",
        "color: red; display: block; width: 100%;",
        error
      );
    }

    if (recall) {
      flagRef.current = false;
    }
  };

  return onAction;
};

export default useAction;
