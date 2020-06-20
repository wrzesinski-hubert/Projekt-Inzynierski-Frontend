import React from "react";
import "./index.scss";
import Class, { Group } from "../Class";
import BusinessLogicContext from "../../businesslogic/BusinessLogicContext";
import { BuisnessProvided } from "../../businesslogic/BusinessLogicProvider";

interface RightBarProps {
	onClassHover: (group_id: String, class_id: String) => void;
	onClassClick: (group_id: String, class_id: String) => void;
	lectures: Array<Group>;
}

interface RightBarState {}

export default class RightBar extends React.Component<
	RightBarProps,
	RightBarState
> {
	render() {
		return (
			<div className="right-bar">
				<BusinessLogicContext.Consumer>
					{(context) => (
						<h1>
							{JSON.stringify(
								(context as BuisnessProvided).states.user
									?.ticket
							)}
						</h1>
					)}
				</BusinessLogicContext.Consumer>
				{this.props.lectures.map((classgroup, index) => (
					<Class
						onClassHover={this.props.onClassHover}
						onClassClick={this.props.onClassClick}
						data={classgroup}
						key={index}
					/>
				))}
			</div>
		);
	}
}
