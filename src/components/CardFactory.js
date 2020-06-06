import React from "react";
import Card from "./HomeCard";
import { Grid } from "@material-ui/core";
import data from "../data/HomePageData";

const CardFactory = (props) => {
  const cardInfo = data.filter((data) => data.role === props.role);

  return cardInfo[0].cards.map((card) => {
    return (
      <Grid key={card.id} item>
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
