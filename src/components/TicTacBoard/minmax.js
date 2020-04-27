import React from 'react'
import Cross from './cross'
import Circle from './circle'

const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const scores = {
  X: 10,
  O: -10,
  Tie: 0
}

let countLoop = 0

function minimaxPrev(board, depth, isMaximizing) {
  countLoop += 1;
  const result = checkWinner(board);
  if (result) {
    return scores[result];
  }
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = <Cross key="X" />; // ai player
        let score = minimax(board, depth + 1, false);
        board[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } 
  else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = <Circle key="O" />;
        let score = minimax(board, depth + 1, true);
        board[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function minimax(board, isMaximizing) {
  countLoop += 1;
  const result = checkWinner(board);
  if (result) {
    return scores[result];
  }
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = <Cross key="X" />; // ai player
        let score = minimax(board, false);
        board[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } 
  else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = <Circle key="O" />;
        let score = minimax(board, true);
        board[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function minimaxAlphaBeta(board, depth, alpha, beta, isMaximizing) {
  countLoop += 1;
  const result = checkWinner(board);
  if (result !== null) {
    return scores[result];
  }
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = <Cross key="X" />; // ai player
        let score = minimaxAlphaBeta(board, depth + 1, alpha, beta, false);
        board[i] = "";
        bestScore = Math.max(score, bestScore);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) break;
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = <Circle key="O" />;
        let score = minimaxAlphaBeta(board, depth + 1, alpha, beta, true);
        board[i] = "";
        bestScore = Math.min(score, bestScore);
        beta = Math.min(beta, score);
        if (beta <= alpha) break;
      }
    }
    return bestScore;
  }
}

export function getNextIndex(boardItems, isMaximizing=true) {
  let nextIndex = 0;
  const board = [...boardItems];
  countLoop = 0;
  console.log('Board, getNextIndex: ', board)

  if(isMaximizing === false){
    let bestScore = Infinity; // worst possible min score/index
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = <Circle key="X" />;
        let score = minimax(board, true);
        // let score = minimaxAlphaBeta(board, 0, -Infinity, Infinity, true);
        board[i] = "";
        if (score < bestScore) {
          bestScore = score;
          nextIndex = i;
        }
      }
    }
  }
  else{
    let bestScore = -Infinity; // worst possible max score/index
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = <Cross key="X" />;
        // let score = minimax(board, false);
        let score = minimaxAlphaBeta(board, 0, -Infinity, Infinity, false);
        board[i] = "";
        if (score > bestScore) {
          bestScore = score;
          nextIndex = i;
        }
      }
    }
  }
  console.log("Counts: ", countLoop, " | ", "NextMove: ", nextIndex);
  return nextIndex;
}

export function checkWinner(board){
  for (let i = 0; i < 8; i++) {
    const id1 = winCondition[i][0];
    const id2 = winCondition[i][1];
    const id3 = winCondition[i][2];
    const item1 = board[id1] && board[id1].key;
    const item2 = board[id2] && board[id2].key;
    const item3 = board[id3] && board[id3].key;

    if (item1 === "X" && item2 === "X" && item3 === "X") return "X";
    else if (item1 === "O" && item2 === "O" && item3 === "O") return "O";
  }
  const isEveryItemFilled = board.every(item => item !== "");
  if (isEveryItemFilled) return "Tie";
  return null;
}
