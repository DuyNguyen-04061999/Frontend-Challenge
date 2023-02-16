import React from "react";

const Signup = () => {
  return (
    <div className="col-12 col-md-6">
      {/* Card */}
      <div className="card card-lg">
        <div className="card-body">
          {/* Heading */}
          <h6 className="mb-7">New Customer</h6>
          {/* Form */}
          <form>
            <div className="row">
              <div className="col-12">
                {/* Email */}
                <div className="form-group">
                  <label className="sr-only" htmlFor="registerFirstName">
                    Full Name *
                  </label>
                  <input
                    className="form-control form-control-sm"
                    id="registerFirstName"
                    type="text"
                    placeholder="Full Name *"
                    required
                  />
                </div>
              </div>
              <div className="col-12">
                {/* Email */}
                <div className="form-group">
                  <label className="sr-only" htmlFor="registerEmail">
                    Email Address *
                  </label>
                  <input
                    className="form-control form-control-sm"
                    id="registerEmail"
                    type="email"
                    placeholder="Email Address *"
                    required
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                {/* Password */}
                <div className="form-group">
                  <label className="sr-only" htmlFor="registerPassword">
                    Password *
                  </label>
                  <input
                    className="form-control form-control-sm"
                    id="registerPassword"
                    type="password"
                    placeholder="Password *"
                    required
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                {/* Password */}
                <div className="form-group">
                  <label className="sr-only" htmlFor="registerPasswordConfirm">
                    Confirm Password *
                  </label>
                  <input
                    className="form-control form-control-sm"
                    id="registerPasswordConfirm"
                    type="password"
                    placeholder="Confirm Password *"
                    required
                  />
                </div>
              </div>
              <div className="col-12 col-md-auto">
                {/* Link */}
                <div className="form-group font-size-sm text-muted font-light">
                  By registering your details, you agree with our Terms &amp;
                  Conditions, and Privacy and Cookie Policy.
                </div>
              </div>
              <div className="col-12">
                {/* Button */}
                <a
                  href="./account-personal-info.html"
                  className="btn btn-sm btn-dark"
                  type="submit"
                >
                  Register
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
