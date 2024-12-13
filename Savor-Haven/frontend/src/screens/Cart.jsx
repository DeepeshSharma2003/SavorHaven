import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CartCard from "../components/CartCard";
import axios from "axios";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

export default function Cart() {
  const currentUserAuthToken = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const [cartData, setCartData] = useState([]);

  async function deleteCart() {
    await axios
      .post("http://localhost:5000/deleteItems", {
        data: [],
        currentUserAuthToken,
      })
      .then((result) => {
        if (result.data.Success === "true") {
          toast.success(result.data.msg);
        } else {
          toast.error(result.data.msg);
        }
      });
  }

  async function makePayment() {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);
    axios
      .post("http://localhost:5000/api/create-checkout-session", {
        data: cartData,
        user,
      })
      .then((result) => {
        if (result.data.Success === "true") {
          const { sessionId } = result.data;
          const results = stripe.redirectToCheckout({
            sessionId: sessionId,
          });
        } else {
          console.log("An error occured");
        }
      });
  }

  useEffect(() => {
    axios
      .post("http://localhost:5000/cartUser", { currentUserAuthToken })
      .then((result) => {
        if (result.data.Success === "true") {
          setCartData(result.data.cartData);
        }
      });
  }, [cartData]);

  if (cartData.length !== 0) {
    return (
      <div>
        <Navbar length={cartData.length} />
        <div className="container">
          <div className="cart-heading d-flex justify-content-center align-items-center m-3 mt-2">
            <h1>Cart</h1>
          </div>
          <div className="row mb-3">
            {cartData.length !== 0 &&
              cartData.map((foodItem) => {
                return (
                  <div className="col-12 col-md-6 col-lg-3" key={foodItem._id}>
                    <CartCard
                      foodItem={foodItem}
                      key={foodItem.id}
                      options={foodItem.options}
                    />
                  </div>
                );
              })}
          </div>

          <div className="d-flex m-5 justify-content-center align-items center">
            <button className="btn mx-3 btn-primary" onClick={deleteCart}>
              Empty Your Cart
            </button>
            <button className="btn mx-3 btn-primary" onClick={makePayment}>
              Proceed To Pay
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div>
        <Navbar length={0} />
      </div>
      <div className="container mt-5">
        <h3 className="cart-heading d-flex justify-content-center align-items-center m-3 mt-2">
          Your Cart Is Empty
        </h3>
      </div>
    </div>
  );
}
