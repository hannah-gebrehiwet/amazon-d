import React from "react";
import { catagoryImage } from "./Catagoriesfull";
import CatagoriesCard from "./CatagoriesCard";
import classes from "./catagorie.module.css";

function Catagorie() {
  return (
    <section className={classes.catagory_container}>
      {catagoryImage?.map((info, i) => {
        return <CatagoriesCard key={i} data={info} />;
      })}
    </section>
  );
}

export default Catagorie;
