import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";

const OrdersPopup = ({ userId, addressId, cartId, onClose }) => {
  const [userData, setUserData] = useState(null);
  const [addressData, setAddressData] = useState(null);
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await axios.get(
          `https://jk-skills.onrender.com/users/${userId}`
        );
        setUserData(userResponse.data);

        // Fetch address data
        const addressResponse = await axios.get(
          `https://jk-skills.onrender.com/addresses/${addressId}`
        );
        setAddressData(addressResponse.data);

        // Fetch cart data
        const cartResponse = await axios.get(
          `https://jk-skills.onrender.com/carts/${cartId}`
        );
        setCartData(cartResponse.data);
      } catch (error) {
        console.error("Error fetching user, address, or cart data:", error);
      }
    };

    fetchData();
  }, [userId, addressId, cartId]);

  return (
    <Dialog
      open={true}
      onClose={onClose}
      style={{ maxWidth: "800px", margin: "auto" }}
    >
      <DialogTitle
        style={{
          backgroundColor: "#55efc4",
          color: "#2d3436",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: "1.5em" }}>Order Details</span>
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          style={{ marginLeft: "10px" }}
        >
          Close
        </Button>
      </DialogTitle>
      <DialogContent
        style={{
          padding: "20px",
          backgroundColor: "#dfe6e9",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        {userData && (
          <>
            <div>
              <Typography variant="h5" style={{ color: "#2d3436" }}>
                User Details
              </Typography>

              <Typography style={{ color: "#2d3436" }}>
                <strong>Full Name:</strong>
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                <strong>Mobile Number:</strong>
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                <strong>Email:</strong>
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                <strong>Gender:</strong>
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                <strong>Date of Birth:</strong>
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                <strong>Location:</strong>
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                <strong>Alternate Number:</strong>
              </Typography>
              {/* Add more labels here as needed */}
            </div>
            <div style={{ marginTop: "30px" }}>
              <Typography style={{ color: "#2d3436" }}>
                {userData.fullName}
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                {userData.mobileNumber}
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                {userData.email}
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                {userData.gender}
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                {userData.dateOfBirth}
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                {userData.location}
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                {userData.alternateNumber}
              </Typography>
              {/* Add more values here as needed */}
            </div>
          </>
        )}

        {addressData && (
          <>
            <div>
              <Typography variant="h5" style={{ color: "#2d3436" }}>
                Address Details
              </Typography>

              <Typography style={{ color: "#2d3436" }}>
                <strong>User Name:</strong>
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                <strong>Mobile Number:</strong>
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                <strong>House Number:</strong>
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                <strong>Street:</strong>
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                <strong>Landmark:</strong>
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                <strong>Pincode:</strong>
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                <strong>State:</strong>
              </Typography>
              {/* Add more labels here as needed */}
            </div>
            <div style={{ marginTop: "30px" }}>
              <Typography style={{ color: "#2d3436" }}>
                {addressData.userName}
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                {addressData.mobileNumber}
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                {addressData.houseNumber}
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                {addressData.street}
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                {addressData.landmark}
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                {addressData.pincode}
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                {addressData.state}
              </Typography>
              {/* Add more values here as needed */}
            </div>
          </>
        )}

        {cartData && (
          <>
            <div>
              <Typography variant="h5" style={{ color: "#2d3436" }}>
                Cart Details
              </Typography>
              <div>
                <Typography style={{ color: "#2d3436" }}>
                  {cartData.itemImage1 && (
                    <img
                      src={`data:image/png;base64,${cartData.itemImage1}`}
                      alt="Item"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "200px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </Typography>
                <Typography style={{ color: "#2d3436" }}>
                  <strong>Item Image:</strong>
                </Typography>
                <Typography style={{ color: "#2d3436" }}>
                  <strong>Category:</strong>
                </Typography>
                <Typography style={{ color: "#2d3436" }}>
                  <strong>Item Name:</strong>
                </Typography>
                <Typography style={{ color: "#2d3436" }}>
                  <strong>Price:</strong>
                </Typography>
                <Typography style={{ color: "#2d3436" }}>
                  <strong>Code:</strong>
                </Typography>
                <Typography style={{ color: "#2d3436" }}>
                  <strong>Stitching Options:</strong>
                </Typography>
                <Typography style={{ color: "#2d3436" }}>
                  <strong>Fabric:</strong>
                </Typography>
                <Typography style={{ color: "#2d3436" }}>
                  <strong>Wash Care:</strong>
                </Typography>
                <Typography style={{ color: "#2d3436" }}>
                  <strong>Length:</strong>
                </Typography>
                <Typography style={{ color: "#2d3436" }}>
                  <strong>Description:</strong>
                </Typography>

                <Typography style={{ color: "#2d3436" }}>
                  <strong>Quantity:</strong>
                </Typography>
                <Typography style={{ color: "#2d3436" }}>
                  <strong>Item ID:</strong>
                </Typography>
              </div>
              {/* Add more labels here as needed */}
            </div>
            <div style={{ marginTop: "260px" }}>
              <Typography style={{ color: "#2d3436" }}>
                {cartData.category}
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                {cartData.itemname}
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                {cartData.price}
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                {cartData.code}
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                {cartData.stitchingOptions}
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                {cartData.fabric}
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                {cartData.washCare}
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                {cartData.length}
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                {cartData.description}
              </Typography>

              <Typography style={{ color: "#2d3436" }}>
                {cartData.quantity}
              </Typography>
              <Typography style={{ color: "#2d3436" }}>
                {cartData.itemId}
              </Typography>
              {/* Add more values here as needed */}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

OrdersPopup.propTypes = {
  userId: PropTypes.string.isRequired,
  addressId: PropTypes.string.isRequired,
  cartId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default OrdersPopup;
