import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../assets/login.css";

export default function Login() {
  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const [otp, setOTP] = useState("");
  const [currentUser, setCurrentUser] = useState();
  const [authToken, setAuthToken] = useState();
  const [isAdmin, setIsAdmin] = useState(false);

  async function handlePasswordSubmit(event) {
    event.preventDefault();
    const { email, password } = loginCredentials;
    if (!email || !password) {
      toast.error("Please fill in the form completely");
    } else {
      const toCheckLogin = {
        email: loginCredentials.email,
        password: loginCredentials.password,
      };

      axios
        .post("http://localhost:5000/loginuser", { email, password })
        .then((result) => {
          if (result.data.Success === true) {
            localStorage.setItem(
              "currentUser",
              JSON.stringify(result.data.user)
            );
            localStorage.setItem("Admin", result.data.user.isAdmin);
            console.log(result.data.user.isAdmin);
            if (result.data.user.isAdmin === true) {
              navigate("/");
            } else {
              navigate("/");
            }
            localStorage.setItem("authToken", result.data.AuthToken);
          } else {
            toast.error(result.data.msg);
          }
        });

      setLoginCredentials({
        email: "",
        password: "",
      });
    }
  }

  function onChange(event) {
    setLoginCredentials({
      ...loginCredentials,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <>
      <div className="App">
        <div className="d-flex" style={{ height: "100%" }}>
          <div className="form-container-left sign-in-container">
            <form onSubmit={handlePasswordSubmit} className="login-signup-form">
              <h1>Log in</h1>
              {/* Sign in providers Not implemented  */}
              {/* <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g" />
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in" />
              </a>
            </div> */}
              <span>or use your account</span>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={loginCredentials.email}
                onChange={onChange}
                autoComplete="off"
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                value={loginCredentials.password}
                onChange={onChange}
                autoComplete="off"
              />

              <small
                className="linkForgotPassword text-center justify-content-center"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/loginOtp");
                }}
              >
                Forgot Password
              </small>
              <button className="login-signup-button" type="submit">
                Login
              </button>
            </form>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button
                  className="ghost login-signup-button "
                  id="signUp"
                  onClick={() => navigate("/createuser")}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
