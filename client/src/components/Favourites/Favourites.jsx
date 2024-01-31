import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import heartImg from "../../assets/heart.png"; // Assuming 'heart.png' is the path to your heart image
import "./Favourites.css";

const Favourites = () => {
  // State to keep track of favorite items
  const [favorites, setFavorites] = useState([]);

  // State to trigger animation
  const [wiggle, setWiggle] = useState(false);

  // Function to handle clicking on the favorite icon
  const customFontStyle = {
    fontFamily: "Sail",
    fontSize: "4.5rem", // Adjust the font size as needed
    color: "#ce0011",
    /* Add other styles if needed */
  };

  const handleFavoriteClick = (id) => {
    // Trigger the wiggle animation
    setWiggle(true);

    setTimeout(() => {
      // Reset the wiggle animation after a delay
      setWiggle(false);
    }, 1000); // Adjust the delay as needed

    if (favorites.includes(id)) {
      // Remove from favorites
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      // Add to favorites
      setFavorites([...favorites, id]);
    }
  };

  const ItemCard = ({ id, imgSrc, itemName, itemPrice }) => (
    <div className="col-md-4 mb-4">
      <div className="position-relative">
        {favorites.includes(id) ? (
          <FaHeart
            className={`position-absolute top-0 end-0 mt-2 mr-1 heart-icon clickable ${
              wiggle ? "wiggle" : ""
            }`}
            size={24}
            onClick={() => handleFavoriteClick(id)}
            style={{ color: "red" }} // Set the color to red
          />
        ) : (
          <FaRegHeart
            className={`position-absolute top-0 end-0 mt-3 mr-1 heart-icon clickable ${
              wiggle ? "wiggle" : ""
            }`}
            size={24}
            onClick={() => handleFavoriteClick(id)}
          />
        )}
        <img src={imgSrc} alt={itemName} className="img-fluid rounded" />
      </div>
      <div className="text-left mt-2">
        <div className="text-xl font-saira font-medium">{itemName}</div>
        <div id={`Element${id}`} className="text-lg font-saira">
          ₹ {itemPrice}{" "}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-fluid bg-light py-5 p-5 mb-5">
      <div className="container">
        <div className="row justify-content-start">
          <div className="col-md-8">
            <div className="text-left mb-4">
              {/* Moved the favorite title towards left */}
              <div className="col-12 col-md-4 d-flex align-items-center">
                <div style={customFontStyle} className="mr-4">
                  {" "}
                  {/* Increased margin-right */}
                  Favourite
                </div>
                <div className="flex-grow-1"></div>
                <img
                  src={heartImg} // Use the heartImg variable
                  alt="Heart"
                  className="w-6" // Set the desired width (half of 12)
                />
              </div>
            </div>
            <div className="row">
              <ItemCard
                id="Frame2"
                imgSrc="https://file.rendit.io/n/KyS9lcjolbx5NzKPcXmV.png"
                itemName="Bridal wear"
                itemPrice="2599.00"
              />
              <ItemCard
                id="Frame3"
                imgSrc="https://file.rendit.io/n/2xkv9yUGYCp92Ml0SvTj.png"
                itemName="Semi Kanchi pattu"
                itemPrice="2599.00"
              />
              <ItemCard
                id="Frame4"
                imgSrc="https://file.rendit.io/n/Jo5Z2eZXNefcDuNptJcQ.png"
                itemName="Light Weight Pattu"
                itemPrice="2599.00"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favourites;
