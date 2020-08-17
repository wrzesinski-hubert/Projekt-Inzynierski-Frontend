import React, { useState, useContext } from 'react';
import { CourseCard } from './CourseCard/index';
import { coursesContext } from '../../contexts/CoursesProvider';
import styled from 'styled-components';

interface RightBarProps {
  onGroupMouseOver: (id: number, name: string) => void;
}

const RightBarStyled = styled.div`
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 15px;
  text-align: center;
  font-family: Lato;
  width: 300px;
  height: 85vh;
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
const RightBarTextStyled = styled.div`
  border-bottom: 1px solid;
`;

export default function RightBar({ onGroupMouseOver }: RightBarProps) {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const { courses } = useContext(coursesContext)!;

  const onCardClick = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    selectedCardId === target.id ? setSelectedCardId(null) : setSelectedCardId(target.id);
  };

  return (
    <RightBarStyled>
      <RightBarTextStyled>
        Hubert Wrzesiński<br></br>
        Semestr zimowy 2020/2021
      </RightBarTextStyled>
      {courses.map((course, index) => (
        <CourseCard
          course={course}
          key={index}
          id={index.toString()}
          onGroupMouseOver={onGroupMouseOver}
          onCardClick={onCardClick}
          isSelected={selectedCardId === index.toString()}
        />
      ))}
    </RightBarStyled>
  );
}
