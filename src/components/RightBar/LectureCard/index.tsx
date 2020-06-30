import React from "react";
import "./index.scss";
import Collapse from "@material-ui/core/Collapse";
import ExpandIcon from "./expand.png";
import { Lecture } from "../../../lectures";

interface LectureCardProps {
  onGroupMouseOver: (id: string, name: string) => void;
  onGroupClick: (id: string, name: string) => void;
  onCardClick: (e: React.MouseEvent) => void;
  lecture: Lecture;
  id: string;
  isSelected: boolean;
}

export default function LectureCard({
  onGroupMouseOver,
  onGroupClick,
  onCardClick,
  lecture,
  id,
  isSelected,
}: LectureCardProps) {
  return (
    <div className="class" onClick={onCardClick} id={id}>
      <div className="class__name">{lecture.name}</div>
      <Collapse
        className="expanded"
        in={isSelected}
        timeout="auto"
        unmountOnExit
      >
        {lecture.groups.map((group, index) => (
          <div
            className="class__group"
            key={index}
            onMouseOver={() => onGroupMouseOver(group.id, lecture.name)}
            onClick={() => onGroupClick(group.id, lecture.name)}
          >
            <p>
              {group.time} {group.room} <br></br> {group.lecturer}
            </p>{" "}
          </div>
        ))}
      </Collapse>
      <div onClick={onCardClick} id={id}>
        <img
          alt="expand"
          src={ExpandIcon}
          className={`class__expandIcon${isSelected ? "Rotate" : ""}`}
        />
      </div>
    </div>
  );
}
