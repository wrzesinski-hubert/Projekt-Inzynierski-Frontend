import React, { useContext } from 'react';
import { CourseCard } from './CourseCard';
import { coursesContext } from '../contexts/CoursesProvider';
import styled from 'styled-components';
import { debounce } from '../utils/index';
import { SyncLoader } from 'react-spinners';

const RightbarWrapper = styled.div`
  padding: 15px;
  text-align: center;
  height: 100%;
  width: 350px;
  overflow-y: scroll;
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }
  ::-webkit-scrollbar {
    width: 5px;
    border-style: none;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #4b4b4b;
  }
  background-color: white;
  border-radius: 5px;
  box-shadow: 3px 3px 3px -2px rgba(0, 0, 0, 0.59);
`;
const SaveButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  background-color: #43a047;
  border-radius: 10px;
  cursor: pointer;
  height: 40px;
  margin-bottom: 10px;
  &:hover {
    color: #ffffff;
  }
  &:active {
    background-color: #54c457;
  }

  box-shadow: 3px 3px 5px 0px rgba(189,189,189,1);
`;

export const Rightbar = () => {
  const { selectBasketCourses, saveBasket, userID, isSavingLoading } = useContext(coursesContext)!;

  const basketCourses = selectBasketCourses();
  const handleSave = debounce(() => saveBasket(userID), 500);
  return (
    <RightbarWrapper>
      <SaveButton onClick={()=> {!isSavingLoading && handleSave() }}> {isSavingLoading ? <SyncLoader size={9}/> : "ZAPISZ"}</SaveButton>
      {basketCourses.map((course) => (
        <CourseCard course={course} key={course.id} />
      ))}
    </RightbarWrapper>
  );
};
