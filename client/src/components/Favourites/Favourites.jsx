import React, { useState, useEffect } from "react";
import "./Favourites.css";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const Favorites = () => {
  const [favoritesData, setFavoritesData] = useState([]);
  const [favoritesLength, setFavoritesLength] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user from sessionStorage
    const user = JSON.parse(sessionStorage.getItem("user"));
    const userId = user && user.user._id;

    // Check if userId is available
    if (userId) {
      const apiUrl = `https://jk-skills.onrender.com/wishlist/${userId}`;

      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setFavoritesData(data);
          setFavoritesLength(data.length);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching wishlist data:", error);
          setLoading(false);
        });
    } else {
      console.error("User ID not available.");
      setLoading(false);
    }
  }, []);

  // handle delete item
  const handleItemDelete = (itemid) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const userId = user && user.user._id;
    const itemIdToDelete = itemid;
    console.log(userId, itemIdToDelete);
    // Data to send in the request body
    const dataToDelete = {
      userId: userId,
      itemId: itemIdToDelete,
    };

    // Make a DELETE request to your backend API
    axios
      .delete("https://jk-skills.onrender.com/wishlist/delete", {
        data: dataToDelete,
      })
      .then((response) => {
        // Handle success (e.g., show a success message)
        alert("Item successfully deleted from the cart!");
        // You might want to update your local state to reflect the removal
      })
      .catch((error) => {
        // Handle error (e.g., show an error message)
        alert("Error deleting item from the cart!");
        console.error("Error deleting item:", error);
      });
  };

  useEffect(() => {
    sessionStorage.setItem("favoritesLength", favoritesLength.toString());
  }, [favoritesLength]);

  return (
    <>
      <Navbar />
      <div>
        <h2>Favorites</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="fav-main-con">
            {favoritesData.map((item, index) => (
              <div key={index}>
                <div className="fav-sub-con">
                  <div className="fav-image">
                    <img
                      src={`data:image/png;base64, ${item.itemImage1}`}
                      alt={`Item ${item.itemname}`}
                    />
                  </div>
                  <div className="fav-content">
                    <div>
                      <p>{item.itemname}</p>
                      <p>{item.price}</p>
                    </div>

                    <div
                      className="delete-icon"
                      onClick={() => handleItemDelete(item._id)}
                    >
                      <DeleteOutlinedIcon />
                    </div>
                  </div>
                </div>
                {/* Add more details or styling as needed */}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* <h1>{favoritesLength}</h1> */}
    </>
  );
};

export default Favorites;
