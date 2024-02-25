import React, { useState, useEffect } from "react";
import axios from "axios";
import Productcard from "./Productcard";
import classes from "./product.module.css";
import Loade from "../loader/Loade";

function Product() {
  const [first, setFirst] = useState();
  const [isloading, setIsloading] = useState(false);
  useEffect(() => {
    setIsloading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        //console.log(res);
        setFirst(res.data);
        setIsloading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsloading(false);
      });
  }, []);
  return (
    <>
      {isloading ? (
        <Loade />
      ) : (
        <div className={classes.product_container}>
          {first?.map((single) => (
            <Productcard product={single} key={single.id} renderadd={true} />
          ))}
        </div>
      )}
    </>
  );
}

export default Product;
