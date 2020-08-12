import React, { useContext } from 'react';
import './index.scss';
import Collapse from '@material-ui/core/Collapse';
import ExpandIcon from './expand.png';
import { Course, Group } from '../../../types/index';
import { coursesContext } from '../../../contexts/CoursesProvider';
import { group } from 'console';

interface CourseCardProps {
  onGroupMouseOver: (id: number, name: string) => void;
  onCardClick: (e: React.MouseEvent) => void;
  course: Course;
  id: string;
  isSelected: boolean;
}

export function CourseCard({ onGroupMouseOver, onCardClick, course, id, isSelected }: CourseCardProps) {
  const { addGroup, courses } = useContext(coursesContext)!;

  function onGroupClick(group: Group) {
    addGroup(group);
  }

  return (
    <div className="class" onClick={onCardClick} id={id}>
      <div className="class__name">{course.name}</div>
      <Collapse className="expanded" in={isSelected} timeout="auto" unmountOnExit>
        {courses.map((course, index) => (
          <>
            {course.groups.map((group, index) => (
              <div
                className="class__group"
                key={index}
                onMouseOver={() => onGroupMouseOver(group.id, course.name)}
                onClick={() => onGroupClick(group)}
              >
                <p>
                  {group.time} {group.room} <br></br> {group.lecturer}
                </p>{' '}
              </div>
            ))}
          </>
        ))}
      </Collapse>
      <div onClick={onCardClick} id={id}>
        <img alt="expand" src={ExpandIcon} className={`class__expandIcon${isSelected ? 'Rotate' : ''}`} />
      </div>
    </div>
  );
}
