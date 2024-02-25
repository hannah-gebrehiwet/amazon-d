import React, { useContext, useState, useEffect } from "react";
import Layout from "../../component/Layput/Layout";
import { db } from "../../Utility/firebase";
import { Datacontext } from "../../component/DataProvider/DataProvider";
import classes from "./order.module.css";
import Productcard from "../../component/Product/Productcard";

function Order() {
  const [{ user }, dispatch] = useContext(Datacontext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs?.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, []);
  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.order_container}>
          <h2>Your Order</h2>
          {orders?.length == 0 && (
            <p style={{ padding: "20px" }}>you don't have orders yet</p>
          )}
          {/**ordered item */}
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order Id:{eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order) => {
                    return (
                      <Productcard flex={true} product={order} key={order.id} />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Order;
