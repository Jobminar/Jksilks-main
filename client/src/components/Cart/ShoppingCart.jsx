import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
export default function ShoppingCart() {
  const customFontStyle = {
    fontFamily: "Sail",
    fontSize: "3.5rem", // Adjust the font size as needed
    color: "#ce0011",
    /* Add other styles if needed */
  };
  return (
    <div className="container bg-white pt-6">
      <div className="col-12 col-md-4 d-flex align-items-center">
        <div style={customFontStyle} className="mr-3">
          Shopping Cart
        </div>
        <div className="flex-grow-1"></div>
        <img
          src="https://file.rendit.io/n/BSUK5YAUwhbI8qtVYWdB.svg"
          alt="ActionShoppingBag icon"
          className="mt-2 w-12 ml-3" // Add ml-3 to add margin between text and icon
        />
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <div className="mb-3">
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <img
                  src="https://file.rendit.io/n/8IoRxsP8efY8UqJseecN.png"
                  alt="Frame3"
                  className="w-50 rounded" // Set the width of the image and add rounded corners
                />
                <div className="d-flex flex-column ml-3">
                  <div
                    className="text-lg fw-bold mb-1"
                    style={{ color: "#333" }}
                  >
                    Product
                  </div>
                  <div className="text-xl" style={{ color: "#666" }}>
                    Bridal wear
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column align-items-center">
                <div className="text-lg fw-bold mt-3">Quantity</div>
                <div className="input-group">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    type="button"
                    style={{ width: "30px" }} // Adjust the width as needed
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="form-control text-center"
                    value="1"
                    readOnly
                    style={{ width: "40px" }} // Adjust the width as needed
                  />
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    type="button"
                    style={{ width: "30px" }} // Adjust the width as needed
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="d-flex flex-column">
                <div className="text-lg fw-bold mt-3">Price</div>
                <div id="Element1" className="text-xl">
                  ₹ 2599.00{" "}
                </div>
              </div>
              <div className="d-flex flex-column align-items-center">
                <div className="text-lg fw-bold mt-3">Actions</div>
                <div>
                  <AiFillCloseCircle
                    size={24} // Adjust the size as needed
                    className="cursor-pointer"
                    style={{ color: "red" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="danger" />

      <div className="row mt-3">
        <div className="col-12">
          <div className="mb-3">
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <img
                  src="https://file.rendit.io/n/ma4QGxp4s7k1rfz0ghct.png"
                  alt="Frame3"
                  className="w-50 rounded" // Set the width of the image and add rounded corners
                />
                <div className="d-flex flex-column ml-3">
                  <div
                    className="text-lg fw-bold mb-1"
                    style={{ color: "#333" }}
                  >
                    Product
                  </div>
                  <div className="text-xl" style={{ color: "#666" }}>
                    Bridal wear
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column align-items-center">
                <div className="text-lg fw-bold mt-3">Quantity</div>
                <div className="input-group">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    type="button"
                    style={{ width: "30px" }} // Adjust the width as needed
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="form-control text-center"
                    value="1"
                    readOnly
                    style={{ width: "40px" }} // Adjust the width as needed
                  />
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    type="button"
                    style={{ width: "30px" }} // Adjust the width as needed
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="d-flex flex-column">
                <div className="text-lg fw-bold mt-3">Price</div>
                <div id="Element2" className="text-xl">
                  ₹ 2599.00{" "}
                </div>
              </div>
              <div className="d-flex flex-column align-items-center">
                <div className="text-lg fw-bold mt-3">Actions</div>
                <div>
                  <AiFillCloseCircle
                    size={24} // Adjust the size as needed
                    className="cursor-pointer"
                    style={{ color: "red" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="danger" />

      {/* Continue Shopping and Total Cost & Checkout */}
      <div className="row mt-4 mb-4">
        {/* Continue Shopping and Total Cost & Checkout */}
        <div className="col-12 d-flex justify-content-center">
          <div className="mb-2">
            <div className="d-flex justify-content-between">
              <div className="text-lg fw-medium"></div>
              <div className="text-lg fw-bold" style={{ marginLeft: "600px" }}>
                Total: ₹ 5198.00
              </div>
            </div>
          </div>
        </div>
        <hr className="danger" />
        {/* Continue Shopping and Checkout */}
        <div className="col-12">
          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex flex-column">
                <div className="text-lg fw-medium pr-3">Continue Shopping</div>
              </div>
              <div className="d-flex flex-row">
                <div className="text-lg fw-bold"></div>
                <button className="btn btn-warning ml-3">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
