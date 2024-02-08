import React, { useState, useEffect } from "react";
import axios from "axios";
import Adminheader from "../adminheader";
import './Adminorders.css'
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";

const Adminorders = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);
  const [cartDetails, setCartDetails] = useState({});
  const [addressResponse, setAddressResponse] = useState(null);

  const fetchCartDetails = async (cartIds) => {
    const promises = cartIds.map(async (cartId) => {
      try {
        const cartResponse = await axios.get(
          `https://jk-skills.onrender.com/carts/${cartId}`
        );

        console.log(`Cart details for ${cartId}:`, cartResponse.data);

        return { [cartId]: cartResponse.data };
      } catch (error) {
        console.error(`Error fetching cart details for ${cartId}:`, error);
        return { [cartId]: null };
      }
    });

    const results = await Promise.all(promises);

    return results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await axios.get(
          "https://jk-skills.onrender.com/orders/all"
        );

        if (
          Array.isArray(ordersResponse.data.orders) &&
          ordersResponse.data.orders.length > 0
        ) {
          const firstOrder = ordersResponse.data.orders;
          setUserId(firstOrder.userId);
          setOrdersData(ordersResponse.data.orders);

          const userResponse = await axios.get(
            `https://jk-skills.onrender.com/users/${firstOrder.userId}`
          );
          setUserData(userResponse.data);
        } else {
          console.warn("No orders found in the response.");
        }
      } catch (error) {
        console.error("Error fetching order and user data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      const cartIds = ordersData
        .flatMap((orderGroup) =>
          orderGroup.orders.map((order) => order.cartIds).flat()
        )
        .filter((cartId, index, array) => array.indexOf(cartId) === index);

      try {
        const cartDetailsMap = await fetchCartDetails(cartIds);
        setCartDetails(cartDetailsMap);

        const firstOrder = ordersData[0];

        if (firstOrder && firstOrder.orders.length > 0) {
          const addressId = firstOrder.orders[0].addressId;
          console.log("this is addressId", addressId);

          const response = await axios.get(
            `https://jk-skills.onrender.com/addresses/${addressId}`
          );

          setAddressResponse(response.data);
          console.log(`Address details for ${addressId}:`, response.data);
        } else {
          console.warn(
            "Address ID is undefined or missing in the first order or orders array is empty."
          );
        }
      } catch (error) {
        console.error("Error fetching cart and address details:", error);
      }
    };

    if (ordersData.length > 0) {
      fetchDetails();
    }
  }, [ordersData]);

  // const handleCancelOrder = (orderId) => {
  //   console.log(`Cancel order with ID: ${orderId}`);
  // };

  // const handleRefundOrder = (orderId) => {
  //   console.log(`Refund order with ID: ${orderId}`);
  // };

  // const handleUpdateOrder = (orderId) => {
  //   console.log(`Update order with ID: ${orderId}`);
  // };

  return (
    <>
      <Adminheader />
      <div className="orders-main-con">
       <div className="user-address-details">
       <div className="orders-user-con">
          {userData && (
          
              <CardContent className="orders-user-sub-con">
                <Typography variant="h3" sx={{ mb: 2 }}>
                  User Details
                </Typography>
                <Typography>
                  <strong>Full Name:</strong> {userData.fullName}
                </Typography>
                <Typography>
                  <strong>Mobile Number:</strong> {userData.mobileNumber}
                </Typography>
                <Typography>
                  <strong>Email:</strong> {userData.email}
                </Typography>
                <Typography>
                  <strong>Gender:</strong> {userData.gender}
                </Typography>
                <Typography>
                  <strong>Date of Birth:</strong>{" "}
                  {new Date(userData.dateOfBirth.$date).toLocaleDateString()}
                </Typography>
                <Typography>
                  <strong>Location:</strong> {userData.location}
                </Typography>
                <Typography>
                  <strong>Alternate Number:</strong>{" "}
                  {userData.alternateNumber || "N/A"}
                </Typography>
              </CardContent>
          )}
        </div>
        <div className="orders-address-main-con">
        {addressResponse && (
            <Card sx={{ mb: 4 }}>
              <CardContent className="orders-address-sub-con">
                <Typography variant="h3" sx={{ mb: 2 }}>
                  Address Details
                </Typography>
                <Typography>
                  <strong>User Name:</strong> {addressResponse.userName}
                </Typography>
                <Typography>
                  <strong>Mobile Number:</strong> {addressResponse.mobileNumber}
                </Typography>
                <Typography>
                  <strong>House Number:</strong> {addressResponse.houseNumber}
                </Typography>
                <Typography>
                  <strong>Street:</strong> {addressResponse.street}
                </Typography>
                <Typography>
                  <strong>Landmark:</strong> {addressResponse.landmark}
                </Typography>
                <Typography>
                  <strong>Pincode:</strong> {addressResponse.pincode}
                </Typography>
                <Typography>
                  <strong>State:</strong> {addressResponse.state}
                </Typography>
              </CardContent>
            </Card>
          )}
        </div>
       </div>
        
        <div className="orders-order-main-con">
          {ordersData.map((orderGroup) => (
              <Card key={orderGroup._id} sx={{ mb: 4 }}>
                <CardContent className="orders-order-sub-con">
                  {/* <Typography variant="h3" sx={{ mb: 2 }}>
                    Order Group ID: {orderGroup._id}
                  </Typography> */}
                  <ul>
                    {Array.isArray(orderGroup.orders) &&
                      orderGroup.orders.map((order) => (
                        <li key={order._id} sx={{ mb: 2 }}>
                          {/* <Typography variant="h5" sx={{ mb: 2 }}>
                            Order ID: {order._id}
                          </Typography>
                          <Typography>
                            <strong>Address ID:</strong> {order.addressId}
                          </Typography> */}
                          {/* {addressResponse && (
                            <div>
                              <Typography variant="h6" sx={{ mb: 1 }}>
                                Address Details
                              </Typography>
                              <Typography>
                                <strong>House Number:</strong>{" "}
                                {addressResponse.houseNumber}
                              </Typography>
                              <Typography>
                                <strong>Street:</strong> {addressResponse.street}
                              </Typography>
                              <Typography>
                                <strong>Landmark:</strong>{" "}
                                {addressResponse.landmark}
                              </Typography>
                              <Typography>
                                <strong>Pincode:</strong> {addressResponse.pincode}
                              </Typography>
                              <Typography>
                                <strong>State:</strong> {addressResponse.state}
                              </Typography>
                            </div>
                          )} */}
                          {/* <Typography>
                            <strong>Total Amount:</strong> {order.totalAmount}
                          </Typography>
                          <Typography>
                            <strong>Payment:</strong> {order.payment}
                          </Typography>
                          <Typography>
                            <strong>Order Status:</strong> {order.orderStatus}
                          </Typography> */}
                          <div className="order-details-con">
                            <strong>Cart IDs:</strong>{" "}
                            {order.cartIds.map((cartId) => (
                              <div key={cartId} sx={{ display: "block" }} className="order-details-sub-con">
                                <img
                                  src={`data:image/png;base64,${cartDetails[cartId]?.itemImage1}`}
                                  alt={`Item ${cartId}`}
                                  style={{ maxWidth: "100px", marginBottom: "8px" }}
                                />
                                <div>
                                    <div>Category:  {cartDetails[cartId]?.category || "N/A"}</div>
                                    <div>Item Name:  {cartDetails[cartId]?.itemname || "N/A"}</div>
                                </div>
                                <div>
                                   <div>Length:  {cartDetails[cartId]?.length || "N/A"}</div>
                                    <div>Washcare:  {cartDetails[cartId]?.washCare || "N/A"}</div>
                                    <div>Fabric:  {cartDetails[cartId]?.fabric || "N/A"}</div>

                                </div>
                                <div>
                                  <div>Code:  {cartDetails[cartId]?.code || "N/A"}</div>
                                  <div>Description: {cartDetails[cartId]?.description || "N/A"}</div>
                                  <div>Item ID: {cartDetails[cartId]?.itemId || "N/A"}</div>
                                </div>
                               
                                
                              </div>
                            ))}
                          </div>
                          <div>
                            <Button
                              variant="contained"
                              color="error"
                              sx={{ marginRight: 1 }}
                              onClick={() => handleCancelOrder(order._id)}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="contained"
                              color="warning"
                              sx={{ marginRight: 1 }}
                              onClick={() => handleRefundOrder(order._id)}
                            >
                              Refund
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleUpdateOrder(order._id)}
                            >
                              Update
                            </Button>
                          </div>
                        </li>
                      ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    


    </>
  );
};

export default Adminorders;
