import Plot from 'react-plotly.js';

const BarChart = ({ options, answers }) => {
  return (
    <>
      <Plot
        data={[
          {
            type: 'bar',
            // y ở index nào tương ứng ở x sẽ có giá trị bao nhiêu đó
            y: answers,
            x: options.map((value, index) => {
              return `Answer ${index + 1}: ${value}`;
            }),
            data: [],
          },
        ]}
        layout={{ width: 1000, height: 400 }}
      ></Plot>
    </>
  );
};

export default BarChart;
