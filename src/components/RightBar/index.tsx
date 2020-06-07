import React from "react";
import "./index.scss";
import Paper from "@material-ui/core/Paper";
interface RightBarProps {}

interface RightBarState {}

export default class RightBar extends React.Component<
  RightBarProps,
  RightBarState
> {

  render() {
    return (
      <div className="shop-cart">
        <div className="text">
          Hubert Wrzesiński<br></br>
          Semestr zimowy 2020/2021
        </div>
        <Paper className="paper">1</Paper>
        <Paper className="paper">2</Paper>
        <Paper className="paper">3</Paper>
        <Paper className="paper">4</Paper>
        <Paper className="paper">5</Paper>
        <Paper className="paper">6</Paper>
        <Paper className="paper">7</Paper>
        <Paper className="paper">8</Paper>
        <Paper className="paper">9</Paper>
        <Paper className="paper">10</Paper>
      </div>
    );
  }
}
