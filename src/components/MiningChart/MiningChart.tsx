
import * as React from 'react';
import Box from '@mui/material/Box';
import { sales as data } from './data';

import { ValueScale, Animation } from '@devexpress/dx-react-chart';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  SplineSeries,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Paper } from '@mui/material';


type State = {
 data: any;
}

type Props = {

}

export default class MiningChart extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      data: data[2017],
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <Box
      component="form"
      noValidate
    
      sx={{}}
    >
      <Paper>
        <Chart
          height={400} 
          data={chartData}
        >
          <ValueScale name="sale" />
          <ValueScale name="total" />

          <ArgumentAxis />
          <ValueAxis scaleName="sale" showGrid={false} showLine showTicks />
          <ValueAxis scaleName="total" position="right" showGrid={false} showLine showTicks />

          <BarSeries
            name="Units Sold"
            valueField="sale"
            argumentField="month"
            scaleName="sale"
          />

          <SplineSeries
            name="Total Transactions"
            valueField="total"
            argumentField="month"
            scaleName="total"
          />
          <Animation />
          <Legend />
        </Chart>
      </Paper>
    </Box>
    );
  }
}
