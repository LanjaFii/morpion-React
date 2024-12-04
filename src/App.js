import { useState } from "react";

// Composant carré tsirairay
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Fonction par défaut pour iaffichena ny plateau
function Board({ xIsNext, squares, onPlay }) {
  // Fonction pour gérer les clics sur les cases
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
    onPlay(nextSquares); // Fonction itondrana anle plateau mankany amn composant Game
  }

  // Déterminer l'état de la partie
  const winner = calculateWinner(squares);
  const allNotNull = squares.every(
    (element) => element !== null && element !== undefined
  );
  let status;
  let gifSource = null;
  if (winner) {
    status = winner + " a gagné";
    gifSource =
      winner === "X"
        ? "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDZ5MXQ2MDVtNTVtbjVvZDBnb294d2ZkZG0xaHFhZXIxbW0wZmlrZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/o75ajIFH0QnQC3nCeD/giphy.webp"
        : "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzlueGVpc3ZlZDA3NG5tem52bGIwaTl4cDR3d2dqdDFlNjIxc3g4OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ddHhhUBn25cuQ/giphy.webp";
  } else if (allNotNull) {
    status = "Match nul";
    gifSource =
      "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGhrbTBlYzE4MGd4cGIzZDB2eHoxcWJyOG5zZHdwaW1henBmcG1jaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/03GtPbvwrQPdtVPNzq/giphy.webp";
  } else {
    status = "Prochain tour : " + (xIsNext ? "X" : "O");
  }

  // Affichage du plateau
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
      {gifSource && (
        <div className="gif-container">
          <img src={gifSource} alt="result gif" className="result-gif" />
        </div>
      )}
    </>
  );
}

// Fonction pour déterminer le gagnant
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

// Fonction principale newGame
export default function Game() {
  // Initialisation aléatoire : soit "X" (true), soit "O" (false)no manomboka
  const [firstPlayer, setFirstPlayer] = useState(
    Math.random() < 0.5 ? "X" : "O"
  );
  const [xIsNext, setXIsNext] = useState(firstPlayer === "X");
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  // Fonction mampiditra anle plateau anaty historique sady manova tour
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    if (nextMove % 2 === 0) {
      setXIsNext(firstPlayer === "X");
    } else {
      setXIsNext(firstPlayer === "O");
    }
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Aller au coup #" + move;
    } else {
      description = "Revenir au début";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // Ny zavatra retournen ny écran
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        <button onClick={newGame} className="nouv">
          Nouveau
        </button>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );

  // Fonction pour commencer une nouvelle partie
  function newGame() {
    setHistory([Array(9).fill(null)]); // Reinitialisation de l'historique
    setCurrentMove(0);
    const newFirstPlayer = firstPlayer === "X" ? "O" : "X";
    setFirstPlayer(newFirstPlayer); // On inverse qui commence
    setXIsNext(newFirstPlayer === "X"); // On définit qui commence pour le nouveau jeu
  }
}
