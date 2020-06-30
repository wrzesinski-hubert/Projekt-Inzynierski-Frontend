import React from "react";
import "./index.scss";
import Transfer from "./transfer.png";
import Search from "./search.svg";
import UK from "./UK.png";
import PL from "./PL.png";
import User from "./user.png";
import CloseIcon from "./close.svg";
import { Profile } from "./Profile";
import {Results} from "./Results";

interface TopBarProps {
	handleTransfer: (e: React.MouseEvent) => void;
	onLangChange: (lang: boolean) => void;
	handleLogout: () => void;
}

interface TopBarState {
	isPolish: boolean;
	anchorEl: HTMLElement | null;
}

export default class TopBar extends React.Component<TopBarProps, TopBarState> {
	constructor(props: TopBarProps) {
		super(props);
		this.handleProfile = this.handleProfile.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.onLangChange = this.onLangChange.bind(this);
		this.handleTransfer = this.handleTransfer.bind(this);
		this.state = {
			isPolish: true,
			anchorEl: null,
		};
	}

	handleTransfer(e: React.MouseEvent) {
		this.props.handleTransfer(e);
	}

	onLangChange(e: React.MouseEvent) {
		this.setState({
			isPolish: !this.state.isPolish,
		});
		this.props.onLangChange(this.state.isPolish);
	}

	handleProfile(event: React.MouseEvent<HTMLImageElement>) {
		this.setState({
			anchorEl: event.currentTarget,
		});
	}

	handleClose() {
		this.setState({
			anchorEl: null,
		});
	}

	render() {
		return (
			<div className="top-bar">
				<div className="top-bar__logo">
					<img
						className="top-bar__logo-image"
						alt="logo"
						src="https://plannaplan.pl/img/logo.svg"
					/>
					<div className="top-bar__tekst"> plan na plan </div>
				</div>
				<div className="top-bar__input-div">
					<img
						className="top-bar__input-icon"
						alt="search"
						src={Search}
					/>
					<div className="top-bar__input-field"><Results/></div>
					<img
						className="top-bar__input-icon"
						alt="close"
						src={CloseIcon}
					/>
				</div>
				<div className="top-bar__icon-box">
					<img
						className="top-bar__icon"
						alt="transfer"
						src={Transfer}
						onClick={this.handleTransfer}
					/>
					<img
						className="top-bar__icon"
						alt="change_language"
						src={this.state.isPolish ? UK : PL}
						onClick={this.onLangChange}
					/>
					<img
						className="top-bar__icon"
						alt="profile"
						src={User}
						onClick={this.handleProfile}
					/>
					<Profile
						anchorEl={this.state.anchorEl}
						handleClose={this.handleClose}
						handleLogout={this.props.handleLogout}
					/>
				</div>
			</div>
		);
	}
}
