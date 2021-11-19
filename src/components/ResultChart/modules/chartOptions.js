  // init options for the graph
  const options = {
    plugins: {
      autocolors: false,
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            xMin: 10,
            xMax: 10,
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1,
            label: {
              content: 'average',
              enabled: false,
              rotation: 'auto',
              font: { style: 'italic' }
            }
          },
          line2: {
            type: 'line',
            xMin: 0,
            xMax: 0,
            borderColor: 'rgb(54, 99, 132)',
            borderWidth: 1,
            label: {
              content: 'average',
              enabled: false,
              rotation: 'auto',
              font: { style: 'italic' }
            }
          }
        }
      }
    }
  };

  export default options;