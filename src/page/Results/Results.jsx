import React from "react";
import Layout from "../../component/Layput/Layout";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { producturl } from "../../API/EndPoint";
import Productcard from "../../component/Product/Productcard";
import classes from "./result.module.css";
import Loade from "../../component/loader/Loade";

function Results() {
  const { categoryName } = useParams();
  const [isloading, setIsloading] = useState(false);
  const [results, setResults] = useState([]);
  useEffect(() => {
    setIsloading(true);
    axios
      .get(`${producturl}/products/category/${categoryName}`)
      .then((res) => {
        //console.log(res);
        setResults(res.data);
        setIsloading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsloading(false);
      });
  }, []);

  return (
    <Layout>
      <section>
        <h1 style={{ padding: "30px" }}> Results </h1>
        <p style={{ padding: "30px" }}>Category/{categoryName}</p>
        <hr />
        {isloading ? (
          <Loade />
        ) : (
          <div className={classes.products_container}>
            {results?.map((product) => {
              return (
                <Productcard
                  key={product.id}
                  product={product}
                  renderadd={true}
                />
              );
            })}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Results;
