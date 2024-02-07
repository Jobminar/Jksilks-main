import React from 'react'
import { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import './addresses.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Address = () => {
  const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        mobileNumber: '',
        house: '',
        village: '',
        landmark: '',
        pincode: '',
        states: '',
      });
    
      const [isVisible, setIsVisible] = useState(false);
      const [cartDataid, setCartDataid] = useState([]);

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
      
    const handleUseAddress = () => {
        // Use formData as needed (e.g., send it to the server)
        console.log('Form Data:', formData);
    
        // Post the data to the backend
        const user = JSON.parse(sessionStorage.getItem("user"));
        const userId = user && user.user._id;
    
        const dataToSend = {
          userId: userId,
          userName: formData.name,
          mobileNumber: formData.mobileNumber,
          houseNumber: formData.house,
          street: formData.village,
          landmark: formData.landmark,
          pincode: formData.pincode,
          state: formData.states,
        };
    
        // Make a POST request to your backend API
        fetch('https://jk-skills.onrender.com/create-address', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to create address. Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            // Handle success (e.g., show a success message)
            console.log('Address created successfully:', data);
            alert('Address added successfully')
          })
          .catch(error => {
            console.error('Error creating address:', error);
            // Handle error (e.g., show an error message)
          });
      };
    //   fetching addresses

    const [data, setData] = useState(null);
    const user = JSON.parse(sessionStorage.getItem("user"));
    const userId = user && user.user._id;
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://jk-skills.onrender.com/addresses/user/${userId}`);
          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, [userId]);


     // handle delete
    const handleAddDelete = (itemid) => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const userId = user && user.user._id;
      const itemIdToDelete = itemid;
      console.log(userId ,   itemIdToDelete)
      // Data to send in the request body
      const dataToDelete = {
        userId: userId,
        addressId: itemIdToDelete
      };
      console.log(userId)
      // console.log(addressId)
      
      // Make a DELETE request to your backend API
      axios.delete('https://jk-skills.onrender.com/delete-address', { data: dataToDelete })
        .then(response => {
          // Handle success (e.g., show a success message)
          alert('Item successfully deleted from the cart!');
          // You might want to update your local state to reflect the removal
        })
        .catch(error => {
          // Handle error (e.g., show an error message)
          alert('Error deleting item from the cart!');
          console.error('Error deleting item:', error);
        });
    };

    // get cart data for ids
   
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
              throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
          })
          .then((cartItems) => {
            // Handle the response data (cartItems) as needed
            console.log(cartItems);
  
            // Extracting _id from cartItems and storing in cartItemid state
            const cartItemIds = cartItems.map(item => item._id);
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

    // handle delivery


    const handleDelivery = async () => {
      // Fetch data from the API
      const user = JSON.parse(sessionStorage.getItem("user"));
      const userId = user && user.user._id;
    
      const orderData = {
        userId: userId,
        addressId: "65c09202a333bf6b3e924dbf",
        cartIds: cartDataid,
        totalAmount: 50000,
        payment: "yes",
        orderStatus: "pending",
      };
      console.log(orderData);
      try {
        const response = await axios.post(
          "https://jk-skills.onrender.com/create-order",
          orderData
        );
    
        if (response.status==201) {
          console.log("Order successfully created:", response.data);
          alert("Order added successfully");
          navigate("/ordersummary");
        } else {
          console.error("Failed to create order. Status:", response.status);
          alert("Order failed. Please try again later.");
        }
      } catch (error) {
        console.error("Error creating order:", error.message);
        alert("Error creating order. Please try again later.");
      }
    };


  return (
    <>
     {/* get the addresses */}
     <div className='getaddresses'>
     {data && data.map((item, index) => (
     <div key={index} className='addresses-sub-con'>
      <p style={{fontWeight:'bold'}}>{item.userName}</p>
      <p>{item.houseNumber}</p>
      <p>{item.street}</p>
      <p>{item.Landmark}</p>
      <p>{item.pincode}</p>
      <p>{item.state}</p>
      <p>Phone number: {item.mobileNumber}</p>
      <div className='deliver-add'>
        <button onClick={handleDelivery}>
            Deliver to this address
        </button>
      </div>
      <div className='edit-add'>
        <button onClick={handleDelivery}>
            Delete this address
        </button>
      </div>
      
    </div>
  ))}
</div>

         
     <div className='addnew-address-button'>
        <button onClick={toggleVisibility}>
          Add new address
        </button>
      </div>
     {/* add new address */}
      {isVisible && <div className="content">
      <div >
            
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
                
                <TextField
                    autoFocus
                    margin="dense"
                    id="mobileNumber"
                    label="Mobile number"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="house"
                    label="Flat, House no, Building, Company , Apartment"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={formData.house}
                    onChange={handleChange}
                    
                />
                <TextField
                    autoFocus
                    // margin="dense"
                    id="village"
                    label="Area,street,Sector,Village"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={formData.village}
                    onChange={handleChange}

                />
                <TextField
                    autoFocus
                    // margin="dense"
                    id="landmark"
                    label="Landmark"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={formData.landmark}
                    onChange={handleChange}
                />
                <TextField
                    autoFocus
                    // margin="dense"
                    id="pincode"
                    label="Pincode"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={formData.pincode}
                    onChange={handleChange}
                />
                <TextField
                    select
                    value={formData.states}
                    onChange={handleChangedropdown}
                    variant="standard"
                    label="State"
                    id='states'  // Change this from 'state' to 'state'
                    name='states'
                    fullWidth
                    >
                
                        <MenuItem value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</MenuItem>
                        <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
                        <MenuItem value="Arunachal Pradesh">Arunachal Pradesh</MenuItem>
                        <MenuItem value="Assam">Assam</MenuItem>
                        <MenuItem value="Bihar">Bihar</MenuItem>
                        <MenuItem value="Chandigarh">Chandigarh</MenuItem>
                        <MenuItem value="Chhattisgarh">Chhattisgarh</MenuItem>
                        <MenuItem value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</MenuItem>
                        <MenuItem value="Delhi">Delhi</MenuItem>
                        <MenuItem value="Goa">Goa</MenuItem>
                        <MenuItem value="Gujarat">Gujarat</MenuItem>
                        <MenuItem value="Haryana">Haryana</MenuItem>
                        <MenuItem value="Himachal Pradesh">Himachal Pradesh</MenuItem>
                        <MenuItem value="Jharkhand">Jharkhand</MenuItem>
                        <MenuItem value="Karnataka">Karnataka</MenuItem>
                        <MenuItem value="Kerala">Kerala</MenuItem>
                        <MenuItem value="Lakshadweep">Lakshadweep</MenuItem>
                        <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
                        <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                        <MenuItem value="Manipur">Manipur</MenuItem>
                        <MenuItem value="Meghalaya">Meghalaya</MenuItem>
                        <MenuItem value="Mizoram">Mizoram</MenuItem>
                        <MenuItem value="Nagaland">Nagaland</MenuItem>
                        <MenuItem value="Odisha">Odisha</MenuItem>
                        <MenuItem value="Others">Others</MenuItem>
                        <MenuItem value="Puducherry">Puducherry</MenuItem>
                        <MenuItem value="Punjab">Punjab</MenuItem>
                        <MenuItem value="Rajasthan">Rajasthan</MenuItem>
                        <MenuItem value="Sikkim">Sikkim</MenuItem>
                        <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
                        <MenuItem value="Telangana">Telangana</MenuItem>
                        <MenuItem value="Tripura">Tripura</MenuItem>
                        <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
                        <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
                        <MenuItem value="West Bengal">West Bengal</MenuItem>

                </TextField>
            </DialogContent>
            <DialogActions className='formbuttons'>
                <Button onClick={handleUseAddress}>Use this address</Button>
            </DialogActions>
            
        
        </div>
        {isVisible ? 'visible' : 'hidden'}!</div>}
       
        <ul>
         
         {/* <p>{JSON.stringify(cartDataid, null, 2)}</p> */}
 
        </ul>
    </>
    
  )
}

export default Address