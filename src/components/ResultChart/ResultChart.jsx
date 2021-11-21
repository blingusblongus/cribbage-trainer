import { Chart } from "chart.js";
import { Scatter } from "react-chartjs-2";
import Annotation from "chartjs-plugin-annotation";
import { useSelector } from "react-redux";

import chartOptions from './modules/chartOptions';
import setData from './modules/dataOptions';

// Use annotation plugin
Chart.register(Annotation);

function ResultChart(props) {
    const results = useSelector(store => store.results);
    const data = setData(results);
    const options = chartOptions;

    return (
        <Scatter data={data} options={options} />
    )
}

export default ResultChart;