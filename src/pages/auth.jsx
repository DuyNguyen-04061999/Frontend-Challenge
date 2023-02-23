import useBodyClass from "@/hooks/useBodyClass";
import Login from "@/module/auth/Login";
import Signup from "@/module/auth/Signup";
import React from "react";

const AuthPage = () => {
  useBodyClass("bg-light");

  return (
    <section className="py-12">
      <div className="container">
        <div className="row">
          <Login />
          <Signup />
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
