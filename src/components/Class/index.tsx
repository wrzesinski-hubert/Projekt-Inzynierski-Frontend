import React from "react";
import "./index.scss";
import Collapse from '@material-ui/core/Collapse';

interface ClassProps {
  name:string;
}

interface ClassState {
  open: boolean;
}

export default class Class extends React.Component<ClassProps, ClassState> {
  constructor(props: ClassProps) {
    super(props);

    this.Open = this.Open.bind(this);
    this.state={
      open:false,
    };
  }

  Open(e: React.MouseEvent) {
    this.setState({
      open:!this.state.open
    });
  }

  render() {
    return (
      <div className="paper" onClick={this.Open}>{this.props.name}
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
        <p>1CB Pn 10.00 A0-1<br></br> dr inż. Michał Ren</p>
        <p>1CB Pn 10.00 A0-1<br></br> dr inż. Michał Ren</p>
        <p>1CB Pn 10.00 A0-1<br></br> dr inż. Michał Ren</p>
        <p>1CB Pn 10.00 A0-1<br></br> dr inż. Michał Ren</p>


          </Collapse></div>
    );
  }
}
