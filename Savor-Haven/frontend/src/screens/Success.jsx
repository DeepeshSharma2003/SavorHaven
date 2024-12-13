import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Success() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const currentUserAuthToken = localStorage.getItem("authToken");
  let indianTime = new Date().toLocaleString("en-Us", {
    timeZone: "Asia/Kolkata",
  });

  useEffect(() => {
    axios
      .post("http://localhost:5000/cartUser", { currentUserAuthToken })
      .then((result) => {
        if (result.data.Success === "true") {
          setData(result.data.cartData);
        }
      });
  }, []);

  if (data.length !== 0) {
    const dataWithTime = [...data, indianTime];
    axios
      .post("http://localhost:5000/order-Items", {
        dataWithTime,
        currentUserAuthToken,
      })
      .then(() => {});
    axios
      .post("http://localhost:5000/deleteItems", {
        data: [],
        currentUserAuthToken,
      })
      .then(() => {});
  }

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px 0",
        background: "#EBF0F5",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        className="card"
        style={{
          background: "white",
          padding: "60px",
          borderRadius: "4px",
          boxShadow: "0 2px 3px #C8D0D8",
          display: "inline-block",
          margin: " 0 auto",
          height: "100%",
        }}
      >
        <div
          style={{
            borderRadius: "200px",
            height: "200px",
            width: "200px",
            background: "#F8FAF5",
            margin: "0 auto",
          }}
        >
          <i
            className="checkmark"
            style={{
              color: "#9ABC66",
              fontSize: "100px",
              lineHeight: "200px",
              marginLeft: "-15px",
            }}
          >
            ✓
          </i>
        </div>
        <h1
          style={{
            color: "#88B04B",
            fontFamily: '"Nunito Sans", "Helvetica Neue", sans-serif',
            fontWeight: "900",
            fontSize: "40px",
            marginBottom: "10px",
          }}
        >
          Success
        </h1>
        <p
          style={{
            color: "#404F5E",
            fontFamily: '"Nunito Sans", "Helvetica Neue", sans-serif',
            fontSize: "20px",
            margin: "0",
          }}
        >
          We received your purchase request;
          <br /> we'll be in touch shortly!
          <br /> Redirecting you to Home page
        </p>
      </div>
    </div>
  );
}
