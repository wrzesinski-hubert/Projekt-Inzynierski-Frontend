import React, { useState } from "react";
import TopBar from "./components/TopBar/";
import Transfer from "./components/Transfer/";
import "./App.scss";
import Schedule from "./components/Calendar/";
import { appointments } from "./components/Calendar/appointments";
import RightBar from "./components/RightBar";
import { lectures } from "./lectures";

import BusinessLogicContext from "./businesslogic/BusinessLogicContext";
import { BuisnessProvided } from "./businesslogic/BusinessLogicProvider";

function App() {
	const [isOpenTransfer, setOpenTransfer] = useState(false);


	return (
		<div className="App">
			<BusinessLogicContext.Consumer>
				{(context) => (
					<TopBar
						handleTransfer={(e) => {
							setOpenTransfer(!isOpenTransfer);
						}}
						onLangChange={(e) => {
							console.log(e);
						}}
						handleLogout={() => {
							(context as BuisnessProvided).reducers.userlogout();
						}}
					/>
				)}
			</BusinessLogicContext.Consumer>
			<Transfer
				isOpen={isOpenTransfer}
				handleClose={(e) => {
					setOpenTransfer(!isOpenTransfer);
				}}
			/>
			<div className="wraper">
				<div className="wraper__calendar">
					<Schedule data={appointments} />
				</div>
				<div className="wraper__rightbar">
					<RightBar
						lectures={lectures}
						onGroupMouseOver={(id, name) => {
							console.log("XD");
						}}
						onGroupClick={(id, name) => {}}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
