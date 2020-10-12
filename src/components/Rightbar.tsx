import React, { useContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { CourseCard } from './CourseCard';
import { coursesContext } from '../contexts/CoursesProvider';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import styled from 'styled-components';

const RightbarStyled = styled.div`
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 15px;
  text-align: center;
  font-family: Lato;
  height: 100%;
  width: 300px;
  overflow-y: scroll;
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #f5f5f5;
  }
  ::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #d4b851;
    border: 1px solid;
  }
`;
const RightbarTextStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

const SaveButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #417cab !important;
  border-radius: 10px;
  cursor: pointer;
  height: 40px;
  background-color: red;
  margin-bottom: 10px;
  &:hover {
    color: white;
  }
  box-shadow: 6px 6px 6px -2px rgba(0,0,0,0.59);
`;

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const Rightbar = () => {
  const { courses, basket, saveBasket } = useContext(coursesContext)!;

  const [open, setOpen] = React.useState(false);

  const getBasketGroups = () => {
    const names = basket.map(({ name }) => name);
    return courses.filter(({ name }) => names.includes(name));
  };

  const filteredCourses = getBasketGroups();

  const save = () => {
    saveBasket();
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  //need to insert student name from db and course maybe based on current time or from db too
  return (
    <RightbarStyled>
      <RightbarTextStyled>
        <p>
          Hubert Wrzesiński<br></br>
          Semestr zimowy 2020/2021
        </p>
        <SaveButton onClick={save}>ZAPISZ</SaveButton>
      </RightbarTextStyled>
      {filteredCourses.map((course, index) => (
        <CourseCard course={course} key={index} />
      ))}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Zapisano plan!
        </Alert>
      </Snackbar>
    </RightbarStyled>
  );
};
