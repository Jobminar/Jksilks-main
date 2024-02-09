import React, { useState } from "react";
import "./admininventory.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import axios from "axios";
import Adminheader from "../adminheader";

const Inventory = () => {
  const [formData, setFormData] = useState({
    category: "",
    itemname: "",
    price: "",
    code: "",
    stitchingOptions: "",
    fabric: "",
    washCare: "",
    length: "",
    description: "",
    itemImage1: null,
    itemImage2: null,
    itemImage3: null,
    itemImage4: null,
  });

  const handleImageChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for required fields
    const requiredFields = [
      "category",
      "itemname",
      "price",
      "code",
      "stitchingOptions",
      "fabric",
      "washCare",
      "length",
      "description",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please provide a value for ${field}`);
        return;
      }
    }

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      await axios.post(
        "https://server.sharetravel.in/addItem",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Item added successfully");
      console.log(formData);
      // Optionally, you can reset the form data to clear the fields
      //   setFormData({
      //     category: '',
      //     itemname: '',
      //     price: '',
      //     code: '',
      //     stitchingOptions: '',
      //     fabric: '',
      //     washCare: '',
      //     length: '',
      //     description: '',
      //     itemImage1: null,
      //     itemImage2: null,
      //     itemImage3: null,
      //     itemImage4: null,
      //   });
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Error adding item to inventory");
    }
  };

  return (
    <>
      <Adminheader />
      <div className="inventory-con">
        {/* categeory */}
        <FormControl variant="standard" sx={{ m: 0, minWidth: "85%" }}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            required
            name="category"
            value={formData.category}
            onChange={(e) => handleChange(e)}
            label="Category"
            sx={{ background: "transparent" }}
          >
            <MenuItem value="semiKanchiPattu">Semi kanchi pattu</MenuItem>
            <MenuItem value="lightWeightPattu">Light weight pattu</MenuItem>
            <MenuItem value="softSilk">Soft silk</MenuItem>
            <MenuItem value="pureKanchiPattu">Pure kanchi pattu</MenuItem>
            <MenuItem value="pureKanjivaramSilk">Pure kanjivaram silk</MenuItem>
            <MenuItem value="exclusiveBridalWear">
              Exclusive Bridal wear
            </MenuItem>
            <MenuItem value="newDrops">New Drops</MenuItem>
            <MenuItem value="offerZone">Offer zone</MenuItem>
          </Select>
        </FormControl>

        {/* item name*/}
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              m: 2,
              width: "90%",
              "&:hover": {
                "& fieldset": {
                  borderColor: "green",
                },
              },
              "&:focus-within": {
                "& fieldset": {
                  borderColor: "green",
                },
              },
            },
            width: "90%",
            margin: "auto",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="name"
            required
            label="Item Name"
            name="itemname"
            type="string"
            variant="standard"
            value={formData.itemname}
            onChange={(e) => handleChange(e)}
          />
        </Box>

        {/* price */}
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 2, width: "90%" },
            width: "90%",
            margin: "auto",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="name"
            label="Price"
            type="number"
            name="price"
            variant="standard"
            required
            value={formData.price}
            onChange={(e) => handleChange(e)}
          />
        </Box>

        {/* Code */}
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 2, width: "90%" },
            width: "90%",
            margin: "auto",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="name"
            label="Code"
            // type="string"
            name="code"
            variant="standard"
            required
            value={formData.code}
            onChange={(e) => handleChange(e)}
          />
        </Box>

        {/* stitching options */}
        <FormControl variant="standard" sx={{ m: 0, minWidth: "85%" }}>
          <InputLabel id="category-label">Stitching options</InputLabel>
          <Select
            labelId="category-label"
            id="stitchingOptions"
            required
            name="stitchingOptions"
            value={formData.stitchingOptions}
            onChange={(e) => handleChange(e)}
            sx={{ background: "transparent" }}
          >
            <MenuItem value="No">No</MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
          </Select>
        </FormControl>

        {/* fabric */}
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 2, width: "90%" },
            width: "90%",
            margin: "auto",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="fabric"
            label="Fabric"
            // type="string"
            name="fabric"
            variant="standard"
            value={formData.fabric}
            onChange={(e) => handleChange(e)}
          />
        </Box>

        {/* Washcare */}
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 2, width: "90%" },
            width: "90%",
            margin: "auto",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="washCare"
            label="Washcare"
            // type="string"
            name="washCare"
            variant="standard"
            value={formData.washCare}
            onChange={(e) => handleChange(e)}
          />
        </Box>

        {/* length */}
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 2, width: "90%" },
            width: "90%",
            margin: "auto",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="length"
            label="Length"
            // type="string"
            name="length"
            variant="standard"
            value={formData.length}
            onChange={(e) => handleChange(e)}
          />
        </Box>

        {/* description */}
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 2, width: "90%" },
            width: "90%",
            margin: "auto",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="name"
            label="description"
            type="string"
            variant="standard"
            name="description"
            value={formData.description}
            onChange={(e) => handleChange(e)}
          />
        </Box>

        {/* images */}
        <div className="Images">
          <label>
            Item Image 1:
            <input type="file" name="itemImage1" onChange={handleImageChange} />
          </label>

          <label>
            Item Image 2:
            <input type="file" name="itemImage2" onChange={handleImageChange} />
          </label>

          <label>
            Item Image 3:
            <input type="file" name="itemImage3" onChange={handleImageChange} />
          </label>

          <label>
            Item Image 4:
            <input type="file" name="itemImage4" onChange={handleImageChange} />
          </label>
        </div>

        {/* submit */}
        <Button
          variant="contained"
          sx={{
            width: "30%",
            backgroundColor: "green",
            margin: "auto",
            display: "block",
            "&:active": {
              backgroundColor: "#F8DB77",
              boxShadow: "none",
            },
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default Inventory;
