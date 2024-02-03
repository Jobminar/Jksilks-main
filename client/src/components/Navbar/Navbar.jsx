import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
import logo from "./images/logo.png";
import cart from "./images/cart.png";
import search from "./images/search.png";
import wishlist from "./images/wishlist.png";
import profile from "./images/profile.png";
import ProfilePopup from "./ProfilePopup";

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
      <img src={wishlist} alt="wishlist" onClick={handleWishlistClick} />
      <img src={cart} alt="cart" onClick={handleCartClick} />
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
