import options from "./chartOptions";

function setData(results) {
    // init dataSets for the graph
    const data = {
        labels: [],
        datasets: [{
            label: 'Chosen Hand',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [],
            showLine: true
        },
        {
            label: 'Optimal Hand',
            backgroundColor: 'rgb(14, 99, 132)',
            borderColor: 'rgb(89, 99, 132)',
            data: [],
            showLine: true
        }]
    };

    // set data and options from response
    if (results) {
        for (let i = 0; i < results.length; i++) {
            let handData = results[i];
            for (let score in handData.distribution) {
                data.datasets[i].data.push({
                    x: score,
                    y: handData.distribution[score].count
                });

                const line = options.plugins.annotation.annotations['line' + (i + 1)];
                line.xMax = handData.stats.avg;
                line.xMin = handData.stats.avg;
                line.enabled = true;
            }
        }
    }

    return data;
}

export default setData;