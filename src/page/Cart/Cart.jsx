import React, { useContext } from "react";
import Layout from "../../component/Layput/Layout";
import { Datacontext } from "../../component/DataProvider/DataProvider";
import Productcard from "../../component/Product/Productcard";
import CurrencyFormat from "../../component/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import classes from "./cart.module.css";
import { Type } from "../../Utility/action.type";
import { IoIosArrowDown } from "react-icons/io";

import { IoIosArrowUp } from "react-icons/io";
function Cart() {
  const [{ basket, user }, dispach] = useContext(Datacontext);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const increament = (item) => {
    dispach({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };
  const decreament = (id) => {
    dispach({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your shoping basket</h3>
          <hr />
          {basket?.length == 0 ? (
            <p>Oops ! no item in your cart</p>
          ) : (
            basket?.map((item, i) => {
              return (
                <section className={classes.cart_product}>
                  <Productcard
                    key={i}
                    product={item}
                    flex={true}
                    renderDesc={true}
                    renderadd={false}
                  />
                  <div className={classes.btn_container}>
                    <button
                      className={classes.btn}
                      onClick={() => increament(item)}
                    >
                      <IoIosArrowUp size={20} />
                    </button>
                    <span>{item.amount}</span>

                    <button
                      className={classes.btn}
                      onClick={() => decreament(item.id)}
                    >
                      <IoIosArrowDown size={20} />
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal({basket?.length}items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments">continue to checkout</Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart;
