import React from "react";
import { displayCard } from "../Utils/data";

const Image = (props) => {
  const { id, img, name } = props;

  return <img key={id} src={img} alt={name} width={80} height={120} />;
};

const Cards = (props) => {
  const { id, name, img, onClick, isVisible = false } = props;

  const handleClick = React.useCallback(
    (e) => {
      let cardInfo = { id: id, name: name };

      onClick?.(cardInfo);
    },
    [onClick, id, name]
  );

  return (
    <div className="tc-card" key={id} onClick={handleClick}>
      {isVisible ? (
        <Image id={id} name={name} img={img} />
      ) : (
        <Image {...displayCard} />
      )}
    </div>
  );
};

export { Cards };
