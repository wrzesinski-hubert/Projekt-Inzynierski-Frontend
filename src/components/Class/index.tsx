import React from "react";
import "./index.scss";
import Collapse from "@material-ui/core/Collapse";
import ExpandIcon from "./expand.png";

type ClassType = {
  group_id: string;
  day: string;
  time: string;
  lecturer: string;
  room: string;
};

export type Group = {
  classname: string;
  classgroups: Array<ClassType>;
};

interface ClassProps {
  onClassHover: (group_id: String, class_id: String) => void;
  onClassClick: (group_id: String, class_id: String) => void;
  data: Group;
}

interface ClassState {
  open: boolean;
}

export default class Class extends React.Component<ClassProps, ClassState> {
  constructor(props: ClassProps) {
    super(props);

    this.Open = this.Open.bind(this);
    this.state = {
      open: false,
    };
  }

  Open(e: React.MouseEvent) {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    return (
      <div className="class" >
        <div className="class__name" onClick={this.Open}>{this.props.data.classname}</div>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          {this.props.data.classgroups.map((classgroup, index) => (
            <div className="class__group">
              <p
                onMouseOver={() =>
                  this.props.onClassHover(
                    this.props.data.classname,
                    this.props.data.classgroups[index].group_id
                  )
                }
                onClick={() =>
                  this.props.onClassClick(
                    this.props.data.classname,
                    this.props.data.classgroups[index].group_id
                  )
                }
              >
                {classgroup.group_id} {classgroup.day} {classgroup.time}{" "}
                {classgroup.room} <br></br> {classgroup.lecturer}
              </p>{" "}
            </div>
          ))}
        </Collapse>
        <div onClick={this.Open}>
          <img alt="expand" src={ExpandIcon} className={`class__expandIcon${this.state.open?"Rotate":""}`} />
        </div>
      </div>
    );
  }
}
