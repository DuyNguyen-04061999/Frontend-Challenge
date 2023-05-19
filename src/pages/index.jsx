import Button from "@/components/Button";
import ListProducts from "@/components/ListProducts";
import Slider from "@/components/Slider";
import Tab from "@/components/Tab";
import { PATH } from "@/config";
import useScrollTop from "@/hooks/useScrollTop";
import createArray from "@/utils/createArray";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
  useScrollTop();
  const navigate = useNavigate()
  return (
    <div className="p-5">
      <h1 className="text-2xl font bold text-center">Viết blog theo phong cách của bạn</h1>

      <div className="grid lg:grid-cols-2 grid-cols-1 px-5 gap-8">
        <div className="w-full overflow-hidden h-[400px]">
          <img src="https://cdn.pixabay.com/photo/2016/03/27/20/55/arm-1284248_1280.jpg" className="object-cover" alt="" />
        </div>
        <div className="w-full overflow-hidden h-[400px]">
          <img src="https://cdn.pixabay.com/photo/2015/05/31/15/14/woman-792162_1280.jpg" className="object-cover" alt="" />
        </div>
        <div className="w-full overflow-hidden h-[400px]">
          <img src="https://cdn.pixabay.com/photo/2015/01/08/18/26/man-593333_1280.jpg" className="object-cover" alt="" />
        </div>
        <div className="w-full overflow-hidden h-[400px]">
          <img src="https://cdn.pixabay.com/photo/2015/01/09/11/08/startup-594090_1280.jpg" className="object-cover" alt="" />
        </div>
      </div>

      <Button className="mt-10" onClick={() => navigate(PATH.blogCreate)}>Tạo bài viết cho chính mình nào</Button>
    </div>
  );
};

export default Home;
