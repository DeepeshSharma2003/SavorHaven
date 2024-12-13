import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import "../assets/card.css";

export default function CartCard(props) {
  const currentUserAuthToken = localStorage.getItem("authToken");
  const [qty, setQty] = useState(props.foodItem.qtyOrdered);
  const [size, setSize] = useState(props.foodItem.size);

  async function deleteCartItem(item) {
    await axios
      .post("http://localhost:5000/deleteCartItem", {
        itemId: item._id,
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

  let finalPrice;

  if ("half" === size) {
    finalPrice = props.options[0].half * qty;
  } else if ("full" === size) {
    finalPrice = props.options[0].full * qty;
  } else if ("large" === size) {
    finalPrice = props.options[0].large * qty;
  } else if ("regular" === size) {
    finalPrice = props.options[0].regular * qty;
  } else if ("medium" === size) {
    finalPrice = props.options[0].medium * qty;
  }

  return (
    <div className="card d-flex justify-content-center px-4">
      <div className="circle">
        <img
          src={props.foodItem.img}
          alt={props.foodItem.name}
          className="card-img-top"
        />
      </div>
      <div className="card-body">
        <p className="card-title text-center">{props.foodItem.name}</p>
        <p className="text-center m-2" value={qty}>
          Quantity: {qty}
        </p>
        <p className="text-center m-2" value={size}>
          Size: {size}
        </p>
        <p className="fs-5 mt-2 text-center">₹{finalPrice}/-</p>
        <button
          className="btn btn-danger ps-4 text-center"
          onClick={() => {
            deleteCartItem(props.foodItem);
          }}
        >
          Remove From Cart
        </button>
      </div>
    </div>
  );
  return (
    <article className="card mt-3 food" style={{ border: "5px solid #ecc00e" }}>
      <div className="img-container">
        <img src={props.foodItem.img} alt={props.foodItem.name} />
      </div>
      <div className="food-footer text-center p-2">
        <h4>{props.foodItem.name}</h4>
      </div>
      <div className="container w-100">
        <p
          className="text-center rounded m-2 h-100 "
          style={{ backgroundColor: "#ecc00e" }}
          value={qty}
        >
          Quantity: {qty}
        </p>

        <p
          className="text-center rounded m-2 h-100 "
          style={{ backgroundColor: "#ecc00e" }}
          value={size}
        >
          Size: {size}
        </p>
      </div>
      <div className="d-inline h-100 fs-5 mt-2 mx-2 text-center">
        ₹{finalPrice}/-
      </div>
      <div
        className="my-3"
        style={{
          height: "1px",
          borderRadius: "1.5px",
          width: "100%",
          backgroundColor: "#ecc00e",
        }}
      />
      <button
        className="btn justify-center btn-danger m-2 mb-2"
        onClick={() => {
          deleteCartItem(props.foodItem);
        }}
      >
        Remove From Cart
      </button>
    </article>
  );
}
