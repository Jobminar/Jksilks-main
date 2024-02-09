import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Container,
  Grid,
  Stack,
  Button,
} from "@mui/material";

const PreviousOrders = () => {
  // Get userId from sessionStorage
  const userIdFromSessionStorage = sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user")).user?._id
    : null;

  const [userId, setUserId] = useState(userIdFromSessionStorage);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString());
  const [previousOrders, setPreviousOrders] = useState([]);

  const getPreviousOrders = async () => {
    try {
      const response = await axios.post(
        "https://server.sharetravel.in/orders/previous",
        { userId, currentDate }
      );

      if (response.data.orders) {
        // Check for existence of orders
        setPreviousOrders(response.data.orders);
      } else {
        // Handle empty orders or API error
        console.error("No orders found in API response.");
      }
    } catch (error) {
      console.error("Error fetching previous orders:", error);
    }
  };

  useEffect(() => {
    getPreviousOrders();
  }, []); // Fetch orders on component mount

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Previous Orders
      </Typography>
      {previousOrders.length > 0 ? (
        <List dense>
          {previousOrders.map((order) => (
            <ListItem key={order._id.$oid}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <ListItemText
                    primary={`Order ID: ${order._id.$oid}`}
                    secondary={
                      order.orders?.[0] ? ( // Handle potential undefined
                        <Stack spacing={0.5}>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            Total Amount:{" "}
                            {order.orders[0].totalAmount.$numberInt}
                          </Typography>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            Payment Status: {order.orders[0].payment}
                          </Typography>
                        </Stack>
                      ) : (
                        <Typography variant="body2" color="error">
                          Order details unavailable.
                        </Typography>
                      )
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <ListItemSecondaryAction>
                    {/* Include optional buttons based on your application logic */}
                    <Button size="small" variant="contained" color="primary">
                      View Details
                    </Button>
                    {/* Add more buttons as needed */}
                  </ListItemSecondaryAction>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">No previous orders found.</Typography>
      )}
    </Container>
  );
};

export default PreviousOrders;
