import React from "react";
import "./index.scss";
import Collapse from "@material-ui/core/Collapse";

type ClassType = {
  group_id: string;
  day: string;
  time: string;
  lecturer: string;
  room: string;
};

type group = {
  classname:string;
  classgroups:Array<ClassType>
}

interface ClassProps {
  data: group;
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
      <div className="class" onClick={this.Open}>
        {this.props.data.classname}
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <p>
            {this.props.data.classgroups[0].group_id} {this.props.data.classgroups[0].day}
            {this.props.data.classgroups[0].time} {this.props.data.classgroups[0].room}
            <br></br> {this.props.data.classgroups[0].lecturer}
          </p>
          <p>
            {this.props.data.classgroups[1].group_id} {this.props.data.classgroups[1].day}
            {this.props.data.classgroups[1].time} {this.props.data.classgroups[1].room}
            <br></br> {this.props.data.classgroups[1].lecturer}
          </p>
          <p>
            {this.props.data.classgroups[0].group_id} {this.props.data.classgroups[0].day}
            {this.props.data.classgroups[0].time} {this.props.data.classgroups[0].room}
            <br></br> {this.props.data.classgroups[0].lecturer}
          </p>
          <p>
            {this.props.data.classgroups[1].group_id} {this.props.data.classgroups[1].day}
            {this.props.data.classgroups[1].time} {this.props.data.classgroups[1].room}
            <br></br> {this.props.data.classgroups[1].lecturer}
          </p>
        </Collapse>
      </div>
    );
  }
}
