import React from "react";
import shortid from "shortid";
import classNames from "classnames";
import { Card } from "@mui/material";
import { CardBody } from "shards-react";
import Chart from "@components/DashboardChart/index";

const defaultProps = {
  value: 0,
  increase: true,
  percentage: 0,
  chartData: [],
  chartLabels: [],
  label: "Label",
  chartOptions: Object.create(null),
  chartConfig: Object.create(null),
};

type Props = {
  id: any;
  label: any;
  value: any;
  increase: any;
  decrease: any;
  variation: any;
  percentage: any;
  chartData: any;
  chartLabels: any;
  chartConfig: any;
  chartOptions: any;
};

type State = {};

let ChartInstance: any = Chart;

class UserStats extends React.Component<Props, State> {
  canvasRef: React.RefObject<unknown> = React.createRef();

  constructor(props: Props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const chartOptions = {
      ...{
        maintainAspectRatio: true,
        responsive: true,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
          custom: false,
        },
        elements: {
          point: {
            radius: 0,
          },
          line: {
            tension: 0.33,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: false,
              ticks: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              gridLines: false,
              scaleLabel: false,
              ticks: {
                display: false,
                isplay: false,
                // Avoid getting the graph line cut of at the top of the canvas.
                // Chart.js bug link: https://github.com/chartjs/Chart.js/issues/4790
                suggestedMax: Math.max(...this.props.chartData[0].data) + 1,
              },
            },
          ],
        },
      },
      ...this.props.chartOptions,
    };

    const chartConfig = {
      ...{
        type: "line",
        data: {
          ...{
            labels: this.props.chartLabels,
          },
          ...{
            datasets: this.props.chartData,
          },
        },
        options: chartOptions,
      },
      ...this.props.chartConfig,
    };

    new ChartInstance(this.canvasRef.current, chartConfig) as any;
  }

  static defaultProps = defaultProps;

  render() {
    const { variation, label, value, percentage, increase } = this.props;

    const cardClasses = classNames(
      "stats-small",
      variation && `stats-small--${variation}`
    );

    const cardBodyClasses = classNames(
      variation === "1" ? "p-0 d-flex" : "px-0 pb-0"
    );

    const innerWrapperClasses = classNames(
      "d-flex",
      variation === "1" ? "flex-column m-auto" : "px-3"
    );

    const dataFieldClasses = classNames(
      "stats-small__data",
      variation === "1" && "text-center"
    );

    const labelClasses = classNames(
      "stats-small__label",
      "text-uppercase",
      variation !== "1" && "mb-1"
    );

    const valueClasses = classNames(
      "stats-small__value",
      "count",
      variation === "1" ? "my-3" : "m-0"
    );

    const innerDataFieldClasses = classNames(
      "stats-small__data",
      variation !== "1" && "text-right align-items-center"
    );

    const percentageClasses = classNames(
      "stats-small__percentage",
      `stats-small__percentage--${increase ? "increase" : "decrease"}`
    );

    const canvasHeight = variation === "1" ? 120 : 60;

    return (
      <Card className={cardClasses}>
        <CardBody className={cardBodyClasses}>
          <div className={innerWrapperClasses}>
            <div className={dataFieldClasses}>
              <span className={labelClasses}>{label}</span>
              <h6 className={valueClasses}>{value}</h6>
            </div>
            <div className={innerDataFieldClasses}>
              <span className={percentageClasses}>{percentage}</span>
            </div>
          </div>
          <canvas
            height={canvasHeight}
            ref={this.canvasRef as any}
            className={`stats-small-${shortid()}`}
          />
        </CardBody>
      </Card>
    );
  }
}

export default UserStats;
