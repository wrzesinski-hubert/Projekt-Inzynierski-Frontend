import React from "react";
import Modal from "@material-ui/core/Modal";
import "./index.scss";

interface TransferProps {
  handleClose: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isOpen: boolean;
}

interface TransferState {}

export default class Transfer extends React.Component<
  TransferProps,
  TransferState
> {
  constructor(props: TransferProps) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.state = {
      isOpen: true,
    };
  }

  handleClose(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    this.props.handleClose(e);
    this.setState({
      isOpen: false,
    });
  }

  render() {
    return (
      <div>
        <Modal
          className="wrapper"
          open={this.props.isOpen}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="transfer">
            <button type="button" onClick={this.handleClose}>
              Close Modal
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}
