import React, { useContext, useState } from "react";
import Layout from "../../component/Layput/Layout";
import classes from "./payment.module.css";
import { Datacontext } from "../../component/DataProvider/DataProvider";
import Productcard from "../../component/Product/Productcard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { axiosInstance } from "../../API/axios";

import CurrencyFormat from "../../component/CurrencyFormat/CurrencyFormat";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(Datacontext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [cardError, setCardError] = useState(null);
  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };
  const handle = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      //1. backend || functions --> contact to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100} `,
      });
      //console.log(response.data);
      const clientSecret = response.data?.clientSecret;
      //2. client side(react side confirmation)
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      //console.log(confirmation);
      //3. after the confirmation --> order firebase database save, basket clear
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      //empity basket
      dispatch({ type: Type.EMPITY_BASKET });
      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed new Order" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };
  return (
    <Layout>
      {/* header*/}
      <div className={classes.payment_header}>Checkout ({totalItem}) items</div>
      {/** payment */}
      <section className={classes.payment}>
        {/**address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 react lane</div>
            <div> Chicago IL</div>
          </div>
        </div>
        <hr />
        {/**product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => {
              return <Productcard product={item} flex={true} key={item.id} />;
            })}
          </div>
        </div>
        <hr />
        {/**card form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handle} action="">
                {/**error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/**card elment */}
                <CardElement onChange={handleChange} />
                {/**rice */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total | </p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>

                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
