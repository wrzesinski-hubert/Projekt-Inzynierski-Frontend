import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import BuisnessLogicProvider from "./businesslogic/BusinessLogicProvider";
import { LecturesProvider } from "./businesslogic/LecturesProvider";

ReactDOM.render(
	<>
	<LecturesProvider>
		<BuisnessLogicProvider>
			<App />
		</BuisnessLogicProvider>
	</LecturesProvider>
	</>,
	document.getElementById("root")
);
