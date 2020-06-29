import React, { useState, useEffect } from "react";
import { User } from "./models/user";
import { redirectToCASLoginService, redirectToCASLogoutService } from "./utilites";

export interface IBusinessLogicContext {
	user: User | null;
	actions: {
		logout: () => void;
	};
}

export const BusinessLogicContext = React.createContext<IBusinessLogicContext>({
	user: null,
	actions: { logout: () => {} },
});

interface Props {}

export const BusinessLogicProvider: React.FC<Props> = (props) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		login();
	}, []);

	const login = () => {
		const urlParams = new URLSearchParams(window.location.search);
		const ticket = urlParams.get("ticket");

		if (!ticket) {
			redirectToCASLoginService();
		}
		if (ticket) {
			setUser({ ticket });
		}
	};

	const logout = () => {
		redirectToCASLogoutService();
	};

	return (
		<BusinessLogicContext.Provider
			value={{
				user: user,
				actions: {
					logout: logout,
				},
			}}
		>
			{props.children}
		</BusinessLogicContext.Provider>
	);
};
