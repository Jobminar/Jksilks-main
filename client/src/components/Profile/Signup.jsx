import React from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Navigate to the /login route
    navigate("/login");
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
          <form>
            <div className="form-group">
              <label htmlFor="email" className="sr-only"></label>
              <input
                type="email"
                id="email"
                className="form-control font-['Saira']"
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="sr-only"></label>
              <input
                type="password"
                id="password"
                className="form-control font-['Saira']"
                placeholder="Password"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="sr-only"></label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control font-['Saira']"
                placeholder="Confirm Password"
                required
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
