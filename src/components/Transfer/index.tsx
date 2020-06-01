import React from "react";
import Modal from "@material-ui/core/Modal";
import "./index.scss";

interface TransferProps {
  names?: string;
}

interface TransferState {
  isOpen: boolean;
}

export default class Transfer extends React.Component<
  TransferProps,
  TransferState
> {
  constructor(props: TransferProps) {
    super(props);

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  handleOpen(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    this.setState({
      isOpen: true,
    });
  }

  handleClose(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    this.setState({
      isOpen: false,
    });
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.handleOpen}>
          Open Modal
        </button>
        <Modal
        className="wrapper"
          open={this.state.isOpen}
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
