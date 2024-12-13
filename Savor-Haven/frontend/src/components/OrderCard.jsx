import React, { useState } from "react";
import "../assets/card.css";

export default function OrderCard(props) {
  const [qty, setQty] = useState(props.foodItem.qtyOrdered);
  const [size, setSize] = useState(props.foodItem.size);

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
        <div className="fs-5 mt-2 text-center">₹{finalPrice}/-</div>
      </div>
    </div>
  );
}
