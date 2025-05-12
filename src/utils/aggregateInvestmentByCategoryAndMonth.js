export function aggregateInvestmentByCategoryAndMonth(data) {
  // Group data by category and then by month.
  const groups = {};
  data.forEach((item) => {
    const { category, month, amount } = item;
    if (!groups[category]) {
      groups[category] = {};
    }
    // Use month as a key (you might want to sort/format these properly)
    groups[category][month] = (groups[category][month] || 0) + amount;
  });

  // Create one series per category.
  const series = Object.keys(groups).map((category) => {
    // Get sorted months – here assuming month contains a sortable value (like "May 2025")
    const months = Object.keys(groups[category]).sort();
    const dataPoints = months.map((m) => ({
      x: m,
      y: groups[category][m],
    }));
    return { id: category, data: dataPoints };
  });

  return series;
}
