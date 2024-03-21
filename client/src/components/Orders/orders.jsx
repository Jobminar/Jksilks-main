import React, { useEffect, useState } from "react";
import axios from "axios";
import "./orders.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Ordersummary = () => {
  const navigate = useNavigate();
  const [cartDataid, setCartDataid] = useState([]);

  // get items
  useEffect(() => {
    // Fetch data from the API
    const user = JSON.parse(sessionStorage.getItem("user"));
    const userId = user && user.user._id;

    if (userId) {
      // Make a GET request to the /getCartByUserId/:userId endpoint
      fetch(`https://jk-skills.onrender.com/getCartByUserId/${userId}`)
        .then((response) => {
          // Check if the request was successful (status code 2xx)
          if (response.ok) {
            return response.json();
          } else {
            // Handle errors for unsuccessful requests
            throw new Error(
              `Error: ${response.status} - ${response.statusText}`
            );
          }
        })
        .then((cartItems) => {
          // Handle the response data (cartItems) as needed
          console.log(cartItems);

          // Extracting _id from cartItems and storing in cartItemid state
          const cartItemIds = cartItems.map((item) => item._id);
          setCartDataid(cartItemIds);
        })
        .catch((error) => {
          // Handle errors during the fetch operation
          console.error("Fetch error:", error);
        });
    } else {
      console.error("User not logged in");
      // Handle not logged in scenario
    }
  }, []);

  return (
    <>
      <Navbar />
      <ul>
        <p>{JSON.stringify(cartDataid, null, 2)}</p>
      </ul>
    </>
  );
};

export default Ordersummary;
