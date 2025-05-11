function abbreviateName(name) {
  // Split on whitespace, filter out empty words, and join the capitalized initials
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

export function parseChartData(fileContent) {
  // Ensure file content has a table
  if (!fileContent.includes("<table")) {
    console.warn("No table found in file content");
    return [];
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(fileContent, "text/html");

  console.log("Document parsed, root element:", doc.documentElement.nodeName);
  console.log("Document body snippet:", doc.body.innerHTML.substring(0, 500));

  // Use absolute XPath since the document has an <html> root element
  const xpath = "/html/body/form/div[4]/div[2]/div[1]/div[4]/table";
  let tableNode = doc.evaluate(
    xpath,
    doc,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;

  if (!tableNode) {
    console.warn("Table not found at the specified XPath:", xpath);
    console.warn("Attempting fallback to document.querySelector('table')...");
    tableNode = doc.querySelector("table");
    if (!tableNode) {
      console.warn("Fallback: No table element found.");
      return [];
    }
  } else {
    console.log("Found table using XPath:", xpath);
  }

  const rows = tableNode.querySelectorAll("tr");
  const seriesByFund = {};

  rows.forEach((row, index) => {
    const cells = row.querySelectorAll("td");
    if (cells.length < 12) {
      console.log(`Skipping row ${index}: fewer than 12 cells.`);
      return;
    }

    const fundName = cells[0].textContent.trim();
    if (!fundName) {
      console.log(`Skipping row ${index}: empty fund name.`);
      return;
    }

    // Abbreviate the fund name so the id is shorter
    const shortFundName = abbreviateName(fundName);

    const nav = parseFloat(cells[5].textContent.replace("*", "").trim()) || 0;
    const mtd = parseFloat(cells[6].textContent.replace("%", "").trim()) || 0;
    const fytd = parseFloat(cells[7].textContent.replace("%", "").trim()) || 0;
    const cytd = parseFloat(cells[8].textContent.replace("%", "").trim()) || 0;
    const fy24 = parseFloat(cells[9].textContent.replace("%", "").trim()) || 0;
    const fy23 = parseFloat(cells[10].textContent.replace("%", "").trim()) || 0;
    const sinceInception =
      parseFloat(cells[11].textContent.replace("%", "").trim()) || 0;

    seriesByFund[shortFundName] = [
      { x: "NAV", y: nav },
      { x: "MTD", y: mtd },
      { x: "FYTD", y: fytd },
      { x: "CYTD", y: cytd },
      { x: "FY24", y: fy24 },
      { x: "FY23", y: fy23 },
      { x: "Since Inception", y: sinceInception },
    ];

    console.log(
      `Row ${index} - ${fundName} (${shortFundName}):`,
      seriesByFund[shortFundName]
    );
  });

  // Filter out series that are entirely zeros
  const seriesArray = Object.keys(seriesByFund)
    .filter((key) => seriesByFund[key].some((point) => point.y !== 0))
    .map((key) => ({
      id: key,
      data: seriesByFund[key],
    }));

  console.log("Final chart data for line chart:", seriesArray);
  return seriesArray;
}
