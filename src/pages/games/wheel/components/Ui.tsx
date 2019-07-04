import {WHEEL_PAYOUT, WHEEL_RESULT_RANGE} from "@dicether/state-channel";
import * as React from "react";
import {WithNamespaces, withNamespaces} from "react-i18next";

import {MIN_BET_VALUE} from "../../../../config/config";
import {Button, Col, Ether, FormGroup, Input, Label, Modal, Row, Select, ValueInput} from "../../../../reusable";
import HowToPlay from "./HowToPlay";

import WheelGrid from "./WheelGrid";
const Colors = require("./WheelDayColors.scss");

const Style = require("./Ui.scss");

export interface Props extends WithNamespaces {
    segments: number;
    risk: number;
    value: number;
    maxBetValue: number;
    result: {betNum: number; num: number; won: boolean; userProfit: number};
    showResult: boolean;
    showHelp: boolean;
    nightMode: boolean;
    onRiskChange(risk: number): void;
    onSegmentsChange(segments: number): void;
    onToggleHelp(): void;
    onValueChange(value: number): void;
    onPlaceBet(): void;
}

export type State = {
    angle: number;
};

class Ui extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            angle: 0,
        };
    }

    private onClick = () => {
        this.setState({
            angle: Math.random() * 2 * Math.PI,
        });
    }

    // TODO move to wheel/wheel payout???
    private static calcSegmentColors = (segments: number[]) => {
        const colors: string[] = [];

        let curColorIdx = 0;
        const colorLookup: {[key: number]: string} = {};
        for (const segment of segments) {
            if (!(segment in colorLookup)) {
                const color = Colors[`color${curColorIdx % 6}`];
                colorLookup[segment] = color;
                curColorIdx += 1;
            }

            // colors.push(colorLookup[segment]);
        }

        return colorLookup;
        // return colors;
    }

    render() {
        const {
            value,
            segments,
            risk,
            maxBetValue,
            result,
            showResult,
            showHelp,
            nightMode,
            onToggleHelp,
            onValueChange,
            onRiskChange,
            onSegmentsChange,
            onPlaceBet,
            t,
        } = this.props;

        // TODO: move to wheel grid
        const angle = 2 * Math.PI - (result.num * 2 * Math.PI + Math.PI) / WHEEL_RESULT_RANGE;

        const allSegments = WHEEL_PAYOUT[risk][segments];
        const payout = {
            show: showResult,
            value: result.userProfit,
            multiplier: allSegments[Math.floor((result.num * allSegments.length) / WHEEL_RESULT_RANGE)],
        };

        return (
            <div>
                <Row noGutters>
                    <Col className={Style.wheel} lg={{size: 7, order: 2}} xl={{size: 8, order: 2}}>
                        <WheelGrid nightMode={nightMode} segments={allSegments} angle={angle} payout={payout} />
                    </Col>
                    <Col lg={5} xl={4}>
                        <div className={Style.menu}>
                            <FormGroup className="games__form-group">
                                <Label>{t("betAmountEth")}</Label>
                                <ValueInput
                                    value={value}
                                    min={MIN_BET_VALUE}
                                    step={MIN_BET_VALUE}
                                    max={maxBetValue}
                                    onChange={onValueChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>{t("risk")}</Label>
                                <Select value={risk.toString()} onValue={val => onRiskChange(Number.parseInt(val, 10))}>
                                    <option value={1}>{t("lowRisk")}</option>
                                    <option value={2}>{t("mediumRisk")}</option>
                                    <option value={3}>{t("highRisk")}</option>
                                </Select>
                            </FormGroup>
                            <FormGroup>
                                <Label>{t("segments")}</Label>
                                <Select
                                    value={segments.toString()}
                                    onValue={val => onSegmentsChange(Number.parseInt(val, 10))}
                                >
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                </Select>
                            </FormGroup>
                            <Button className="betButton" block color="success" onClick={onPlaceBet}>
                                {t("bet")}
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Modal isOpen={showHelp} toggle={onToggleHelp}>
                    <HowToPlay />
                </Modal>
            </div>
        );
    }
}

export default withNamespaces()(Ui);