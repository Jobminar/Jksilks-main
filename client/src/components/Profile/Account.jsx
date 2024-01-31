import React from "react";

const Account = () => {
  return (
    <div className="container-fluid p-5">
      <h2>ACCOUNT</h2>
      {/* Sidebar (Overview) */}
      <div className="row m-auto mt-3 mb-3">
        <div className="col-lg-3 col-md-4 col-sm-12 p-0 mx-auto">
          <div
            className="p-3 border rounded border-dark pb-5"
            style={{ borderColor: "white", height: "500px" }}
          >
            <div className="text-center mb-3">
              <h4 style={{ borderBottom: "1px solid white" }}>Overview</h4>
            </div>
            <ul
              className="list-group list-group-flush text-center"
              style={{ border: "0", textAlign: "center" }}
            >
              <a href="#" className="list-group-item list-group-item-action">
                <h5 className="mb-0">ORDERS</h5>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                <h5 className="mb-0">PROFILE</h5>
                <ul className="list-unstyled ml-3" style={{ border: "0" }}>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    Saved cards
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    Saved UPI
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    Saved Wallets
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    Addresses
                  </a>
                </ul>
              </a>
            </ul>

            <div className="text-center">
              <h5 style={{ borderTop: "1px solid white" }}>LEGAL</h5>
              <ul className="list-unstyled">
                <a href="#" className="list-group-item list-group-item-action">
                  Terms & Conditions
                </a>
                <a href="#" className="list-group-item list-group-item-action">
                  Privacy Policy
                </a>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Body (Profile Details) */}
        <div className="col-lg-9 col-md-8 col-sm-12 pb-5">
          <div
            className="bg-white p-3 border rounded mb-3 border-dark pb-5"
            style={{ height: "500px" }}
          >
            <div className="mb-3">
              <h4>PROFILE DETAILS</h4>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="font-weight-bold">FULL NAME:</label>
                  <p className="float-end">xyz</p>
                </div>
                <div className="mb-3">
                  <label className="font-weight-bold">MOBILE NUMBER:</label>
                  <p className="float-end">9876543210</p>
                </div>
                <div className="mb-3">
                  <label className="font-weight-bold">EMAIL:</label>
                  <p className="float-end">abc@gmail.com</p>
                </div>

                <div className="mb-3">
                  <label className="font-weight-bold">GENDER:</label>
                  <p className="float-end">Male</p>
                </div>
                <div className="mb-3">
                  <label className="font-weight-bold">DATE OF BIRTH:</label>
                  <p className="float-end">09/07/1996</p>
                </div>
                <div className="mb-3">
                  <label className="font-weight-bold">LOCATION:</label>
                  <p className="float-end">Hyderabad</p>
                </div>
                <div className="mb-3">
                  <label className="font-weight-bold">ALTERNATE NUMBER:</label>
                  <p className="float-end">6789012345</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
