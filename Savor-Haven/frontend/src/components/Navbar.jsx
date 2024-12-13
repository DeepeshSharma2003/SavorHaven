import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import "../assets/navbar.css";

function Navbar(props) {
  const navigate = useNavigate();
  const userProfile = JSON.parse(localStorage.getItem("currentUser"));
  const currentUserAuthToken = localStorage.getItem("authToken");
  const [cartLength, setCartLength] = useState(0);
  function handleLogout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("OTP");
    localStorage.removeItem("Admin");
    localStorage.removeItem("CartItems");
    localStorage.removeItem("currentUser");
    location.reload();
  }

  useEffect(() => {
    if (currentUserAuthToken) {
      axios
        .post("http://localhost:5000/cartUser", {
          currentUserAuthToken,
        })
        .then((result) => {
          setCartLength(result.data.cartData.length);
        });
    }
  }, []);

  return (
    <nav
      className="navbar custom-navbar navbar-expand-lg navbar-dark ps-5 pe-5"
      style={{ backgroundColor: "#ffe9df" }}
    >
      <div className="container-fluid ">
        <div className="nav-left d-flex justify-content-around flex-row align-items-center">
          <div
            className="fs-1 font-weight-bold logo-name"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Savor Haven
          </div>
        </div>

        <div className="nav-right collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2"></ul>
          {!localStorage.getItem("authToken") ? (
            <div className="d-flex justify-content-around ">
              <ul>
                <div
                  style={{ cursor: "pointer", color: "black" }}
                  className="btn bg-white px-4 fs-4 font-weight-bold mx-3"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </div>
                <div
                  style={{ cursor: "pointer", color: "black" }}
                  className="btn bg-white px-4 fs-4 font-weight-bold mx-3"
                  onClick={() => {
                    navigate("/createuser");
                  }}
                >
                  SignUp
                </div>
              </ul>
            </div>
          ) : (
            <div className="d-flex justify-content-around ">
              <div className="profile-section">
                <div
                  className="px-4 fs-4 font-weight-bold"
                  style={{ cursor: "pointer", color: "black" }}
                  onClick={() => navigate("/cart")}
                >
                  Cart{" "}
                  <Badge pill bg="danger">
                    {cartLength}
                  </Badge>
                </div>
                {localStorage.getItem("Admin") === "true" && (
                  <div
                    className="px-4 fs-4 font-weight-bold"
                    style={{ cursor: "pointer", color: "black" }}
                    onClick={() => navigate("/admin")}
                  >
                    Admin
                  </div>
                )}
                <div
                  className="px-4 fs-4 font-weight-bold"
                  style={{ cursor: "pointer", color: "black" }}
                  onClick={() => navigate("/myorder")}
                >
                  Orders
                </div>
                <div className="dropdown px-4">
                  <div
                    className="dropdown-btn profile-info d-flex"
                    onClick={() => navigate("/profile")}
                    style={{ cursor: "pointer", color: "black" }}
                  >
                    <img
                      src={userProfile.imgUrl}
                      alt={userProfile.name}
                      className="mx-2"
                    />
                    <div
                      className="fs-4 font-weight-bold"
                      style={{ color: "black" }}
                    >
                      {userProfile.name}
                    </div>
                  </div>
                </div>
                <div
                  className="px-4 fs-4 font-weight-bold"
                  style={{ cursor: "pointer", color: "black" }}
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
