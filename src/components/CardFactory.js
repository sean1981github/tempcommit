import React from "react";
import Card from "./HomeCard";
import { Grid } from "@material-ui/core";
import homepageData from "../data/HomePageData";

const CardFactory = (props) => {
  const cardInfo = homepageData.filter((data) => data.role === props.role);

  return cardInfo[0].cards.map((card) => {
    return (
      <Grid key={card.title} item>
        <Card
          key={card.id}
          title={card.title}
          history={props.history}
          role={props.role}
        />
      </Grid>
    );
  });
};

export default CardFactory;
