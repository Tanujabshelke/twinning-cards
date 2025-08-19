import React, { use, useState } from "react";
import { Points } from "../Components/Points";
import { Cards } from "../Components/Cards";
import { CountDownTimer } from "../Components/CountDownTimer";
import { cardList } from "../Utils/data";
import { ShuffleCards } from "../Utils/ShuffleCards";
import { LoadPage } from "../Components/LoadPage";
import { Button } from "../Components/Button";

const shuffledCard = ShuffleCards(cardList);

const GameBoard = (props) => {
  const [isRunning, setIsRunning] = useState(false);
  const [points, setPoints] = useState(0);
  const [currentCard, setCurrentCard] = useState({});
  const [visibleCardId, setVisibleCardId] = useState(null);
  const [cards, setCards] = useState(shuffledCard);
  const [initialTime, setInitialTime] = useState(90);

  const handleTimeComplete = React.useCallback(() => {
    alert("time out!");
    setIsRunning(false);
  }, []);

  const handleCardClick = React.useCallback(
    (card) => {
      //Ignore clicked if alredy match
      if (card.isVisible) return;

      setVisibleCardId(card.id);

      //set card value for first time
      if (!currentCard || !currentCard.id) {
        setCurrentCard(card);
      } else {
        if (currentCard.name === card.name && currentCard.id !== card.id) {
          setPoints((p) => p + 1);

          //update cards
          setCards((prev) =>
            prev.map((_card) =>
              _card.id === card.id || _card.id === currentCard.id
                ? { ..._card, isVisible: true }
                : _card
            )
          );
        }

        //reset currentCard
        setCurrentCard(null);
      }

      //hide card after 5 sec
      setTimeout(() => {
        setVisibleCardId((current) => (current === card.id ? null : current));
      }, 500);
    },
    [currentCard]
  );

  const handleStart = React.useCallback((e) => {
    setIsRunning(true);
  }, []);

  const handleReset = React.useCallback((e) => {
    setIsRunning(false);
    setCards(shuffledCard);
    setCurrentCard(null);
    setVisibleCardId(null);
    setInitialTime(90);
  }, []);
  const renderCards = React.useMemo(() => {
    return (
      cards && (
        <div className="tc-game-board-card-container">
          {cards.map((card) => {
            return visibleCardId === card.id ? (
              <Cards {...card} isVisible={true} onClick={handleCardClick} />
            ) : (
              <Cards {...card} onClick={handleCardClick} />
            );
          })}
        </div>
      )
    );
  }, [visibleCardId, handleCardClick, cards]);
  return (
    <div className="tc-game-board-container">
      <div className="tc-game-board-header-container">
        <Points points={points} />
        <div>
          <Button onClick={handleReset} label={"Reset"} />
        </div>
        <CountDownTimer
          initialTime={initialTime}
          isRunning={isRunning}
          onComplete={handleTimeComplete}
        />
      </div>
      {isRunning ? renderCards : <LoadPage onClick={handleStart} />}
    </div>
  );
};

export { GameBoard };
