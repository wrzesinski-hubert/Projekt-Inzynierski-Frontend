import React from "react";
import "./index.scss";
import Class, { Group } from "../Class";

interface RightBarProps {
  onClassHover: (group_id: String, class_id: String) => void;
  onClassClick: (group_id: String, class_id: String) => void;
  lectures: Array<Group>;
}

interface RightBarState {}

export default class RightBar extends React.Component<
  RightBarProps,
  RightBarState
> {
  render() {
    return (
      <div className="right-bar">
        <div className="right-bar__text">
          Hubert Wrzesiński<br></br>
          Semestr zimowy 2020/2021
        </div>
        {this.props.lectures.map((classgroup, index) => (
          <Class
            onClassHover={this.props.onClassHover}
            onClassClick={this.props.onClassClick}
            data={classgroup}
            key={index}
          />
        ))}
      </div>
    );
  }
}
