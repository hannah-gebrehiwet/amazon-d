import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { BsCart } from "react-icons/bs";
import { Link } from "react-router-dom";
import classes from "./header.module.css";
import LowerHeader from "../LowerHeader/LowerHeader";
import { Datacontext } from "../DataProvider/DataProvider";
import { useContext } from "react";
import { auth } from "../../Utility/firebase";

function Header() {
  const [{ user, basket }, dispach] = useContext(Datacontext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            {/* logo */}
            <Link to="/">
              <img
                src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695"
                alt=""
              />
            </Link>
            <div className={classes.delivery}>
              <span>
                {/*delivery*/}
                <CiLocationOn />
              </span>
              <div>
                <p>delivery to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          <div className={classes.search}>
            {/* search */}
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" name="" id="" placeholder="search product" />
            <IoSearchOutline size={25} />
          </div>

          {/* right side */}

          <div className={classes.order_container}>
            <Link to="" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-flag_of_the_united_states.svg.png"
                alt=""
              />

              <select>
                <option value="">Eng</option>
              </select>
            </Link>

            <Link to={!user && "/Auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello {user?.email?.split("@")[0]}</p>
                    <span
                      onClick={() => {
                        auth.signOut();
                      }}
                    >
                      {" "}
                      sign out
                    </span>
                  </>
                ) : (
                  <>
                    <p>Hello,Sign In</p>
                    <span>Account & Lists</span>
                  </>
                )}
              </div>
            </Link>
            {/*order*/}
            <Link to="/Orders">
              <p>returns</p>
              <span>& order</span>
            </Link>
            <Link to="/cart" className={classes.cart}>
              <BsCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header;
