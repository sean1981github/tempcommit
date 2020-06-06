import React from "react";
import Button from "./HomeButton.js";
import data from "../data/HomePageData";

const ButtonFactory = (props) => {
  const cardInfo = data.filter((data) => data.role === props.role);
  const buttonInfo = cardInfo[0].cards.filter(
    (card) => card.title === props.title
  );

  return buttonInfo[0].buttons.map((button) => {
    return (
      <Button
        key={button.id}
        title={button.title}
        path={button.path}
        history={props.history}
      />
    );
  });
};

export default ButtonFactory;
