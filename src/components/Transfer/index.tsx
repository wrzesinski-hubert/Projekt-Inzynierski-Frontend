import React from "react";
import Modal from "@material-ui/core/Modal";
import "./index.scss";
import Fade from '@material-ui/core/Fade';
import Input from "@material-ui/core/Input";
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
  }

  handleClose(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    this.props.handleClose(e);
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
          <Fade in={this.props.isOpen}>
          <div className="transfer">
              <div className="transfer__give">
                <div className="transfer__text">Oddam</div>
                <div className="transfer__input2">					<Input
						placeholder="Wyszukaj..."
						inputProps={{ "aria-label": "description" }}
						className="top-bar__input-field"
					/></div>
                </div>
              <div className="transfer__receive">
                <div className="transfer__text">Przyjmę</div>
                <input className="transfer__input"></input>
              </div>
          </div>
          </Fade>
        </Modal>
        
      </div>
    );
  }
}
