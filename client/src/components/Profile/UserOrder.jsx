import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";

const UserOrders = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);
  const [cartDetails, setCartDetails] = useState({});
  const [addressResponse, setAddressResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
        // Retrieve user ID from sessionStorage
        const storedUser = JSON.parse(sessionStorage.getItem("user"));
        const storedUserId = storedUser.user._id;

        if (storedUserId) {
          setUserId(storedUserId);

          const ordersResponse = await axios.get(
            `https://server.sharetravel.in/orders/user/${storedUserId}`
          );

          if (
            Array.isArray(ordersResponse.data.orders) &&
            ordersResponse.data.orders.length > 0
          ) {
            const firstOrder = ordersResponse.data.orders[0];
            setOrdersData(ordersResponse.data.orders);
            setUserData(firstOrder.user); // Use user data directly from the order
          } else {
            console.warn("No orders found in the response.");
          }
        } else {
          console.warn("User ID not found in sessionStorage.");
        }
      } catch (error) {
        console.error("Error fetching order and user data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      if (ordersData.length === 0) return;

      const cartIds = ordersData
        .flatMap((orderGroup) =>
          orderGroup.orders.map((order) => order.cartIds).flat()
        )
        .filter((cartId, index, array) => array.indexOf(cartId) === index);

      try {
        const cartDetailsMap = await fetchCartDetails(cartIds);
        setCartDetails(cartDetailsMap);

        // Iterate through all orders in ordersData
        for (const orderGroup of ordersData) {
          for (const order of orderGroup.orders) {
            const addressId = order.addressId;
            console.log("this is addressId", addressId);

            const response = await axios.get(
              `https://server.sharetravel.in/addresses/${addressId}`
            );

            setAddressResponse(response.data);
            console.log(`Address details for ${addressId}:`, response.data);
          }
        }
      } catch (error) {
        console.error("Error fetching cart and address details:", error);
        setError(error);
      }
    };

    fetchDetails();
  }, [ordersData]);

  const handleCancelOrder = (orderId) => {
    console.log(`Cancel order with ID: ${orderId}`);
  };

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h2" align="center" sx={{ mb: 4 }}>
          User Orders
        </Typography>

        {userData && (
          <Card sx={{ mb: 4 }}>
            <CardContent>
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
          </Card>
        )}

        {addressResponse && (
          <Card sx={{ mb: 4 }}>
            <CardContent>
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

        {ordersData.map((orderGroup) => (
          <Card key={orderGroup._id} sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h3" sx={{ mb: 2 }}>
                Order Group ID: {orderGroup._id}
              </Typography>
              <ul>
                {Array.isArray(orderGroup.orders) &&
                  orderGroup.orders.map((order) => (
                    <li key={order._id} sx={{ mb: 2 }}>
                      <Typography variant="h5" sx={{ mb: 2 }}>
                        Order ID: {order._id}
                      </Typography>
                      <Typography>
                        <strong>Address ID:</strong> {order.addressId}
                      </Typography>
                      {addressResponse && (
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
                      )}
                      <Typography>
                        <strong>Total Amount:</strong> {order.totalAmount}
                      </Typography>
                      <Typography>
                        <strong>Payment:</strong> {order.payment}
                      </Typography>
                      <Typography>
                        <strong>Order Status:</strong> {order.orderStatus}
                      </Typography>
                      <Typography>
                        <strong>Cart IDs:</strong>{" "}
                        {order.cartIds.map((cartId) => (
                          <span key={cartId} sx={{ display: "block" }}>
                            {cartId} - {cartDetails[cartId]?.itemname || "N/A"}
                            <br />
                            <strong>Category:</strong>{" "}
                            {cartDetails[cartId]?.category || "N/A"}
                            <br />
                            <strong>Code:</strong>{" "}
                            {cartDetails[cartId]?.code || "N/A"}
                            <br />
                            <strong>Description:</strong>{" "}
                            {cartDetails[cartId]?.description || "N/A"}
                            <br />
                            <strong>Fabric:</strong>{" "}
                            {cartDetails[cartId]?.fabric || "N/A"}
                            <br />
                            <strong>Item ID:</strong>{" "}
                            {cartDetails[cartId]?.itemId || "N/A"}
                            <br />
                            <img
                              src={`data:image/png;base64,${cartDetails[cartId]?.itemImage1}`}
                              alt={`Item ${cartId}`}
                              style={{ maxWidth: "100px", marginBottom: "8px" }}
                            />
                          </span>
                        ))}
                      </Typography>
                      <div>
                        <Button
                          variant="contained"
                          color="error"
                          sx={{ marginRight: 1 }}
                          onClick={() => handleCancelOrder(order._id)}
                        >
                          Cancel order
                        </Button>
                      </div>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default UserOrders;
