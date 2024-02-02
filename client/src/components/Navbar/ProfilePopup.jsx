// ProfilePopup.js

import { useNavigate } from "react-router-dom";

const ProfilePopup = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/account");
  };

  const handleLogoutClick = () => {
    sessionStorage.removeItem("user");
    navigate("/");
  };

  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  return (
    <div className="p-2 bg-white shadow">
      {user ? (
        <div className="d-flex flex-column">
          <button
            className="btn btn-light text-dark p-2"
            onClick={handleProfileClick}
          >
            Profile
          </button>
          <button
            className="btn btn-light text-dark p-2"
            onClick={handleLogoutClick}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          className="btn btn-light text-dark p-2"
          onClick={handleLoginClick}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default ProfilePopup;
