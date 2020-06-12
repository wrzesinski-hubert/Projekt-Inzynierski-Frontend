import React from "react";
import "./index.scss";
import Class from "../Class";

interface RightBarProps {}

interface RightBarState {}

export default class RightBar extends React.Component<
  RightBarProps,
  RightBarState
> {
  render() {
    var data = [
      {
        classname: "E-gospodarka - narzędzia i bezpieczeństwo",
        classgroups: [
          {
            group_id: "1CB",
            day: "Pn",
            time: "10:00",
            lecturer: "dr inż. Michał Ren",
            room: "A2-01",
          },
          {
            group_id: "1CC",
            day: "Wt",
            time: "12:00",
            lecturer: "dr inż. Michał Ren",
            room: "A3-01",
          },
        ],
      },
      {
        classname: "Statystyka",
        classgroups: [
          {
            group_id: "1CB",
            day: "Pn",
            time: "10:00",
            lecturer: "dr inż. Michał Ren",
            room: "A2-01",
          },
          {
            group_id: "1CC",
            day: "Wt",
            time: "12:00",
            lecturer: "dr inż. Michał Ren",
            room: "A3-01",
          },
        ],
      },
    ];

    return (
      <div className="right-bar">
        <div className="right-bar__text">
          Hubert Wrzesiński<br></br>
          Semestr zimowy 2020/2021
        </div>
        <Class data={data[0]} />
        <Class data={data[1]} />
        <Class data={data[0]} />
        <Class data={data[1]} />
        <Class data={data[0]} />
        <Class data={data[1]} />
      </div>
    );
  }
}
