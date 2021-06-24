import React from "react";
import footerStyle from "../styles/Footer.module.scss";

const Footer = () => {
  return (
    <section className="container">
      <div className={`split ${footerStyle.footer}`}>
        <h6>
          H#340 (4th Floor), Road #24,
          <br />
          New DOHS, Mohakhali, Dhaka, Bangladesh <br />
          Phone: 018XXXXXXXX <br />
          E-mail: info@company.com
        </h6>

        <div>
          <ul>
            <li>
              <h5>Company</h5>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Site Map</a>
            </li>
            <li>
              <a href="#">Support Center</a>
            </li>
            <li>
              <a href="#">Terms Conditions</a>
            </li>
            <li>
              <a href="#">Submit Listing</a>
            </li>
          </ul>
        </div>

        <div>
          <ul>
            <li>
              <h5>Quick Links</h5>
            </li>
            <li>
              <a href="#">Quick Links</a>
            </li>
            <li>
              <a href="#">Rentals</a>
            </li>
            <li>
              <a href="#">Sales</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Our blog</a>
            </li>
          </ul>
        </div>

        <div>
          <h5>About us</h5>
          <h6>
            We are the top real estate <br />
            agency in Sydney, with agents <br />
            available to answer any <br />
            question 24/7.
          </h6>
        </div>
      </div>
    </section>
  );
};

export default Footer;
