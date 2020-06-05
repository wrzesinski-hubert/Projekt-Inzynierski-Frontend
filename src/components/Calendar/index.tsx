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
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

interface CalendarProps {}

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

const styles = makeStyles((theme: Theme) =>
  createStyles({
    dayScaleCell:{
      backgroundColor:"red"
    }
  }),
);

const DayScaleCell = (({ formatDate,classes, ...restProps }: any) => (
  <WeekView.DayScaleCell
    {...restProps}
    formatDate={formatDayScaleDate}
    today={false}
    className={"chuj"}
  />
));

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

  render() {
    const { data, currentDate } = this.state;

    return (
      <div className="schedule">
        <div className="calendar">
          <Scheduler
            data={data}
            height={700}
            locale={"PL-PL"}
            firstDayOfWeek={1}
          >
            <ViewState defaultCurrentDate={currentDate} />
            <WeekView
              startDayHour={8}
              endDayHour={20}
              excludedDays={[0, 6]}
              cellDuration={60}
              dayScaleCellComponent={DayScaleCell}
            />
            <Appointments />
          </Scheduler>
        </div>
        <div className="shop-cart">
          Hubert Wrzesiński Semestr zimowy 2020/2021
        </div>
      </div>
    );
  }
}
