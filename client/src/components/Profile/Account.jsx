import { useState } from "react";
import {
  Container,
  Button,
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import PreviousOrders from "./PreviousOrder";
import UserOrders from "./UserOrder";
import { MdClose, MdHistory, MdShoppingCart } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Account = () => {
  const [showPreviousOrders, setShowPreviousOrders] = useState(false);
  const [showUserOrders, setShowUserOrders] = useState(false);

  const togglePreviousOrders = () => {
    setShowPreviousOrders((prev) => !prev);
    setShowUserOrders(false); // Close UserOrders when showing PreviousOrders
  };

  const toggleUserOrders = () => {
    setShowUserOrders((prev) => !prev);
    setShowPreviousOrders(false); // Close PreviousOrders when showing UserOrders
  };

  // Retrieve user details from sessionStorage
  const storedUser = JSON.parse(sessionStorage.getItem("user"));
  const cardStyle = {
    border: "3px solid",
    borderImage:
      "linear-gradient(to right, #ff0000, #ffffff, #ffffff, #ffffff, #ffffff, #ffffff, #ff00ff)",
    borderRadius: "10px",
    boxShadow: "5px 5px 10px #888888",
    marginTop: "4%",
  };
  const style = {
    fontFamily: "Sail", // Use the sail font
    display: "flex", // Use flexbox layout
    flexDirection: "row", // Arrange the items in a row
    flexWrap: "wrap", // Allow the items to wrap to the next line
    justifyContent: "space-between", // Distribute the space between the items evenly
  };

  // Define a custom style for the edit icon
  const iconStyle = {
    color: "red", // Use blue color for the icon
    marginLeft: "10px", // Add some margin to the left of the icon
  };

  // Define a function to handle the edit action
  const handleEdit = () => {
    // Do something when the user clicks on the edit icon
    console.log("Edit");
  };
  return (
    <Container maxWidth="md" style={{ marginTop: "5%" }}>
      <Typography
        variant="h2"
        align="center"
        style={{ marginBottom: "4%", fontFamily: "Lato, sans-serif" }}
      >
        ACCOUNT
      </Typography>

      <Button
        variant="contained"
        style={{ backgroundColor: "tomato", color: "#fff", marginRight: "2%" }} // Set background color to tomato red
        onClick={togglePreviousOrders}
      >
        {showPreviousOrders ? <MdClose /> : <MdHistory />}
      </Button>
      <Button
        variant="contained"
        style={{ backgroundColor: "tomato", color: "#fff" }} // Set background color to tomato red
        onClick={toggleUserOrders}
      >
        {showUserOrders ? <MdClose /> : <MdShoppingCart />}
      </Button>

      <Dialog open={showPreviousOrders} onClose={togglePreviousOrders}>
        <DialogTitle>Previous Orders</DialogTitle>
        <DialogContent>
          <PreviousOrders />
        </DialogContent>
        <DialogActions>
          <Button onClick={togglePreviousOrders} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showUserOrders} onClose={toggleUserOrders}>
        <DialogTitle>User Orders</DialogTitle>
        <DialogContent>
          <UserOrders />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleUserOrders} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {storedUser && (
        <Card variant="outlined" style={cardStyle}>
          <CardContent style={{ ...style, flexDirection: "column" }}>
            <Typography variant="h5" style={{ marginBottom: "2%" }}>
              User Details
            </Typography>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <Typography>
                  <strong>Full Name:</strong>
                </Typography>
                <Typography>{storedUser.user.fullName}</Typography>
              </div>
              <FaEdit style={iconStyle} onClick={handleEdit} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <Typography>
                  <strong>Email:</strong>
                </Typography>
                <Typography>{storedUser.user.email}</Typography>
              </div>
              <FaEdit style={iconStyle} onClick={handleEdit} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <Typography>
                  <strong>Gender:</strong>
                </Typography>
                <Typography>{storedUser.user.gender}</Typography>
              </div>
              <FaEdit style={iconStyle} onClick={handleEdit} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <Typography>
                  <strong>Date of Birth:</strong>
                </Typography>
                <Typography>
                  {new Date(storedUser.user.dateOfBirth).toLocaleDateString()}
                </Typography>
              </div>
              <FaEdit style={iconStyle} onClick={handleEdit} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <Typography>
                  <strong>Location:</strong>
                </Typography>
                <Typography>{storedUser.user.location}</Typography>
              </div>
              <FaEdit style={iconStyle} onClick={handleEdit} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <Typography>
                  <strong>Mobile Number:</strong>
                </Typography>
                <Typography>{storedUser.user.mobileNumber}</Typography>
              </div>
              <FaEdit style={iconStyle} onClick={handleEdit} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <Typography>
                  <strong>Alternate Number:</strong>
                </Typography>
                <Typography>
                  {storedUser.user.alternateNumber || "N/A"}
                </Typography>
              </div>
              <FaEdit style={iconStyle} onClick={handleEdit} />
            </div>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Account;
