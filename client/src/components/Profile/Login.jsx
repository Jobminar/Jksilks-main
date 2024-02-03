import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "@fontsource/saira/400.css"; // Specify weight
import "@fontsource/saira/400-italic.css"; // Specify weight and style

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleCreateAccountClick = () => {
    // Navigate to the /signup route
    navigate("/signup");
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the /login endpoint
      const response = await fetch("https://jk-skills.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        // Extract user object from the response
        const user = await response.json();

        // Set user object in session storage
        sessionStorage.setItem("user", JSON.stringify(user));
        
        console.log("Login successful");
        navigate('/')
        // Optionally, you can redirect the user to another page after successful login
        navigate("/");
      } else {
        // Handle errors for unsuccessful requests
        const data = await response.json();
        console.error("Login failed:", data.message);
        // Handle the error in your UI, show a message to the user, etc.
      }
    } catch (error) {
      console.error("Error during login:", error);
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
            <h2 className="h3 mb-3 font-weight-normal text-danger">
              Login to My account
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="sr-only"></label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Email"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="sr-only"></label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Password"
                required
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-danger btn-block mx-auto mt-2"
              style={{ width: "200px" }}
            >
              LOG IN
            </button>
          </form>
          <div className="text-center mt-3">
            <p className="mb-2">
              New customer?{" "}
              <span
                className="text-primary cursor-pointer"
                onClick={handleCreateAccountClick}
              >
                Create an account
              </span>
            </p>
            <p className="text-muted">
              By signing up, you agree to the Privacy Policy and Terms of
              Conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
