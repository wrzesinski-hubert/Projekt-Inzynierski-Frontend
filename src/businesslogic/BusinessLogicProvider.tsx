import BusinessLogicContext from "./BusinessLogicContext";
import React, { Component } from "react";
import { User } from "./models/user";

export interface BuisnessProvided {
	states: BusinessState;
	reducers: {
		userlogout: () => void;
	};
}

interface BusinessState {
	user: User | null;
}

interface Props {}

class BusinessLogicProvider extends Component<Props, BusinessState> {
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

		if (!ticket) {
			this.redirectToCASLoginService();
		}
		if (ticket) {
			this.setState({ user: { ticket } });
		}
	}

	logout() {
		this.redirectToCASLogoutService();
	}

	redirectToCASLogoutService() {
		window.location.replace(
			`https://cas.amu.edu.pl/cas/logout?service=${window.origin}`
		);
	}

	redirectToCASLoginService() {
		window.location.replace(
			`https://cas.amu.edu.pl/cas/login?service=${window.origin}&locale=pl`
		);
	}

	render() {
		return (
			<BusinessLogicContext.Provider
				value={{
					states: this.state,
					reducers: {
						userlogout: () => {
							this.logout();
						},
					},
				}}
			>
				{this.props.children}
			</BusinessLogicContext.Provider>
		);
	}
}

export default BusinessLogicProvider;
