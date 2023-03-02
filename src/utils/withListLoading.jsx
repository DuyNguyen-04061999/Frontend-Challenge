import EmptyText from "@/components/EmptyText";
import React, { Fragment } from "react";
import createArray from "./createArray";

const withListLoading = (Component, LoadingComponent = Component) => {
  return ({ loadingCount = 3, data, loading, empty, emptyText, ...props }) => {
    return loading
      ? createArray(loadingCount).map((_, id) => <LoadingComponent key={id} />)
      : data?.length > 0
      ? data?.map((e) => (
          <Fragment key={e?._id || e?.id}>
            {<Component {...e} {...props} />}
          </Fragment>
        ))
      : empty || <EmptyText>{emptyText}</EmptyText>;
  };
};

export default withListLoading;
