import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../assets/login.css";

export default function LoginViaOTP() {
  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const [otp, setOTP] = useState("");
  const [loginViaOTP, setLoginViaOTP] = useState(true);

  const [enterOTP, setEnterOTP] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [authToken, setAuthToken] = useState();
  const [isAdmin, setIsAdmin] = useState(false);

  function onChange(event) {
    setLoginCredentials({
      ...loginCredentials,
      [event.target.name]: event.target.value,
    });
  }

  function onOTPChange(event) {
    setOTP(event.target.value);
  }

  function sendOTP(event) {
    event.preventDefault();
    const { email } = loginCredentials;
    if (!email) {
      toast.error("Please fill in the email address");
    } else {
      axios
        .post("http://localhost:5000/user/sendotp", { email })
        .then((result) => {
          if (result.data.Success === true) {
            localStorage.setItem("OTP", result.data.otp);
            setCurrentUser(result.data.user);
            setAuthToken(result.data.AuthToken);
            setIsAdmin(result.data.user.isAdmin);
            setLoginViaOTP(false);
            setEnterOTP(true);
          } else {
            toast.error("You have not registered yet.\n Please Register First");
          }
        });
    }
  }

  function verifyOTP(event) {
    event.preventDefault();
    if (otp === localStorage.getItem("OTP")) {
      navigate("/");
      localStorage.setItem("Admin", isAdmin);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      localStorage.setItem("authToken", JSON.stringify(authToken));
    } else {
      toast.error("wrong otp");
    }
  }

  return (
    <>
      <div className="App">
        <div>
          <div className="form-container-left sign-in-container">
            {loginViaOTP && (
              <form onSubmit={sendOTP} className="login-signup-form">
                <h1>Password Assistance</h1>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  name="email"
                  value={loginCredentials.email}
                  onChange={onChange}
                  autoComplete="off"
                />
                <button className="login-signup-button " type="submit">
                  Send OTP
                </button>
              </form>
            )}
            {enterOTP && (
              <form onSubmit={verifyOTP} className="login-signup-form">
                <h1>Verification</h1>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the OTP"
                  name="otp"
                  id="otp"
                  value={otp}
                  onChange={onOTPChange}
                  autoComplete="off"
                />
                <div className="d-flex justify-content-around">
                  <button type="submit" className="me-3 login-signup-button ">
                    Verify OTP
                  </button>
                  <button
                    type="button"
                    className="login-signup-button "
                    onClick={sendOTP}
                  >
                    Resend OTP
                  </button>
                </div>
              </form>
            )}
          </div>
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
    </>
  );
}
