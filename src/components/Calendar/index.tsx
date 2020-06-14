import * as React from "react";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { AppointmentModel } from "@devexpress/dx-react-scheduler";
import { Scheduler, WeekView, Appointments, AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import moment from "moment";
import "moment/locale/pl";
import "./index.scss";
import { makeStyles, createStyles } from "@material-ui/core/styles";

interface CalendarProps {
	data: Array<AppointmentModel>;
}

interface CalendarState {
	currentDate: Date;
}

const formatDayScaleDate = (date: moment.MomentInput, nextOptions: Intl.DateTimeFormatOptions): string => {
	const momentDate = moment(date).locale("pl");
	return momentDate.format(nextOptions.weekday ? "dddd" : " ").toUpperCase();
};

const useStyles = makeStyles(() =>
	createStyles({
		dayScaleCell: {
			paddingTop: 10,
			paddingBottom: 10,
		},
		timeTableLayout: {
			border: "1px solid rgba(224, 224, 224, 1);",
			borderCollapse: "separate",
		},
		appointmentLayer: {
			borderRadius: 15,
			marginLeft: 5,
			textAlign: "center",
		},
	})
);

const DayScaleCell = ({ formatDate, ...restProps }: WeekView.DayScaleCellProps) => {
	const classes = useStyles();
	return (
		<WeekView.DayScaleCell {...restProps} formatDate={formatDayScaleDate} today={false} className={classes.dayScaleCell} />
	);
};

const TimeTableLayout = ({ ...restProps }: WeekView.TimeTableLayoutProps) => {
	const classes = useStyles();
	return <WeekView.TimeTableLayout {...restProps} className={classes.timeTableLayout} />;
};

const Appointment = ({ ...restProps }: Appointments.AppointmentProps) => {
	const classes = useStyles();
	return <Appointments.Appointment {...restProps} className={classes.appointmentLayer} />;
};

export default class Calendar extends React.PureComponent<CalendarProps, CalendarState> {
	constructor(props: CalendarProps) {
		super(props);

		this.state = {
			currentDate: new Date("2020-06-01"),
		};
	}

	render() {
		const { data } = this.props;
		const { currentDate } = this.state;

		return (
			<Scheduler data={data} locale={"PL-PL"} firstDayOfWeek={1}>
				<ViewState defaultCurrentDate={currentDate} />
				<WeekView
					startDayHour={8}
					endDayHour={20}
					excludedDays={[0, 6]}
					cellDuration={60}
					dayScaleCellComponent={DayScaleCell}
					timeTableLayoutComponent={TimeTableLayout}
				/>
				<Appointments appointmentComponent={Appointment} />
				<AppointmentTooltip />
			</Scheduler>
		);
	}
}
