import React, { useState } from "react";
import TopBar from "./components/TopBar/";
import Transfer from "./components/Transfer/";
import "./App.scss";
import Calendar from "./components/Calendar";
import { appointments } from "./components/Calendar/appointments";
import RightBar from "./components/RightBar";
function App() {
	const [isOpenTransfer, setOpenTransfer] = useState(false);
	const [text, setText] = useState("");

	return (
		<div className="App">
			<TopBar
				textChangeHandler={(e) => {
					setText(e.target.value);
				}}
				handleTransfer={() => {
					setOpenTransfer(!isOpenTransfer);
				}}
				onLangChange={() => {
					console.log("Language has been changed");
				}}
			/>
			<Transfer
				isOpen={isOpenTransfer}
				handleClose={() => {
					setOpenTransfer(!isOpenTransfer);
				}}
			/>
			<div className="wraper">
				<div className="wraper__calendar">
					<Calendar data={appointments} />
				</div>
				<div className="wraper__rightbar">
					<RightBar />
				</div>
			</div>
			<h1>{text}</h1>
		</div>
	);
}

export default App;
