import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import OrderCard from "../components/OrderCard";

export default function MyOrder() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const [orders, setOrders] = useState([]);
  React.useEffect(() => {
    const { email } = user;
    axios
      .post("http://localhost:5000/orderedItems", { email })
      .then((result) => {
        if (
          result.data.Success === "true" &&
          result.data.orders !== undefined
        ) {
          setOrders(result.data.orders);
        }
      });
  }, []);
  if (orders.length > 0) {
    return (
      <>
        <div>
          <Navbar />
        </div>
        <div className="container">
          <div className="d-flex justify-content-center align-items-center m-3 mt-2">
            <h1>My Orders</h1>
          </div>
          <div>
            {orders.map((order, index) => {
              return (
                <div key={index} className="container">
                  <hr />
                  <h2>{order[order.length - 1]}</h2>
                  <div className="row mb-3 pt-3">
                    {order.map((orderList) => {
                      if (orderList.length === undefined) {
                        return (
                          <div
                            className="col-12 col-md-6 col-lg-3"
                            key={orderList._id}
                          >
                            <OrderCard
                              foodItem={orderList}
                              key={orderList._id}
                              options={orderList.options}
                            />
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <Navbar />
        </div>
        <div>
          <h1 className="d-flex justify-content-center align-items-center m-3 mt-2">
            You have not ordered anything yet
          </h1>
        </div>
      </>
    );
  }
}
