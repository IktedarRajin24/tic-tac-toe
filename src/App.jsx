/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import "./App.css";

function Square({ value, onSquareClick }) {
  return (
    <button
      className="bg-white hover:bg-slate-200 border border-slate-400 h-16 w-16 text-3xl m-1 leading-9"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [0, 3, 6],
    [1, 2, 5],
  ];
  for (let i = 0; i < lines.length; i++) {
    let [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
}

function Board({ squares, isXNext, onPlay }) {
  const winner = calculateWinner(squares);
  let message;
  if (winner) {
    message = `Player ${winner} wins.`;
  } else {
    message = `${isXNext ? `Next Player: X` : `Next Player: O`}`;
  }
  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const newSquares = squares.slice();
    isXNext ? (newSquares[i] = "X") : (newSquares[i] = "O");
    onPlay(newSquares);
  };
  return (
    <Fragment className="w-1/2">
      <div className="flex justify-between">
        <h1 className="m-1 text-lg font-bold">{message}</h1>
      </div>
      <div className="flex">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="flex">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="flex">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </Fragment>
  );
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [isXNext, setIsXNext] = useState(true);
  const [currMove, setCurrMove] = useState(0);

  const currSquare = history[currMove];

  const handlePlay = (squares) => {
    setIsXNext(!isXNext);
    setHistory([...history, squares]);
    const nextHistory = [...history.slice(0, currMove + 1), squares];
    setCurrMove(nextHistory.length - 1);
  };
  const jumpTo = (move) => {
    setCurrMove(move);
    setIsXNext(move % 2 === 0);
  };

  const moves =
    history &&
    history.map((squares, move) => {
      let description;
      if (move > 0) {
        description = `Go to the move #${move}`;
      } else {
        description = "Start the game";
      }
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    });
  return (
    <div className="w-1/2 mx-auto flex md:flex-row flex-col gap-10">
      <div>
        <Board squares={currSquare} isXNext={isXNext} onPlay={handlePlay} />
      </div>
      <div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;
