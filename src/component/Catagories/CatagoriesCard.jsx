import React from "react";
import classes from "./catagorie.module.css";
import { Link } from "react-router-dom";

function CatagoriesCard({ data }) {
  return (
    <div className={classes.catagory}>
      <Link to={`/category/${data.name}`}>
        <span>
          <h2>{data?.titile}</h2>
        </span>
        <img src={data?.imaglink} alt="" />
        <p>Shop Now</p>
      </Link>
    </div>
  );
}

export default CatagoriesCard;
