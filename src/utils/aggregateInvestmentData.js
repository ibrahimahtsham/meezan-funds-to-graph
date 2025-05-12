export const aggregateInvestmentData = (data) => {
  // data is an array of investment objects with { month, amount }
  const totals = {};
  data.forEach((item) => {
    const month = item.month || "Unknown";
    const amount = parseFloat(item.amount) || 0;
    totals[month] = (totals[month] || 0) + amount;
  });
  // Convert to a format similar to your LineChart series
  return [
    {
      id: "Investments Trend",
      data: Object.keys(totals).map((month) => ({
        x: month,
        y: totals[month],
      })),
    },
  ];
};
