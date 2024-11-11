import { useState } from "react";

//Composant carrée kely
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

//Fonction par défaut mampiseo ny zavatra eo @ écran
export default function Board() {
  const [tour, setTour] = useState(true);
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  //Fonction manisy anle X sy O amle cases
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  // Bout de code anaovana anle soeratra eo ambony
  const winner = calculateWinner(squares);
  const allNotNull = squares.every(
    (element) => element !== null && element !== undefined
  );
  let status;
  if (winner) {
    status = winner + " a gagné";
  } else if (allNotNull) {
    status = "Match nul";
  } else {
    status = "Prochain tour : " + (xIsNext ? "X" : "O");
  }

  // Fonction anle bouton nouveau
  function newGame() {
    setSquares(Array(9).fill(null));
    setTour(!tour);
    setXIsNext(tour);
  }

  //Izay zavatra retourné eo @ écran
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <button onClick={newGame}>Nouveau</button>
    </>
  );
}

//Fonction mampahafantatra ny mpandresy
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
