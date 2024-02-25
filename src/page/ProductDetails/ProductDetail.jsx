import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { useEffect, useState } from "react";
import Layout from "../../component/Layput/Layout";
import { producturl } from "../../API/EndPoint";
import Productcard from "../../component/Product/Productcard";
import Loade from "../../component/loader/Loade";
import classes from "./pro.module.css";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [isloading, setIsloading] = useState(false);
  useEffect(() => {
    setIsloading(true);
    axios
      .get(`${producturl}/products/${productId}`)
      .then((res) => {
        //console.log(res);
        setProduct(res.data);
        setIsloading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setIsloading(false);
      });
  }, []);
  return (
    <Layout>
      {isloading ? (
        <Loade />
      ) : (
        <div className={classes.one}>
          <Productcard
            product={product}
            flex={true}
            renderDesc={true}
            renderadd={true}
          />
        </div>
      )}
    </Layout>
  );
}

export default ProductDetail;
