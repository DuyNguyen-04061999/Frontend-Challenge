import Author, { ListAuthorItem } from "@/components/Author";
import useQuery from "@/hooks/useQuery";
import { userService } from "@/services/user.service";
import React from "react";

const AuthorsPage = () => {
  const { data = [], loading } = useQuery({
    queryFn: () => userService.getAllUser(),
    limitDuration: 1000,
  });
  console.log("data :>> ", data);
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 p-10">
      {/* {data.length > 0 && data?.map((e) => <Author key={e?.id} {...e} />)} */}
      <ListAuthorItem
        data={data}
        empty="Hiện tại chưa có tác giả nào"
        loading={loading}
        loadingCount={4}
      />
    </div>
  );
};

export default AuthorsPage;
