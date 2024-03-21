import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./addresses.css"; // Importing old styling

const Address = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    house: "",
    village: "",
    landmark: "",
    pincode: "",
    states: "",
  });

  const [isVisible, setIsVisible] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleChangedropdown = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUseAddress = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const userId = user && user.user._id;

      const response = await axios.post(
        "https://jk-skills.onrender.com/create-address",
        {
          userId: userId,
          userName: formData.name,
          mobileNumber: formData.mobileNumber,
          houseNumber: formData.house,
          street: formData.village,
          landmark: formData.landmark,
          pincode: formData.pincode,
          state: formData.states,
        }
      );

      if (response.status === 201) {
        console.log("Address created successfully:", response.data);
        alert("Address added successfully");
        setFormData({
          name: "",
          mobileNumber: "",
          house: "",
          village: "",
          landmark: "",
          pincode: "",
          states: "",
        });
        toggleVisibility();
        fetchAddresses(userId);
      } else {
        throw new Error("Failed to create address.");
      }
    } catch (error) {
      console.error("Error creating address:", error);
      alert("Error adding address. Please try again later.");
    }
  };

  const fetchAddresses = async (userId) => {
    try {
      const response = await axios.get(
        `https://jk-skills.onrender.com/addresses/user/${userId}`
      );
      setAddresses(response.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      alert("Error fetching addresses. Please try again later.");
    }
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const userId = user && user.user._id;
    if (userId) {
      fetchAddresses(userId);
    }
  }, []);

  const handleDeleteAddress = async (addressId) => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const userId = user && user.user._id;

      const response = await axios.delete(
        "https://jk-skills.onrender.com/delete-address",
        {
          data: { userId: userId, addressId: addressId },
        }
      );

      if (response.status === 200) {
        console.log("Address deleted successfully.");
        alert("Address deleted successfully.");
        fetchAddresses(userId);
      } else {
        throw new Error("Failed to delete address.");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Error deleting address. Please try again later.");
    }
  };

  const handleDelivery = async (addressId) => {
    // Your delivery logic here
  };

  return (
    <>
      <Navbar />
      <div className="getaddresses">
        {addresses &&
          addresses.map((address) => (
            <div key={address._id} className="addresses-sub-con">
              <p style={{ fontWeight: "bold" }}>{address.userName}</p>
              <p>{address.houseNumber}</p>
              <p>{address.street}</p>
              <p>{address.landmark}</p>
              <p>{address.pincode}</p>
              <p>{address.state}</p>
              <p>Phone number: {address.mobileNumber}</p>
              <div className="deliver-add">
                <button onClick={() => handleDelivery(address._id)}>
                  Deliver to this address
                </button>
              </div>
              <div className="edit-add">
                <button onClick={() => handleDeleteAddress(address._id)}>
                  Delete this address
                </button>
              </div>
            </div>
          ))}
      </div>

      <div className="addnew-address-button">
        <button onClick={toggleVisibility}>Add new address</button>
      </div>

      {isVisible && (
        <div className="content">
          <DialogTitle>Add new address</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Fullname (First and Last name)"
              type="text"
              fullWidth
              variant="standard"
              value={formData.name}
              onChange={handleChange}
            />
            {/* Add other TextField components */}
          </DialogContent>
          <DialogActions className="formbuttons">
            <Button onClick={handleUseAddress}>Use this address</Button>
          </DialogActions>
        </div>
      )}
    </>
  );
};

export default Address;
