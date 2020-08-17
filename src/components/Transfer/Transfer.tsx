import React from 'react';
import Modal from '@material-ui/core/Modal';
import './index.scss';
import Fade from '@material-ui/core/Fade';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

interface TransferProps {
  handleClose: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isOpen: boolean;
}

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
});

export const Transfer = ({ handleClose, isOpen }: TransferProps) => {
  const classes = useStyles();

  return (
    <div>
      <Modal
        className={classes.wrapper}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Fade in={isOpen}>
          <div className="transfer">
            <div className="transfer__give">
              <div className="transfer__text">Oddam</div>
              <div className="transfer__input2">
                {' '}
                <Input
                  placeholder="Wyszukaj..."
                  inputProps={{ 'aria-label': 'description' }}
                  className="top-bar__input-field"
                />
              </div>
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
};
