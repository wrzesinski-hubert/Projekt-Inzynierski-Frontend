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
    return (
      <div className="shop-cart">
        <div className="text">
          Hubert Wrzesiński<br></br>
          Semestr zimowy 2020/2021
        </div>
        <Class name="E-gospodarka - narzędzia i bezpieczeństwo" />
        <Class name="Algorytmy grafowe" />
        <Class name="Podstawy programowania deklaratywnego" />
        <Class name="Statystyka" />
        <Class name="Wstęp do rachunku prawdopodobieństwa" />
        <Class name="Technologie internetowe" />
      </div>
    );
  }
}
