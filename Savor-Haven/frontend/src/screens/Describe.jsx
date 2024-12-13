import React from "react";
import { Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faTruck,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/describe.css";
import { useNavigate } from "react-router-dom";
export default function Describe() {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <Container>
        <div className="d-flex justify-content-around align-items-center">
          <div className="hero-text pt-4">
            <h1>
              All Fast Food is Available at
              <br />
              <span className="brand-name">Savor Haven</span>
            </h1>
            <p>
              We Are Just A Click Away When You Crave For Delicious Fast Food
            </p>
            <div className="hero-buttons">
              <Button
                variant="danger"
                onClick={() => {
                  navigate("/cart");
                }}
                className="buy-now-btn"
              >
                Buy Now
              </Button>
            </div>
          </div>
          <div md={6} className="hero-image p-4">
            <img
              style={{ width: "25vw" }}
              src="/burger.png"
              alt="Delicious Food"
            />
          </div>
        </div>

        <div className="hero-info d-flex justify-content-around align-items-center">
          <div className="info-box ms-3 me-3">
            <FontAwesomeIcon icon={faTruckFast} />

            <h5>Fast Delivery</h5>
            <p>
              Your Food Will Be Delivered To Your Home Within 1-2 Hours Of Your
              Ordering
            </p>
          </div>

          <div className="info-box ms-3 me-3">
            <FontAwesomeIcon icon={faLeaf} />
            <h5>Fresh Food</h5>
            <p>
              Your Food Will Be Delivered 100% Fresh To Your Home. We Do Not
              Deliver Stale Food
            </p>
          </div>

          <div className="info-box ms-3 me-3">
            <FontAwesomeIcon icon={faTruck} />
            <h5>Free Delivery</h5>
            <p>
              Your Food Delivery Is Absolutely Free. No Cost Just Order And
              Enjoy
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
