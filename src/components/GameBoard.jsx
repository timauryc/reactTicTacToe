
// const initialGameBoard = [
//     [null, null, null],
//     [null, null, null],
//     [null, null, null]
// ];


export default function GameBoard({onSelectSquare, board}) {

    // let gameBoard = initialGameBoard;

    // for (const turn of turns) {
    //     const { square, player } = turn;
    //     const { row, col } = square;

    //     gameBoard[row][col] = player;
    // }


    return <ol id="game-board">
        {board.map((row, rowIndex) => <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, cellIndex) => (
                    <li key={cellIndex}>
                        <button onClick={() => onSelectSquare(rowIndex, cellIndex)} disabled={playerSymbol !== null }>{playerSymbol}</button>
                    </li>
                ))}
            </ol>
        </li>)}
    </ol>
};