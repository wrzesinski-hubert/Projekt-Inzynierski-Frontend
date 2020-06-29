import React, { useState, useContext } from "react";
import "./index.scss";
import { Lecture } from "../../lectures";
import LectureCard from "./LectureCard";
import { BusinessLogicContext } from "../../businesslogic/BusinessLogicProvider";

interface RightBarProps {
	onGroupMouseOver: (id: string, name: string) => void;
	onGroupClick: (id: string, name: string) => void;
	lectures: Array<Lecture>;
}

export default function RightBar({ lectures, onGroupMouseOver, onGroupClick }: RightBarProps) {
	const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

	const ticket = useContext(BusinessLogicContext).user?.ticket;

	const onCardClick = (e: React.MouseEvent) => {
		const target = e.currentTarget as HTMLElement;
		selectedCardId === target.id ? setSelectedCardId(null) : setSelectedCardId(target.id);
	};

	return (
		<div className="right-bar">
			<p>{ticket}</p>
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
