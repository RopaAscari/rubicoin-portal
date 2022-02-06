import axios from "axios";
import Grid from "@mui/material/Grid/Grid";
import { Box, Typography } from "@mui/material";
import { Row, Col, Container } from "shards-react";
import { Sales } from "@components/Dashboard/Sales";
import UserStats from "@components/UserStats/UserStats";
import MotionHoc from "@components/MotionHOC/MotionHOC";
import ReportsBarChart from "@components/ReportBarChart/ReportBarChart";
import ReportsLineChart from "@components/ReportsLineChart/ReportsLineChart";
import { useEffect } from "react";
import AssetTable from "@components/AssetTable/AssetTable";

type Props = {
  history: any;
};

const data = {
  labels: ["M", "T", "W", "T", "F", "S", "S"],
  datasets: { label: "Sales", data: [50, 20, 10, 22, 50, 10, 40] },
};

const reportsLineChartData = {
  sales: {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: {
      label: "Mobile apps",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  },
  tasks: {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: {
      label: "Desktop apps",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
    },
  },
};

const smallStats = [
  {
    label: "Budget",
    value: "2,390",
    percentage: "4.7%",
    increase: true,
    chartLabels: [null, null, null, null, null, null, null],
    attrs: { md: "6", sm: "6" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "rgba(0, 184, 216, 0.1)",
        borderColor: "rgb(0, 184, 216)",
        data: [1, 2, 1, 3, 5, 4, 7],
      },
    ],
  },
  {
    label: "Mining rate",
    value: "182",
    percentage: "12.4",
    increase: true,
    chartLabels: [null, null, null, null, null, null, null],
    attrs: { md: "6", sm: "6" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "rgba(23,198,113,0.1)",
        borderColor: "rgb(23,198,113)",
        data: [1, 2, 3, 3, 3, 4, 4],
      },
    ],
  },
  {
    label: "Trading",
    value: "8,147",
    percentage: "3.8%",
    increase: false,
    decrease: true,
    chartLabels: [null, null, null, null, null, null, null],
    attrs: { md: "4", sm: "6" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "rgba(255,180,0,0.1)",
        borderColor: "rgb(255,180,0)",
        data: [2, 3, 3, 3, 4, 3, 3],
      },
    ],
  },
  {
    label: "Profit",
    value: "29",
    percentage: "2.71%",
    increase: false,
    decrease: true,
    chartLabels: [null, null, null, null, null, null, null],
    attrs: { md: "4", sm: "6" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "rgba(255,65,105,0.1)",
        borderColor: "rgb(255,65,105)",
        data: [1, 7, 1, 3, 1, 4, 8],
      },
    ],
  },
  {
    label: "Subscribers",
    value: "17,281",
    percentage: "2.4%",
    increase: false,
    decrease: true,
    chartLabels: [null, null, null, null, null, null, null],
    attrs: { md: "4", sm: "6" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "rgb(0,123,255,0.1)",
        borderColor: "rgb(0,123,255)",
        data: [3, 2, 3, 2, 4, 5, 4],
      },
    ],
  },
];

const { sales, tasks } = reportsLineChartData;

const DashboardPage = (props: Props) => {
  return (
    <div>
      <Container fluid className="main-content-container px-4">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h5" sx={{ color: "text.primary" }}>
            Hi, Welcome back
          </Typography>
        </Box>
        <Row>
          {smallStats.map((stats, idx) => (
            <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
              <UserStats
                id={`small-stats-${idx}`}
                variation="1"
                chartData={stats.datasets}
                chartLabels={stats.chartLabels}
                label={stats.label}
                value={stats.value}
                percentage={stats.percentage}
                increase={stats.increase}
                decrease={stats.decrease}
              />
            </Col>
          ))}
        </Row>
      </Container>

      <br></br>

      <Box mt={4.5} sx={{ paddingLeft: 3, paddingRight: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Box mb={3}>
              <ReportsBarChart
                color="info"
                title="website views"
                description="Last Campaign Performance"
                date="campaign sent 2 days ago"
                chart={data}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Box mb={3}>
              <ReportsLineChart
                color="success"
                title="Daily Sales"
                description={
                  <>
                    (<strong>+15%</strong>) increase in today sales.
                  </>
                }
                date="updated 4 min ago"
                chart={sales}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Box mb={3}>
              <ReportsLineChart
                color="dark"
                title="Trading"
                description="Last Campaign Performance"
                date="just updated"
                chart={tasks}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <br></br>
      <AssetTable />
      <br />
      <br></br>

      <Box sx={{ paddingLeft: 3, paddingRight: 3 }}>
        <Sales />
      </Box>
    </div>
  );
};

const DashboardHoc = MotionHoc(DashboardPage);

export default DashboardHoc;
