import React from "react";
import { useNavigate } from "react-router-dom";
import "@fontsource/saira"; // Defaults to weight 400
import "@fontsource/saira/400.css"; // Specify weight
import "@fontsource/saira/400-italic.css"; // Specify weight and style

export default function Login() {
  const navigate = useNavigate();

  const handleCreateAccountClick = () => {
    // Navigate to the /signup route
    navigate("/signup");
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
          <form>
            <div className="form-group">
              <label htmlFor="email" className="sr-only"></label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Email"
                required
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
