import * as React from "react";
import { ViewState, IntegratedEditing, EditingState } from "@devexpress/dx-react-scheduler";
import { AppointmentModel } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";
import moment from "moment";
import "moment/locale/pl";
import "./index.scss";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

interface CalendarProps {
  data: Array<AppointmentModel>;
}

interface CalendarState {
  currentDate: Date;
}

const formatDayScaleDate = (
  date: moment.MomentInput,
  options: { weekday: any }
) => {
  const momentDate = moment(date).locale("pl");
  const { weekday } = options;
  return momentDate.format(weekday ? "dddd" : " ").toUpperCase();
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dayScaleCell: {
      paddingTop: 10,
      paddingBottom: 10,
    },
    timeTableLayout: {
      border: "1px solid rgba(224, 224, 224, 1);",
      borderCollapse: "separate",
    },
    timeTableCell: {
      //borderRadius: 15,
    },
    appointmentLayer: {
      borderRadius: 15,
      marginLeft: 5,
      textAlign: "center",
    },
  })
);

//don't know how to set proper type of function arguments
const DayScaleCell = ({ formatDate, ...restProps }: any) => {
  const classes = useStyles();
  return (
    <WeekView.DayScaleCell
      {...restProps}
      formatDate={formatDayScaleDate}
      today={false}
      className={classes.dayScaleCell}
    />
  );
};

const TimeTableCell = ({ ...restProps }: any) => {
  const classes = useStyles();
  return (
    <WeekView.TimeTableCell {...restProps} className={classes.timeTableCell} />
  );
};

const TimeTableLayout = ({ ...restProps }: any) => {
  const classes = useStyles();
  return (
    <WeekView.TimeTableLayout
      {...restProps}
      className={classes.timeTableLayout}
    />
  );
};

const Appointment = ({ ...restProps }: any) => {
  const classes = useStyles();
  return (
    <Appointments.Appointment
      {...restProps}
      className={classes.appointmentLayer}
    />
  );
};

export default class Calendar extends React.PureComponent<
  CalendarProps,
  CalendarState
> {

  constructor(props: CalendarProps) {
    super(props);

    this.state = {
      currentDate: new Date("2020-06-01"),
    };
  }

  commitChanges() {

  }

  render() {
    const { data } = this.props;
    const { currentDate } = this.state;

    return (
      <Scheduler data={data} locale={"PL-PL"} firstDayOfWeek={1}>
        <ViewState defaultCurrentDate={currentDate} />
        <EditingState
          onCommitChanges={this.commitChanges}         
        />
        <WeekView
          startDayHour={8}
          endDayHour={20}
          excludedDays={[0, 6]}
          cellDuration={60}
          dayScaleCellComponent={DayScaleCell}
          timeTableLayoutComponent={TimeTableLayout}
          timeTableCellComponent={TimeTableCell}
        />
        <IntegratedEditing/>
        <Appointments appointmentComponent={Appointment} />
        <AppointmentTooltip />
        <AppointmentForm/>
      </Scheduler>
    );
  }
}
