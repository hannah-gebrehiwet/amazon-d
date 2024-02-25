import React from "react";
import { Carousel } from "react-responsive-carousel";
import { imge } from "./img/Data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "../carausel/carausel.module.css";

function Carausel() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {imge.map((imgitemlink) => {
          return <img key={imgitemlink} src={imgitemlink} alt="" />;
        })}
      </Carousel>
      <div className={classes.hero_img}></div>
    </div>
  );
}

export default Carausel;
