import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.5
  };

  constructor(props) {
    super(props);

    // TODO: set initial state
    this.state = {
      board: this.createBoard(this.props.nrows, this.props.ncols),
      hasWon: false
    };
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard(y, x) {
    let board = [];
    for (let i = 0; i < y; i++) {
      board.push([]);
      for (let k = 0; k < x; k++) {
        board[i].push(this.randomBoo());
      }
    }
    // TODO: create array-of-arrays of true/false values
    return board;
  }

  randomBoo() {
    return Math.random() >= this.props.chanceLightStartsOn;
  }
  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split('-').map(Number);
    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it
    flipCell(y, x);
    flipCell(y - 1, x);
    flipCell(y + 1, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    // win when every cell is turned off
    // TODO: determine is the game has been won
    // Has won
    this.setState({ board });

    if (this.checkWinner(this.state.board)) {
      this.winnerFunction();
    }
  }

  checkWinner(arr) {
    return arr.every(arr1 => arr1.every(ele => ele === false));
  }

  winnerFunction() {
    this.setState({
      board: null,
      hasWon: true
    });
  }
  /** Render game board or winning message. */

  render() {
    let numCells = this.state.hasWon
      ? 'You Won!'
      : this.state.board.map((arr, y) => (
          <tr key={y}>
            {arr.map((elem, x) => (
              <Cell
                isLit={elem}
                flipCellsAroundMe={this.flipCellsAround.bind(this)}
                coord={`${y}-${x}`}
                key={`${y}-${x}`}
              />
            ))}
          </tr>
        ));
    return (
      <table>
        <tbody>{numCells}</tbody>
      </table>
    );
    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

    // TODO
  }
}

export default Board;
