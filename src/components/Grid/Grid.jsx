import { useState } from "react";
import Card from "../Card/Card";
import "./Grid.css";

function isWinner(board, symbol) {
  // Rows
  if (board[0] === symbol && board[1] === symbol && board[2] === symbol)
    return symbol;
  if (board[3] === symbol && board[4] === symbol && board[5] === symbol)
    return symbol;
  if (board[6] === symbol && board[7] === symbol && board[8] === symbol)
    return symbol;

  // Columns
  if (board[0] === symbol && board[3] === symbol && board[6] === symbol)
    return symbol;
  if (board[1] === symbol && board[4] === symbol && board[7] === symbol)
    return symbol;
  if (board[2] === symbol && board[5] === symbol && board[8] === symbol)
    return symbol;

  // Diagonals
  if (board[0] === symbol && board[4] === symbol && board[8] === symbol)
    return symbol;
  if (board[2] === symbol && board[4] === symbol && board[6] === symbol)
    return symbol;

  return "";
}

function Grid({ numberofCards }) {
  const [turn, setTurn] = useState(true); // false -> X , true => o
  const [board, setBoard] = useState(Array(numberofCards).fill("")); //["","",""]
  const [winner, setWinner] = useState(null);

  function play(index) {
    console.log("move played", index);
    if (turn == true) {
      board[index] = "O";
    } else {
      board[index] = "X";
    }
    const win = isWinner(board, turn ? "O" : "X");
    console.log("Winner is", win);
    if (win) {
      setWinner(win);
    }
    setBoard([...board]);
    setTurn(!turn);
  }
  function reset() {
    setBoard(Array(numberofCards).fill(""));
    setWinner(null);
    setTurn(true);
  }

  return (
    <div className="grid-wrapper">
      {winner && (
        <>
          <h1 className="turn-highlight"> Winner is {winner}</h1>
          <button className="reset" onClick={reset}>
            {" "}
            Reset Game
          </button>
        </>
      )}
      <h1 className="turn-highlight"> Current Turn : {turn ? "O" : "X"} </h1>

      <div className="grid">
        {board.map((value, idx) => {
          return <Card onPlay={play} player={value} key={idx} index={idx} />;
        })}
      </div>
    </div>
  );
}
export default Grid;
