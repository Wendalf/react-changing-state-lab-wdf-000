const React = require('react');
const Field = require('./Field');

class Board extends React.Component {
  render () {
    const { board, onClick } = this.props;
    let fields = board.map((field, index) => {
        return <Field player={field} key={index} onClick={onClick.bind(null, index)} />
      });


    return (
      <div className="board">
        {fields}  
      </div>
    );
  }
}

module.exports = Board;
