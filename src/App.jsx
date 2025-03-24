import { useState } from "react";

import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./winning-combinations"
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2' 
}


const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

function deriveActivePlayer(gameTurns){
  let activePlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
    activePlayer = 'O';
  }

  return activePlayer;
}

function App() {
  const [players, setPLayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  function deriveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map(row => [...row])];

    for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;

      gameBoard[row][col] = player;
    }

    return gameBoard
  }

  function deriveWinner(gameBoard) {
    for (const combination of WINNING_COMBINATIONS) {
      const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

      if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
        return players[firstSquareSymbol];
      }
    }
  }

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare (rowIndex, cellIndex) {
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{square:{row: rowIndex, col: cellIndex}, player: currentPlayer},...prevTurns];

      return updatedTurns;
    });
  }

  function handleRematch() {
    setGameTurns([]);
  }

  const handlePlayerNameChange = (symbol, name) => {
    setPLayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: name
      }
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player onChangeName={handlePlayerNameChange} initialName={PLAYERS.X} symbol="X" isActive={activePlayer === "X"}/>
          <Player onChangeName={handlePlayerNameChange} initialName={PLAYERS.O} symbol="O" isActive={activePlayer === "O"}/>
        </ol>
        {(winner || hasDraw) && <GameOver onRematch={handleRematch} winner={winner}/>}
        <GameBoard 
          onSelectSquare={handleSelectSquare}  
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
