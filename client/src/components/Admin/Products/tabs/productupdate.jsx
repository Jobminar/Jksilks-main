import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, DialogActions, Button, MenuItem, FormControl, Select } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';

import axios from "axios";
import './tabs.css';

const ProductUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedProduct = location.state?.selectedProduct || null;

  const [editformData, setEditFormData] = useState({
    category: '',
    itemname: '',
    price: '',
    code: '',
    stitchingOptions: '',
    fabric: '',
    washCare: '',
    length: '',
    description: '',
    itemImage1: null,
    itemImage2: null,
    itemImage3: null,
    itemImage4: null,
  });

  useEffect(() => {
    if (selectedProduct) {
      setEditFormData({
        category: selectedProduct.category || "",
        itemname: selectedProduct.itemname || "",
        price: selectedProduct.price || "",
        code: selectedProduct.code || "",
        stitchingOptions: selectedProduct.stitchingOptions || "",
        fabric: selectedProduct.fabric || "",
        washCare: selectedProduct.washCare || "",
        length: selectedProduct.length || "",
        description: selectedProduct.description || "",
        itemImage1: selectedProduct.itemImage1 || null,
        itemImage2: selectedProduct.itemImage2 || null,
        itemImage3: selectedProduct.itemImage3 || null,
        itemImage4: selectedProduct.itemImage4 || null,
      });
    }
  }, [selectedProduct]);

  const handleChange = (event, fieldName) => {
    const { value } = event.target;
    setEditFormData({ ...editformData, [fieldName]: value });
  };

  const handleImageChange = async (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const base64Image = await convertToBase64(file);
      setEditFormData({ ...editformData, [fieldName]: base64Image });
    }
  };

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });

    const handleFieldUpdate = async (fieldName, value) => {
      try {
        const response = await axios.put(
          `https://jk-skills.onrender.com/inventory/${selectedProduct._id}`,
          {
            [fieldName]: value,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
  
        if (response.status === 200) {
          alert(`${fieldName} updated successfully`);
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error(`Error updating ${fieldName}:`, error);
        alert(`Error updating ${fieldName} in inventory`);
      }
    };
    
    const handleSubmit = async () => {
      try {
        const response = await axios.put(
          `https://jk-skills.onrender.com/inventory/${selectedProduct._id}`,
          {
            category: editformData.category,
            itemname: editformData.itemname,
            price: editformData.price,
            code: editformData.code,
            stitchingOptions: editformData.stitchingOptions,
            fabric: editformData.fabric,
            washCare: editformData.washCare,
            length: editformData.length,
            description: editformData.description,
            // itemImage1: editformData.itemImage1,
            // itemImage2: editformData.itemImage2,
            // itemImage3: editformData.itemImage3,
            // itemImage4: editformData.itemImage4,
            
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
    
        if (response.status === 200) {
          alert("Item updated successfully");
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error updating item:", error);
        alert("Error updating item in inventory");
      }
    };
    
    
  return (
    <div className="updated-form-con">
      {/* <ul>
        {Object.entries(selectedProduct).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul> */}
      <div>
      <FormControl variant="standard" sx={{ m: 0, minWidth: '85%' }}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          required
          name='category'
          value={editformData.category}
          onChange={(e) => handleChange(e, 'category')}  
          label="Category"
          sx={{ background: 'transparent' }}
        >
          <MenuItem value="semiKanchiPattu">Semi kanchi pattu</MenuItem>
          <MenuItem value="lightWeightPattu">Lightweight pattu</MenuItem>
          <MenuItem value="softSilk">Soft silk</MenuItem>
          <MenuItem value="pureKanchiPattu">Pure kanchi pattu</MenuItem>
          <MenuItem value="pureKanjivaramSilk">Pure kanjivaram silk</MenuItem>
          <MenuItem value="exclusiveBridalWear">Exclusive Bridal wear</MenuItem>
          <MenuItem value="offerZone">Offer zone</MenuItem>
        </Select>
      </FormControl>
        {/* <Button
          onClick={() => handleFieldUpdate("category", editformData.category)}
        >
          Update Category
        </Button> */}
      </div>

      <div>
        <TextField
          autoFocus
          margin="dense"
          id="itemname"
          name="itemname"
          type="text"
          fullWidth
          variant="standard"
          value={editformData.itemname}
          onChange={(e) => handleChange(e, "itemname")}
        />
       {/* <Button
          onClick={() => handleFieldUpdate("category", editformData.itemname)}
        >
          Update name
        </Button> */}
      </div>

      <div>
        <TextField
          autoFocus
          margin="dense"
          id="price"
          name="price"
          type="text"
          fullWidth
          variant="standard"
          value={editformData.price}
          onChange={(e) => handleChange(e, "price")}
        />
        {/* <Button onClick={() => handleFieldUpdate("price")}>Update Price</Button> */}
      </div>

      <div>
        <TextField
          autoFocus
          margin="dense"
          id="code"
          name="code"
          type="text"
          fullWidth
          variant="standard"
          value={editformData.code}
          onChange={(e) => handleChange(e, "code")}
        />
        {/* <Button onClick={() => handleFieldUpdate("code")}>Update Code</Button> */}
      </div>

      <div>
        <TextField
          autoFocus
          margin="dense"
          id="stitchingOptions"
          name="stitchingOptions"
          type="text"
          fullWidth
          variant="standard"
          value={editformData.stitchingOptions}
          onChange={(e) => handleChange(e, "stitchingOptions")}
        />
        {/* <Button onClick={() => handleFieldUpdate("stitchingOptions")}>Update Stitching Options</Button> */}
      </div>

      <div>
        <TextField
          autoFocus
          margin="dense"
          id="fabric"
          name="fabric"
          type="text"
          fullWidth
          variant="standard"
          value={editformData.fabric}
          onChange={(e) => handleChange(e, "fabric")}
        />
        {/* <Button onClick={() => handleFieldUpdate("fabric")}>Update Fabric</Button> */}
      </div>

      <div>
        <TextField
          autoFocus
          margin="dense"
          id="washCare"
          name="washCare"
          type="text"
          fullWidth
          variant="standard"
          value={editformData.washCare}
          onChange={(e) => handleChange(e, "washCare")}
        />
        {/* <Button onClick={() => handleFieldUpdate("washCare")}>Update Wash Care</Button> */}
      </div>

      <div>
        <TextField
          autoFocus
          margin="dense"
          id="length"
          name="length"
          type="text"
          fullWidth
          variant="standard"
          value={editformData.length}
          onChange={(e) => handleChange(e, "length")}
        />
        {/* <Button onClick={() => handleFieldUpdate("length")}>Update Length</Button> */}
      </div>

      <div>
        <TextField
          autoFocus
          margin="dense"
          id="description"
          name="description"
          type="text"
          fullWidth
          variant="standard"
          value={editformData.description}
          onChange={(e) => handleChange(e, "description")}
        />
        {/* <Button onClick={() => handleFieldUpdate("description")}>Update Description</Button> */}
      </div>

      <div className="main-img-con">
        <div className="sub-img-con">
          <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "itemImage1")} />
          {editformData.itemImage1 && (
            <div>
              <img
                src={`data:image/png;base64, ${editformData.itemImage1}`}
                alt={`Item ${editformData.itemname}`}
              />
            </div>
          )}
          <Button onClick={() => handleFieldUpdate("itemImage1")}>Update Image 1</Button>
        </div>

        <div className="sub-img-con">
          <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "itemImage2")} />
          {editformData.itemImage2 && (
            <div>
              <img
                src={`data:image/png;base64, ${editformData.itemImage2}`}
                alt={`Item ${editformData.itemname}`}
              />
            </div>
          )}
          <Button onClick={() => handleFieldUpdate("itemImage2")}>Update Image 2</Button>
        </div>

        <div className="sub-img-con">
          <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "itemImage3")} />
          {editformData.itemImage3 && (
            <div>
              <img
                src={`data:image/png;base64, ${editformData.itemImage3}`}
                alt={`Item ${editformData.itemname}`}
              />
            </div>
          )}
          <Button onClick={() => handleFieldUpdate("itemImage3")}>Update Image 3</Button>
        </div>

        <div className="sub-img-con">
          <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "itemImage4")} />
          {editformData.itemImage4 && (
            <div>
              <img
                src={`data:image/png;base64, ${editformData.itemImage4}`}
                alt={`Item ${editformData.itemname}`}
              />
            </div>
          )}
          <Button onClick={() => handleFieldUpdate("itemImage4")}>Update Image 4</Button>
        </div>
      </div>

      <DialogActions className="formbuttons">
        <Button onClick={() => navigate(-1)}>Close</Button>
        <Button onClick={handleSubmit}>Update Item</Button>
      </DialogActions>
    </div>
  );
};

export default ProductUpdate;
