import * as React from "react";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { AppointmentModel } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import moment from "moment";
import "moment/locale/pl";
import { appointments } from "./appointments";
import "./index.scss";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

interface CalendarProps {
  
}

interface CalendarState {
  data: Array<AppointmentModel>;
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
    },
    timeTableCell: {
      //borderRadius:2,
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

export default class Calendar extends React.PureComponent<
  CalendarProps,
  CalendarState
> {
  constructor(props: CalendarProps) {
    super(props);
    
    this.state = {
      data: appointments,
      currentDate: new Date("2020-06-01"),
    };
  }

  expand(e: React.MouseEvent) {
    //this.classList.add("chujec");
    console.log("chujec");
  }
  render() {
    const { data, currentDate } = this.state;

    return (
      <div className="schedule">
        <div className="calendar">
          <Scheduler
            data={data}
            height={850}
            locale={"PL-PL"}
            firstDayOfWeek={1}
          >
            <ViewState defaultCurrentDate={currentDate} />
            <WeekView
              startDayHour={8}
              endDayHour={20}
              excludedDays={[0, 6]}
              cellDuration={45}
              dayScaleCellComponent={DayScaleCell}
              timeTableLayoutComponent={TimeTableLayout}
              timeTableCellComponent={TimeTableCell}
            />
            <Appointments />
          </Scheduler>
        </div>
        <div className="shop-cart">
          <div className="text">
            Hubert Wrzesiński<br></br>
            Semestr zimowy 2020/2021
          </div>
          <Paper className="paper" onClick={this.expand}>Chuj</Paper>
          <Paper className="paper">Cipa</Paper>
          <Paper className="paper">Pizda</Paper>
          <Paper className="paper">Szmata</Paper>
          <Paper className="paper">Jebać</Paper>
          <Paper className="paper">Chuj</Paper>
          <Paper className="paper">Cipa</Paper>
          <Paper className="paper">Pizda</Paper>
          <Paper className="paper">Szmata</Paper>
          <Paper className="paper">Jebać</Paper>
        </div>
      </div>
    );
  }
}
