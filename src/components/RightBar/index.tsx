import React, { useState, useContext } from 'react';
import './index.scss';
import { Course } from '../../types';
import { CourseCard } from './CourseCard/index';
import { coursesContext } from '../../contexts/CoursesProvider';

interface RightBarProps {
  onGroupMouseOver: (id: number, name: string) => void;
}

export default function RightBar({ onGroupMouseOver }: RightBarProps) {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const { courses } = useContext(coursesContext)!;

  const onCardClick = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    selectedCardId === target.id ? setSelectedCardId(null) : setSelectedCardId(target.id);
  };

  return (
    <div className="right-bar">
      <div className="right-bar__text">
        Hubert Wrzesiński<br></br>
        Semestr zimowy 2020/2021
      </div>
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
    </div>
  );
}
