import Plot from "react-plotly.js";

function LineChart({ data, height = 600 }) {
  // Create traces for each series. The x values are categorical
  const traces = data.map((series) => ({
    x: series.data.map((point) => point.x),
    y: series.data.map((point) => point.y),
    type: "scatter",
    mode: "lines+markers",
    name: series.id,
  }));

  return (
    <Plot
      data={traces}
      layout={{
        autosize: true,
        dragmode: "pan", // Enable pan default
        title: "Interactive Zoomable Chart",
        xaxis: { title: "Return Type", type: "category" },
        yaxis: { title: "Value" },
        margin: { t: 50, l: 60, r: 30, b: 50 },
      }}
      style={{ width: "100%", height }}
      useResizeHandler={true}
      config={{
        responsive: true,
        scrollZoom: true,
      }}
    />
  );
}

export default LineChart;
