// A helper to abbreviate fund names (you might re-use the one from parseData.js)
function abbreviateName(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

/**
 * Calculate aggregated projections for a portfolio.
 *
 * @param {Array} investments - array of investment records. Each record should have at least:
 *   - fund: the full name of the fund (e.g. "Meezan Cash Fund")
 *   - amount: numeric investment amount
 *   - month: investment month (not used in calculation here, but available if needed)
 * @param {Array} performanceSeries - array of performance data series
 *    (each with an id (e.g. "MCF") and a data array containing objects like { x: "NAV", y: 57.3249 }).
 *
 * @returns {Array} A series array with one element:
 *   [ { id: "Projection", data: [ { x: "NAV", y: totalProjection }, ... ] } ]
 */
export function calculateInvestmentProjections(investments, performanceSeries) {
  // Define the order of metrics (you can adjust if needed)
  const metrics = [
    "NAV",
    "MTD",
    "FYTD",
    "CYTD",
    "FY24",
    "FY23",
    "Since Inception",
  ];
  // Initialize an object to accumulate projections by metric.
  const projectionsByMetric = {};
  metrics.forEach((metric) => {
    projectionsByMetric[metric] = 0;
  });

  // Process each investment.
  investments.forEach((inv) => {
    // Get the abbreviated fund name for matching (e.g., "Meezan Cash Fund" -> "MCF")
    const fundAbbrev = abbreviateName(inv.fund);
    // Find the matching performance series.
    const perfSeries = performanceSeries.find(
      (series) => series.id === fundAbbrev
    );
    if (!perfSeries) {
      // If no performance data is found for the fund, skip.
      return;
    }
    // For each metric in the performance series, calculate projected value.
    perfSeries.data.forEach((point) => {
      // Check if this metric is in our predefined list.
      if (metrics.includes(point.x)) {
        // For the purpose of projection, we are using a simple formula:
        // projected final amount = invested amount * (1 + (performance percentage/100))
        // You may wish to adjust this calculation.
        const projection = inv.amount * (1 + point.y / 100);
        // Accumulate the projection.
        projectionsByMetric[point.x] += projection;
      }
    });
  });

  // Convert the aggregated projections into a series array.
  const projectionData = metrics.map((metric) => ({
    x: metric,
    y: projectionsByMetric[metric],
  }));

  return [{ id: "Projection", data: projectionData }];
}
