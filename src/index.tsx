import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BusinessLogicProvider } from "./businesslogic/BusinessLogicProvider";

ReactDOM.render(
	<>
		<BusinessLogicProvider>
			<App />
		</BusinessLogicProvider>
	</>,
	document.getElementById("root")
);
