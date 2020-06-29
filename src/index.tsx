import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import BuisnessLogicProvider from "./businesslogic/BusinessLogicProvider";

ReactDOM.render(
	<>
		<BuisnessLogicProvider>
			<App />
		</BuisnessLogicProvider>
	</>,
	document.getElementById("root")
);
