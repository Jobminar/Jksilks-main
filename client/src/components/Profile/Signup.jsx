import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    gender: "Male", // default to Male
    dateOfBirth: "",
    location: "",
    alternateNumber: "",
    password: "",
  });
  const handleLoginClick = () => {
    // Navigate to the /login route
    navigate("/login");
  };
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the /signup endpoint
      const response = await fetch("https://jk-skills.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        console.log("User successfully registered");
        // Optionally, you can redirect the user to the login page after successful registration
        navigate("/login");
      } else {
        // Handle errors for unsuccessful requests
        const data = await response.json();
        console.error("Registration failed:", data.error);
        // Handle the error in your UI, show a message to the user, etc.
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle the error in your UI, show a message to the user, etc.
    }
  };

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: "400px" }}>
      <div className="row justify-content-center">
        <div
          className="col-md-12 text-center p-4"
          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="text-center mb-4">
            <h2 className="h3 mb-3 font-weight-bold font-['Saira'] text-danger">
              Create an account
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                type="text"
                id="fullName"
                className="form-control font-['Saira']"
                placeholder="Full Name"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="tel"
                id="mobileNumber"
                className="form-control font-['Saira']"
                placeholder="Mobile Number"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="email"
                id="email"
                className="form-control font-['Saira']"
                placeholder="Email"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <select
                id="gender"
                className="form-control font-['Saira']"
                onChange={handleInputChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <input
                type="date"
                id="dateOfBirth"
                className="form-control font-['Saira']"
                placeholder="Date of Birth"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                id="location"
                className="form-control font-['Saira']"
                placeholder="Location"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="tel"
                id="alternateNumber"
                className="form-control font-['Saira']"
                placeholder="Alternate Number"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                id="password"
                className="form-control font-['Saira']"
                placeholder="Password"
                required
                onChange={handleInputChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-danger btn-block mx-auto mt-2 font-['Saira']"
              style={{ width: "200px" }}
            >
              SIGN UP
            </button>
          </form>
          <div className="text-center mt-3">
            <p className="mb-2">
              Already have an account?{" "}
              <span
                className="text-primary cursor-pointer font-['Saira']"
                onClick={handleLoginClick}
              >
                Log In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
