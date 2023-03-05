import { PATH } from "@/config";
import { logoutAction } from "@/stores/authReducer";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SubNavStyled = styled.div`
  max-width: 250px;
  .user-link {
    display: block;
    color: #000;
    transition: 0.2s;
    font-size: 1rem;
    &:hover {
      color: #ff2915;
    }
    + .user-link {
      margin-top: 10px;
    }
  }
`;
const UserHover = () => {
  const dispatch = useDispatch();
  return (
    <SubNavStyled>
      <Link className="user-link" to={PATH.profile.index}>
        Thông tin cá nhân
      </Link>
      <Link className="user-link" to={PATH.profile.payment}>
        Sổ thanh toán
      </Link>
      <span
        className="user-link cursor-pointer"
        onClick={() => dispatch(logoutAction())}
      >
        Đăng xuất
      </span>
    </SubNavStyled>
  );
};

export default UserHover;
