import BusinessLogicContext from "./BusinessLogicContext";
import React, { Component } from "react";
import { User } from "./models/user";

export interface BuisnessProvided {
	states: BuisnessState;
	reducers: () => void;
}

interface BuisnessState {
	user: User | null;
}

interface Props {}

class BusinessLogicProvider extends Component<Props, BuisnessState> {
	constructor(props: Props) {
		super(props);
		this.state = {
			user: null,
		};
	}

	componentDidMount() {
		this.login();
	}

	login() {
		const urlParams = new URLSearchParams(window.location.search);
		const ticket = urlParams.get("ticket");

		if (!ticket && !this.state.user) {
			window.location.replace(
				`https://cas.amu.edu.pl/cas/login?service=${window.origin}&locale=pl`
			);
		} else if (ticket && !this.state.user) {
			this.setState({ user: { ticket } });
		}
	}

	logout() {
		window.location.replace(
			`https://cas.amu.edu.pl/cas/logout?service=${window.origin}`
		);
	}

	render() {
		return (
			<BusinessLogicContext.Provider
				value={{
					states: this.state,
					reducers: () => {
						this.logout();
					},
				}}
			>
				{this.props.children}
			</BusinessLogicContext.Provider>
		);
	}
}

export default BusinessLogicProvider;
