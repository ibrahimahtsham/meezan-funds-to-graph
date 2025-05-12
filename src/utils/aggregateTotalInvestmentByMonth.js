export function aggregateTotalInvestmentByMonth(data) {
  const totals = {};
  data.forEach((item) => {
    const month = item.month || "Unknown";
    const amount = parseFloat(item.amount) || 0;
    totals[month] = (totals[month] || 0) + amount;
  });
  // Sort months as needed (this assumes the month strings sort correctly)
  const months = Object.keys(totals).sort();
  const series = [
    {
      id: "Total Investment",
      data: months.map((m) => ({
        x: m,
        y: totals[m],
      })),
    },
  ];
  return series;
}
