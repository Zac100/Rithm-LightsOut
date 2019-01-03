import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';



class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.5
  };

  constructor(props) {
    super(props);
    this.clicks = 0;
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
    return board;
  }

  randomBoo() {
    return Math.random() >= this.props.chanceLightStartsOn;
  }
  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    this.clicks++;
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
    return (<>
      <h1>Score: {this.clicks}</h1>
      <table>
        <tbody>{numCells}</tbody>
      </table>
      </>
    );
   
  }
}

export default Board;
