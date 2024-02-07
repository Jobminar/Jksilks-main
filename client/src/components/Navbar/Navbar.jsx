import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
import logo from "./images/logo.png";
import cart from "./images/cart.png";
import search from "./images/search.png";
import wishlist from "./images/wishlist.png";
import profile from "./images/profile.png";
import ProfilePopup from "./ProfilePopup";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Badge, Stack } from "@mui/material";

const Navbar = () => {
  const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };
  const handleSearchClick = () => {
    navigate("/search");
  };

  const handleWishlistClick = () => {
    navigate("/favourite");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleProfileClick = () => {
    setProfilePopupOpen(!isProfilePopupOpen);
  };
  

  var favoritesLengthString = sessionStorage.getItem('favoritesLength');
  var favoritesLength = parseInt(favoritesLengthString);
  console.log(favoritesLength);

  
  var cartLengthString = sessionStorage.getItem('cartLength');
  var cartLength = parseInt(cartLengthString);
  console.log(cartLength);


  return (
    <div className="navbar-con">
      <img src={logo} alt="logo" onClick={handleHomeClick} />
      <p
        onClick={() => {
          navigate("/semikanchipattu");
        }}
      >
        Semi Kanchi pattu
      </p>
      <p
        onClick={() => {
          navigate("/lightweightpattu");
        }}
      >
        Light weight pattu
      </p>
      <p
        onClick={() => {
          navigate("/softsilk");
        }}
      >
        Soft Silk
      </p>
      <p
        onClick={() => {
          navigate("/purekanchhipattu");
        }}
      >
        Pure Kanchi Pattu
      </p>
      <p
        onClick={() => {
          navigate("/bridalware");
        }}
      >
        Exclusive Bridal wear
      </p>
      <p
        onClick={() => {
          navigate("/purekanjivaram");
        }}
      >
        Pure Kanjivaram Silk
      </p>
      <img src={search} alt="search" onClick={handleSearchClick} />
      {/* <img src={wishlist} alt="wishlist" onClick={handleWishlistClick} /> */}
      <div>
      <Stack  onClick={handleWishlistClick}  >
        <Badge badgeContent={favoritesLength} color="error">
        <FavoriteIcon color="action" />
        </Badge>
      </Stack>
      </div>
      {/* <img src={cart} alt="cart" onClick={handleCartClick} /> */}
      <div>
      <Stack onClick={handleCartClick}  >
        <Badge badgeContent={cartLength} color="error">
        <ShoppingCartIcon color="action" />
        </Badge>
      </Stack>
      </div>
      <img
        src={profile}
        alt="profile"
        onClick={handleProfileClick}
        style={{ cursor: "pointer" }}
      />
      <div
        style={{
          position: "absolute",
          top: "60px",
          right: "10px",
          zIndex: 1000,
        }}
      >
        {isProfilePopupOpen && <ProfilePopup />}
      </div>

      
    </div>
  );
};

export default Navbar;
