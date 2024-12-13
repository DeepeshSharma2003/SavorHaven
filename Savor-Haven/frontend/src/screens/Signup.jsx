import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../assets/login.css";

export default function Signup() {
  const navigate = useNavigate();
  const [passShow, setPassShow] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const { name, email, password, location } = credentials;
    if (!name || !email || !password || !location) {
      alert("Please fill in the form completely");
    } else {
      axios
        .post("http://localhost:5000/createuser", {
          name,
          email,
          password,
          location,
        })
        .then((result) => {
          if (result.data.Success === true) {
            toast.success("Successfully signed up");
            navigate("/login");
          } else {
            toast.error("You have already signed up.\nPlease login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      setCredentials({
        name: "",
        email: "",
        password: "",
        location: "",
      });
    }
  }

  function onChange(event) {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  return (
    <>
      <div className="App">
        <div className="d-flex">
          <div className="overlay-container-left">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="ghost login-signup-button "
                  id="signIn"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </button>
              </div>
            </div>
          </div>
          <div className="form-container-right sign-up-container">
            <form onSubmit={handleSubmit} className="login-signup-form">
              <h1>Register</h1>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={credentials.name}
                onChange={onChange}
                autoComplete="off"
              />

              <input
                type="email"
                placeholder="Email"
                name="email"
                value={credentials.email}
                onChange={onChange}
                autoComplete="off"
              />

              <input
                type={!passShow ? "password" : "text"}
                placeholder="Password"
                name="password"
                value={credentials.password}
                onChange={onChange}
                autoComplete="off"
              />
              {/* <div className="showPass" onClick={() => setPassShow(!passShow)}>
                {!passShow ? "Show Password" : "Hide Password"}
              </div> */}

              <input
                type="text"
                placeholder="Location"
                name="location"
                value={credentials.location}
                onChange={onChange}
                autoComplete="off"
              />

              <button className="login-signup-button " type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
