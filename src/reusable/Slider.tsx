import RcSlider from "rc-slider";
import * as React from "react";

import {BaseType} from "./BaseType";

import "rc-slider/assets/index.css"; // tslint:disable-line:no-submodule-imports
import "./Slider.scss";
const Style = require("./Slider.scss");

export interface Props extends BaseType {
    value: number;
    min: number;
    max: number;
    step?: number;
    vertical?: boolean;
    disabled?: boolean;
    lowColor?: string;
    highColor?: string;

    onValue(value: number): void;
}

const Slider = ({lowColor, highColor, onValue, ...props}: Props) => {
    const trackStyle = lowColor !== undefined ? {backgroundColor: Style[lowColor]} : {};
    const railStyle = highColor !== undefined ? {backgroundColor: Style[highColor]} : {};

    return <RcSlider onChange={onValue} {...props} trackStyle={trackStyle} railStyle={railStyle} />;
};

export default Slider;
