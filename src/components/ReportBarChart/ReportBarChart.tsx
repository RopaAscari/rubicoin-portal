import MDBox from "../MDBox";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import MDTypography from "../MDTypography";
import Divider from "@mui/material/Divider";
import { Color } from "@constants/constants";

type Props = {
  color: Color;
  title: string;
  description: any;
  date: string;
  chart: Array<any> | any;
};

function ReportsBarChart({ color, title, description, date, chart }: Props) {
  const { data, options } = configs(chart.labels || [], chart.datasets || {});

  function configs(labels: any, datasets: any) {
    return {
      data: {
        labels,
        datasets: [
          {
            label: datasets.label,
            tension: 0.4,
            borderWidth: 0,
            borderRadius: 4,
            borderSkipped: false,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            data: datasets.data,
            maxBarThickness: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        scales: {
          y: {
            grid: {
              drawBorder: false,
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              borderDash: [5, 5],
              color: "rgba(255, 255, 255, .2)",
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 500,
              beginAtZero: true,
              padding: 10,
              font: {
                size: 14,
                weight: 300,
                family: "Roboto",
                style: "normal",
                lineHeight: 2,
              },
              color: "#fff",
            },
          },
          x: {
            grid: {
              drawBorder: false,
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              borderDash: [5, 5],
              color: "rgba(255, 255, 255, .2)",
            },
            ticks: {
              display: true,
              color: "#f8f9fa",
              padding: 10,
              font: {
                size: 14,
                weight: 300,
                family: "Roboto",
                style: "normal",
                lineHeight: 2,
              },
            },
          },
        },
      },
    };
  }

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox padding="1rem">
        {useMemo(
          () => (
            <MDBox
              variant="gradient"
              bgColor={color}
              borderRadius="lg"
              coloredShadow={color}
              py={2}
              pr={0.5}
              mt={-5}
              height="12.5rem"
            >
              <Bar data={data as any} options={options as any} />
            </MDBox>
          ),
          [chart, color]
        )}
        <MDBox pt={3} pb={1} px={1}>
          <MDTypography variant="h6" textTransform="capitalize">
            {title}
          </MDTypography>
          <MDTypography
            component="div"
            variant="button"
            color="text"
            fontWeight="light"
          >
            {description}
          </MDTypography>
          <Divider />
          <MDBox display="flex" alignItems="center">
            <MDTypography
              variant="button"
              color="text"
              lineHeight={1}
              sx={{ mt: 0.15, mr: 0.5 }}
            >
              <Icon>schedule</Icon>
            </MDTypography>
            <MDTypography variant="button" color="text" fontWeight="light">
              {date}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

ReportsBarChart.defaultProps = {
  color: "dark",
  description: "",
};

export default ReportsBarChart;
