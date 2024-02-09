import React, { useState, useEffect } from "react";
import axios from "axios";
import Adminheader from "../adminheader";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";

import OrdersPopup from "./OrdersPopup";
const Adminorders = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewOrder = (userId, addressId, cartId) => {
    setSelectedOrder({ userId, addressId, cartId });
  };

  const handleClosePopup = () => {
    setSelectedOrder(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await axios.get(
          "https://server.sharetravel.in/orders/all"
        );

        console.log("Orders Response:", ordersResponse.data);

        if (
          Array.isArray(ordersResponse.data.orders) &&
          ordersResponse.data.orders.length > 0
        ) {
          setOrdersData(ordersResponse.data.orders);
        } else {
          console.warn("No orders found in the response.");
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchData();
  }, []);

  const renderOrders = (orders) => {
    return (
      <ul style={{ maxWidth: "800px", margin: "0 auto" }}>
        {orders.map((orderGroup) => (
          <li key={orderGroup._id} style={{ marginBottom: "20px" }}>
            <Card>
              <CardContent>
                <Typography
                  style={{
                    color: "#333",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  <strong>Date of order:</strong> {orderGroup.createdAt}
                </Typography>
                {Array.isArray(orderGroup.orders) &&
                  orderGroup.orders.map((order) => (
                    <div key={order._id} style={{ marginBottom: "10px" }}>
                      <Typography
                        variant="h6"
                        style={{
                          color: "#333",
                          fontFamily: "Arial, sans-serif",
                          fontSize: "16px",
                          fontWeight: "normal",
                        }}
                      >
                        Order ID: {order._id}
                      </Typography>

                      <Typography
                        style={{
                          color: "#333",
                          fontFamily: "Arial, sans-serif",
                          fontSize: "14px",
                          fontWeight: "normal",
                        }}
                      >
                        <strong>Total Amount:</strong> {order.totalAmount}
                      </Typography>
                      <Typography
                        style={{
                          color: "#333",
                          fontFamily: "Arial, sans-serif",
                          fontSize: "14px",
                          fontWeight: "normal",
                        }}
                      >
                        <strong>Payment:</strong> {order.payment}
                      </Typography>
                      <Typography
                        style={{
                          color:
                            order.orderStatus === "Completed" ? "green" : "red",
                          fontFamily: "Arial, sans-serif",
                          fontSize: "14px",
                          fontWeight: "normal",
                        }}
                      >
                        <strong>Order Status:</strong> {order.orderStatus}
                      </Typography>
                      <Typography
                        style={{
                          color: "#333",
                          fontFamily: "Arial, sans-serif",
                          fontSize: "14px",
                          fontWeight: "normal",
                        }}
                      >
                        <strong>Cart IDs:</strong>{" "}
                        {order.cartIds.map((cartId) => (
                          <span
                            key={cartId}
                            style={{ display: "block", color: "#555" }}
                          >
                            {cartId}
                          </span>
                        ))}
                      </Typography>
                      {order.orders && renderOrders(order.orders)}
                      {order.cartIds.map((cartId) => (
                        <div key={cartId} style={{ display: "block" }}>
                          {cartId}
                          <Button
                            variant="contained"
                            color="primary"
                            style={{
                              backgroundColor: "#007bff",
                              color: "white",
                              border: "none",
                              padding: "10px 20px",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handleViewOrder(
                                orderGroup.userId,
                                order.addressId,
                                cartId
                              )
                            }
                          >
                            View Order
                          </Button>
                        </div>
                      ))}
                    </div>
                  ))}
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Adminheader />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h2" align="center" sx={{ mb: 4 }}>
          User Orders
        </Typography>
        {renderOrders(ordersData)}
        {selectedOrder && (
          <OrdersPopup
            userId={selectedOrder.userId}
            addressId={selectedOrder.addressId}
            cartId={selectedOrder.cartId}
            onClose={handleClosePopup}
          />
        )}
      </Container>
    </>
  );
};

export default Adminorders;
