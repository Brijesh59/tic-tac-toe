import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Circle from "./circle";
import Cross from "./cross";
import {getNextIndex, checkWinner} from './minmax'
import "./styles.css";

const generateArray = () => {
  return new Array(9).fill("");
};

const players = {
  player1: true,
  player2: false
};

// const getNextIndex2 = items => {
//   let nextIndex = Math.floor(Math.random() * 9);
//   while (items[nextIndex] !== "") {
//     nextIndex = Math.floor(Math.random() * 9);
//   }
//   console.log(nextIndex);
//   return nextIndex;
// };

export default function App() {
  const [boardItems, setBoardItems] = useState(()=>generateArray());
  const [activePlayer, setActivePlayer] = useState(players);
  const [status, setStatus] = useState(null);
  const [isAIActive, setIsAIActive] = useState(false);

  useEffect(() => {
    console.log('BoardItems: ', boardItems)
    const winner = checkWinner(boardItems);
    if (winner) {
      switch (winner) {
        case "X":
          if(isAIActive) setStatus("AI Won 😎");
          else setStatus("X Won");
          break;
        case "O":
          if(isAIActive) setStatus("You Won 👏🏻");
          else setStatus("O Won");
          break;
        case "Tie":
          setStatus("It's a Tie");
          break;
        default:
          return;
      }
    }
    // play AI move
    if (isAIActive && activePlayer.player1 && !winner) {
      const index = getNextIndex(boardItems);
      setTimeout(() => {
        handleBoardClick(index);
      }, 500);
    }
    // else if (isAIActive && activePlayer.player2 && !winner) {
    //   const index = getNextIndex(boardItems, false);
    //   setTimeout(() => {
    //     handleBoardClick(index);
    //   }, 500);
    // }
  }, [boardItems]);

  const handleBoardClick = index => {
    const board = [...boardItems];
    // const board = JSON.parse(JSON.stringify(boardItems));
    // if there is already an item in box or the game has finished, return
    if (board[index] || status) {
      console.log("item Already  present");
      return;
    }

    if (activePlayer.player1 && !status) {
      board[index] = <Cross key="X" />;
    } else if(activePlayer.player2 && !status){
      board[index] = <Circle key="O" />;
    }
    setActivePlayer({
      player1: !activePlayer.player1,
      player2: !activePlayer.player2
    });
    setBoardItems(board);
  };

  const reset = () => {
    setBoardItems(generateArray()); // clear the board
    setActivePlayer(players); // set active player1 active
    setStatus(null); // set winner to null
    setIsAIActive(false);
  };

  return (
    <div style={{ marginTop: 70 }}>
      <div style={{ marginLeft: 30 ,height: 30, marginBottom: 50, color: '#1EA508', fontFamily: 'Viga'}}>
        <h1>{status}</h1></div>
      <div className="grid-container">
        {boardItems.map((item, index) => (
          <div
            className="grid-item"
            key={index}
            onClick={() => handleBoardClick(index)}
          >
            {item}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20, marginLeft: 0 }} >
        <Button variant="danger" size="sm" className="m-2" onClick={reset}>
          Reset
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            setIsAIActive(true);
            handleBoardClick(Math.floor(Math.random()*9));
            // handleBoardClick(getNextIndex(boardItems));
          }}
        >
          Play with AI
        </Button> 
      </div>  
    </div>
  );
}
