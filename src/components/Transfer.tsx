import React from 'react';
import Modal from '@material-ui/core/Modal';
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

const TransferStyled = styled.div`
  display: flex;
  flex-direction: row;
  outline: none;
  min-width: 35%;
  height: 70%;
  padding-top: 40px;
  background: white;
  box-shadow: 0px 0px 0px 4px #006b96;
  margin: 0 auto;
  border-radius: 5px;
  text-transform: uppercase;
  letter-spacing: 0.3ch;
`;

const TransferGiveStyled = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TransferReceiveStyled = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TransferTextStyled = styled.div`
  font-size: 30px;
  margin-bottom: 10px;
`;

const TransferInputStyled = styled.div`
  width: 250px;
  height: 25px;
  padding: 10px;
  font-size: 24px;
  transition-duration: 0.3s;
  input::placeholder {
    color: black;
    font-weight: bold;
    text-align: center;
  }
`;

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
          <TransferStyled>
            <TransferGiveStyled>
              <TransferTextStyled>Oddam</TransferTextStyled>
              <TransferInputStyled>
                {' '}
                <Input
                  placeholder="Wyszukaj..."
                  inputProps={{ 'aria-label': 'description' }}
                  className="top-bar__input-field"
                />
              </TransferInputStyled>
            </TransferGiveStyled>
            <TransferReceiveStyled>
              <TransferTextStyled>Przyjmę</TransferTextStyled>
              <TransferInputStyled>
                {' '}
                <Input
                  placeholder="Wyszukaj..."
                  inputProps={{ 'aria-label': 'description' }}
                  className="top-bar__input-field"
                />
              </TransferInputStyled>
            </TransferReceiveStyled>
          </TransferStyled>
        </Fade>
      </Modal>
    </div>
  );
};
