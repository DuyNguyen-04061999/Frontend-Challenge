import React from "react";

const AddressEditPage = () => {
  return (
    <>
      {/* Heading */}
      <h6 className="mb-7">Add Address</h6>
      {/* Form */}
      <form>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="firstName">Full Name *</label>
              <input
                className="form-control"
                id="firstName"
                type="text"
                placeholder="First Name"
                required
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="mobilePhone">Phone Number*</label>
              <input
                className="form-control"
                id="mobilePhone"
                type="tel"
                placeholder="Phone Number*"
                required
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="emailAddress">Email Address *</label>
              <input
                className="form-control"
                id="emailAddress"
                type="email"
                placeholder="Email Address"
                required
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="country">District *</label>
              <input
                className="form-control"
                id="country"
                type="text"
                placeholder="Country"
                required
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="companyName">Province / City *</label>
              <input
                className="form-control"
                id="companyName"
                type="text"
                placeholder="Province / City*"
                required
              />
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="addressLineOne">Address *</label>
              <input
                className="form-control"
                id="addressLineOne"
                type="text"
                placeholder="Address Line 1"
                required
              />
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <div className="custom-control custom-checkbox mb-0">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="defaultShippingAddress"
                />
                <label
                  className="custom-control-label"
                  htmlFor="defaultShippingAddress"
                >
                  Default shipping address
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Button */}
        <button className="btn btn-dark" type="submit">
          Add Address
        </button>
      </form>
    </>
  );
};

export default AddressEditPage;
