import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import "../assets/card.css";

export default function Card(props) {
  const currentUserAuthToken = localStorage.getItem("authToken");

  let options = props.options;
  let priceOptions = Object.keys(options[0]);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0]);

  async function addNewCart(foodItem) {
    await axios
      .post("http://localhost:5000/cartItems", {
        data: foodItem,
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

  useEffect(() => {
    props.foodItem.size = size;
    props.foodItem.qtyOrdered = qty;
    props.foodItem.price = finalPrice;
  }, [qty, size]);

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
        <select
          className="mx-2 h-100 text-center rounded ps-2"
          style={{ backgroundColor: "#ecc00e" }}
          value={qty}
          onChange={(e) => {
            setQty(e.target.value);
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <select
          className=" h-100 text-center rounded ps-2"
          style={{ backgroundColor: "#ecc00e" }}
          value={size}
          onChange={(e) => {
            setSize(e.target.value);
          }}
        >
          {priceOptions.map((data) => {
            return (
              <option key={data} value={data}>
                {data}
              </option>
            );
          })}
        </select>
        <p className="price">₹{finalPrice}/-</p>
        <button
          className="btn btn-danger ps-4 text-center"
          onClick={() => {
            addNewCart(props.foodItem);
          }}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
