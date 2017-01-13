const React = require('react');
const Board = require('./Board');
const Status = require('./Status');
const solutions = require('./solutions');

class Game extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      board: Array(9).fill(null),
      turn: "X"
    };

    this.handleReset = this.handleReset.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleReset (ev) {
    ev.preventDefault();
    this.setState({
      board: Array(9).fill(null)
    });
  }

  handleClick (i, ev) {
    ev.preventDefault();
    const nextPlayer = (this.state.turn === 'X' ? 'O' : 'X');
    this.setState({
      board: this.state.board.fill(this.state.turn, i, i+1),
      turn: nextPlayer
    });
  }

  getWinner () {
    let board = this.state.board;
    let isWinComboX = (position) => board[position] === "X";
    let isWinComboO = (position) => board[position] === "O";
    let anyWin = (solution) => solution.every(isWinComboX) || solution.every(isWinComboO);
    let checkResult = solutions.find(anyWin);

    if(checkResult !== undefined) {
      return board[checkResult[0]]
    }
  }

  isComplete () {
    return !this.state.board.includes(null) || !!this.getWinner();
  }

  render () {
    const status = this.isComplete() ? <Status winner={this.getWinner()} /> : null;
    return (
      <div className='game' >
        <Board board={this.state.board} onClick={this.handleClick} />
        {status}
        <button className="game__reset" onClick={this.handleReset} >Reset</button>
      </div>
    );
  }
}

module.exports = Game;
