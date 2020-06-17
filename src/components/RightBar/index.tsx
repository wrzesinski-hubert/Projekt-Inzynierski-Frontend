import React, { useState } from "react";
import "./index.scss";
import { Lecture } from "../../lectures";
import LectureCard from "./LectureCard";

interface RightBarProps {
	onGroupMouseOver: (id: string, name: string) => void;
	onGroupClick: (id: string, name: string) => void;
	lectures: Array<Lecture>;
}

export default function RightBar({ lectures, onGroupMouseOver, onGroupClick }: RightBarProps) {
	const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

	const onCardClick = (e: React.MouseEvent) => {
		const target = e.target as HTMLElement;
		console.log(`Target id is: ${target.id}`);
		selectedCardId === target.id ? setSelectedCardId(null) : setSelectedCardId(target.id);
	};

	return (
		<div className="right-bar">
			<div className="right-bar__text">
				Hubert Wrzesiński<br></br>
				Semestr zimowy 2020/2021
			</div>
			{lectures.map((lecture, index) => (
				<LectureCard
					lecture={lecture}
					key={index}
					id={index.toString()}
					onGroupMouseOver={onGroupMouseOver}
					onGroupClick={onGroupClick}
					onCardClick={onCardClick}
					isSelected={selectedCardId === index.toString()}
				/>
			))}
		</div>
	);
}
