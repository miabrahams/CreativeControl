import React from 'react';


export default ProjectContainer = (props) => {

  const handleClick = (row, square) => {
    let { turn, winner } = this.state;
    const { rows } = this.state;
    const squareInQuestion = rows[row][square];

    if (this.state.winner) return;
    if (squareInQuestion) return;

    rows[row][square] = turn;
    turn = turn === 'X' ? 'O' : 'X';
    winner = checkWin(rows);

    this.setState({
      rows,
      turn,
      winner,
    });
  }

  return (
    <div className='projectContainer'>
      <ProjectSidebar/>
      <ProjectDisplay/>
    </div>
  )

}
