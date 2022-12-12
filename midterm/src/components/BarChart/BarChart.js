import Plot from 'react-plotly.js';

const BarChart = () => {
  return (
    <>
      <Plot
        data={[
          {
            type: 'bar',
            // y ở index nào tương ứng ở x sẽ có giá trị bao nhiêu đó
            y: [20, 10, 20, 30, 40],
            x: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
            data: [],
          },
        ]}
        layout={{ width: 1000, height: 400 }}
      ></Plot>
    </>
  );
};

export default BarChart;
