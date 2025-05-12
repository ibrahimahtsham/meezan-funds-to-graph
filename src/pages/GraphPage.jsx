import { Box, Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import FileUploader from "../components/FileUploader";
import LineChart from "../components/LineChart";
import { parseChartData } from "../utils/parseData";

function GraphPage() {
  const [fileData, setFileData] = useState(null);
  const [error, setError] = useState(null);

  const handleDataParsed = (data) => {
    console.log("Parsed data:", data);
    if (data?.content) {
      setFileData(data.content);
      setError(null);
    } else {
      setError("No valid content found in the uploaded file.");
      setFileData(null);
    }
  };

  const chartData = fileData ? parseChartData(fileData) : [];

  return (
    <>
      <Typography variant="h4" align="left" sx={{ mb: 2, ml: 0 }}>
        Financial Overview
      </Typography>
      <FileUploader onDataParsed={handleDataParsed} />
      {error && (
        <Typography
          variant="body1"
          color="error"
          align="left"
          sx={{ mt: 1, ml: 0 }}
        >
          {error}
        </Typography>
      )}
      <Box sx={{ mt: 4, width: "100%", px: 0 }}>
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Typography variant="h6" align="left" sx={{ mb: 2 }}>
              NAV Performance
            </Typography>
            {chartData.length ? (
              <LineChart data={chartData} height={600} />
            ) : (
              <Typography variant="body1" align="left">
                Please upload your file to display the chart.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default GraphPage;
