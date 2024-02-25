import React from "react";
import classes from "./footr.module.css";
import { useState, useEffect } from "react";
import { TbWorld } from "react-icons/tb";

function Footer() {
  const [showButton, setShowButton] = useState(false);

  // Scroll behavior function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle window scroll event
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 100); // Show button after scrolling past 100px
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <section>
      <div className={classes.btn}>
        <button
          className={`scroll-to-top-button ${showButton ? "visible" : ""}`}
          onClick={scrollToTop}
          aria-label="Scroll to top" // Accessibility: Use meaningful aria-label
          tabIndex={0} // Accessibility: Make keyboard-focusable
        >
          Back to top
          {/* Button text or icon */}
        </button>
      </div>

      <div className={classes.container}>
        <div>
          <h3>Get to Know Us</h3>
          <ul>
            <li>
              <a href="">Careers</a>
            </li>
            <li>
              <a href="">Blog</a>
            </li>
            <li>
              <a href="">About Amazon</a>
            </li>
            <li>
              <a href="">Investor Relations</a>
            </li>
            <li>
              <a href="">Amazon Devices</a>
            </li>
            <li>
              <a href="">Amazon Science</a>
            </li>
          </ul>
        </div>
        <div>
          <h3>Make Money with</h3>
          <ul>
            <li>
              <a href="">Sell products on Amazon</a>
            </li>
            <li>
              <a href="">Sell on Amazon Business</a>
            </li>
            <li>
              <a href="">Sell apps on Amazon</a>
            </li>
            <li>
              <a href="">Become an Affiliate</a>
            </li>
            <li>
              <a href="">Advertise Your Products</a>
            </li>
            <li>
              <a href="">Self-Publish with Us</a>
            </li>
            <li>
              <a href="">Host an Amazon Hub </a>
            </li>
            <li>
              <a href=""> ›See More Make Money with Us</a>
            </li>
          </ul>
        </div>
        <div>
          <h3>Amazon Payment Products</h3>
          <ul>
            <li>
              <a href="">Amazon Business Card </a>
            </li>
            <li>
              <a href="">Shop with Points</a>
            </li>
            <li>
              <a href="">Reload Your Balance</a>
            </li>
            <li>
              <a href="">Amazon Currency Converter</a>
            </li>
            <li></li>
          </ul>
        </div>
        <div className={classes.wed}>
          <h3>Let Us Help You</h3>
          <ul>
            <li>
              <a href="">Amazon and COVID-19</a>
            </li>
            <li>
              <a href="">Your Account</a>
            </li>
            <li>
              <a href="">Your Orders</a>
            </li>
            <li>
              <a href="">Shipping Rates & Policies</a>
            </li>
            <li>
              <a href="">Returns & Replacements</a>
            </li>
            <li>
              <a href="">Manage Your Content and Devices</a>
            </li>
            <li>
              <a href="">Amazon Assistant </a>
            </li>
            <li>
              <a href="">Help</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={classes.last}>
        <ul>
          <li className={classes.im}>
            <img
              className={classes.image}
              src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695"
              alt=""
            />
          </li>
          <li>
            <button className={classes.one}>
              <TbWorld size={15} className={classes.wo} />
              English
            </button>
          </li>
          <li>
            <button className={classes.two}>$ USD-U.S.Dollar</button>
          </li>
          <li>
            <button className={classes.three}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-flag_of_the_united_states.svg.png"
                alt=""
              />
              United States
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Footer;
