import 'hammerjs';
import data from './data.json';
import { Chart, ChartTitle, ChartTooltip, ChartXAxis, ChartXAxisItem, ChartYAxis, ChartYAxisItem, ChartSeries, ChartSeriesItem } from '@progress/kendo-react-charts';

const mapSeries = (series: any, idx: any,) => <ChartSeriesItem key={idx} type="scatterLine" data={series.stats} name={series.current} xField="time" yField="charge" />;

 const  MiningScatter = () =>      
<Chart>
    <ChartTitle text="Charge current vs. charge time" />
    <ChartTooltip format="{1}% in {0} minutes" />
    <ChartSeries>
      {data.map(mapSeries)}
    </ChartSeries>
    <ChartXAxis>
      <ChartXAxisItem title={{
      text: 'Time'
    }} max={90} labels={{
      format: '{0}m'
    }} />
    </ChartXAxis>
    <ChartYAxis>
      <ChartYAxisItem title={{
      text: 'Charge'
    }} max={100} labels={{
      format: '{0}m'
    }} />
    </ChartYAxis>
  </Chart>
  
  ;

  export default MiningScatter;