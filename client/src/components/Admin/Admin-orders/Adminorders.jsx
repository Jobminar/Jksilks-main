import React, { useState, useEffect } from "react";
import axios from "axios";
import Adminheader from "../adminheader";

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

        // Log the cartId and its response data
        console.log(`Cart details for ${cartId}:`, cartResponse.data);

        return { [cartId]: cartResponse.data };
      } catch (error) {
        console.error(`Error fetching cart details for ${cartId}:`, error);
        return { [cartId]: null };
      }
    });

    // Wait for all promises to resolve
    const results = await Promise.all(promises);

    // Merge individual cart details into a single object
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
          const firstOrder = ordersResponse.data.orders[0];
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
  }, []); // Run the effect only once on mount

  // Inside the second useEffect
  useEffect(() => {
    const fetchDetails = async () => {
      // Fetch details for each cartId
      const cartIds = ordersData
        .flatMap((orderGroup) =>
          orderGroup.orders.map((order) => order.cartIds).flat()
        )
        .filter((cartId, index, array) => array.indexOf(cartId) === index);

      try {
        const cartDetailsMap = await fetchCartDetails(cartIds);
        setCartDetails(cartDetailsMap);

        // Fetch details for the first order's addressId
        const firstOrder = ordersData[0];

        if (firstOrder && firstOrder.orders.length > 0) {
          const addressId = firstOrder.orders[0].addressId;
          console.log("this is addressId", addressId);

          const response = await axios.get(
            `https://jk-skills.onrender.com/addresses/${addressId}`
          );

          setAddressResponse(response.data); // Update addressResponse state
          // Log the address response
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

  // Include ordersData in the dependency array

  const handleCancelOrder = (orderId) => {
    console.log(`Cancel order with ID: ${orderId}`);
  };

  const handleRefundOrder = (orderId) => {
    console.log(`Refund order with ID: ${orderId}`);
  };

  const handleUpdateOrder = (orderId) => {
    console.log(`Update order with ID: ${orderId}`);
  };

  return (
    <>
      <Adminheader />
      <div className="Adminorders-con">
        <h2>User Orders</h2>
        <p>
          <strong>User ID:</strong> {userId}
        </p>
        {userData && (
          <div className="user-details">
            <h3>User Details</h3>
            <p>
              <strong>Full Name:</strong> {userData.fullName}
            </p>
            <p>
              <strong>Mobile Number:</strong> {userData.mobileNumber}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Gender:</strong> {userData.gender}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {new Date(userData.dateOfBirth.$date).toLocaleDateString()}
            </p>
            <p>
              <strong>Location:</strong> {userData.location}
            </p>
            <p>
              <strong>Alternate Number:</strong>{" "}
              {userData.alternateNumber || "N/A"}
            </p>
            {/* Add more user details as needed */}
          </div>
        )}
        {ordersData.map((orderGroup) => (
          <div key={orderGroup._id} className="order-group">
            <h3>Order Group ID: {orderGroup._id}</h3>
            <h3>User ID: {orderGroup.userId}</h3>
            <ul className="order-list">
              {Array.isArray(orderGroup.orders) &&
                orderGroup.orders.map((order) => (
                  <li key={order._id} className="order-item">
                    <div className="order-details">
                      <p>
                        <strong>Order ID:</strong> {order._id}
                      </p>
                      <p>
                        <strong>Address ID:</strong> {order.addressId}
                      </p>
                      {/* Display address details if available */}
                      {addressResponse && (
                        <div className="address-details">
                          <h3>Address Details</h3>
                          <p>
                            <strong>User Name:</strong>{" "}
                            {addressResponse.userName}
                          </p>
                          <p>
                            <strong>Mobile Number:</strong>{" "}
                            {addressResponse.mobileNumber}
                          </p>
                          <p>
                            <strong>House Number:</strong>{" "}
                            {addressResponse.houseNumber}
                          </p>
                          <p>
                            <strong>Street:</strong> {addressResponse.street}
                          </p>
                          <p>
                            <strong>Landmark:</strong>{" "}
                            {addressResponse.landmark}
                          </p>
                          <p>
                            <strong>Pincode:</strong> {addressResponse.pincode}
                          </p>
                          <p>
                            <strong>State:</strong> {addressResponse.state}
                          </p>
                        </div>
                      )}
                      {/* Continue displaying other order details */}
                      <p>
                        <strong>Total Amount:</strong> {order.totalAmount}
                      </p>
                      <p>
                        <strong>Payment:</strong> {order.payment}
                      </p>
                      <p>
                        <strong>Order Status:</strong> {order.orderStatus}
                      </p>
                      <p>
                        <strong>Cart IDs:</strong>{" "}
                        {order.cartIds.map((cartId) => (
                          <span key={cartId}>
                            {cartId} - {cartDetails[cartId]?.itemname || "N/A"}
                            <br />
                            {/* Display other details */}
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
                              style={{ maxWidth: "100px" }} // Adjust the style as needed
                            />
                            <br />
                          </span>
                        ))}
                      </p>
                    </div>
                    <div className="order-actions">
                      <button onClick={() => handleCancelOrder(order._id)}>
                        Cancel
                      </button>
                      <button onClick={() => handleRefundOrder(order._id)}>
                        Refund
                      </button>
                      <button onClick={() => handleUpdateOrder(order._id)}>
                        Update
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default Adminorders;
