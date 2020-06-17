import React, { useState } from "react";
import TopBar from "./components/TopBar/";
import Transfer from "./components/Transfer/";
import "./App.scss";
import Schedule from "./components/Calendar/";
import { appointments } from "./components/Calendar/appointments";
import RightBar from "./components/RightBar";
import { lectures } from "./lectures";
function App() {
	const [isOpenTransfer, setOpenTransfer] = useState(false);
	const [text, setText] = useState("");

	return (
		<div className="App">
			<TopBar
				textChangeHandler={(e) => {
					setText(e.target.value);
				}}
				handleTransfer={(e) => {
					setOpenTransfer(!isOpenTransfer);
				}}
				onLangChange={(e) => {
					console.log(e);
				}}
			/>
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

			<h1>{text}</h1>
		</div>
	);
}

export default App;
