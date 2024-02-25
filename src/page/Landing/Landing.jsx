import React from "react";
import Carausel from "../../component/carausel/Carausel";
import Catagorie from "../../component/Catagories/Catagorie";
import Product from "../../component/Product/Product";
import Layout from "../../component/Layput/Layout";

function Landing() {
  return (
    <div>
      <Layout>
        <Carausel />
        <Catagorie />
        <Product />
      </Layout>
    </div>
  );
}

export default Landing;
