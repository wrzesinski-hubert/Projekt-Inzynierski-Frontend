import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import BuisnessLogicProvider from "./businesslogic/BusinessLogicProvider";

ReactDOM.render(
	<React.Fragment>
		<BuisnessLogicProvider>
			<App />
		</BuisnessLogicProvider>
	</React.Fragment>,
	document.getElementById("root")
);
