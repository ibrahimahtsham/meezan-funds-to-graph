import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddInvestmentButton from "../components/AddInvestmentButton";
import DataTable from "../components/DataTable";
import FileUploader from "../components/FileUploader";
import LineChart from "../components/LineChart";
import { aggregateInvestmentByCategoryAndMonth } from "../utils/aggregateInvestmentByCategoryAndMonth";
import { aggregateTotalInvestmentByMonth } from "../utils/aggregateTotalInvestmentByMonth";
import { calculateInvestmentProjections } from "../utils/calculateProjections";
import { addInvestment, fetchInvestments } from "../utils/investmentService";
import { parseChartData } from "../utils/parseData";

function InvestmentsTracker() {
  const [investmentData, setInvestmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  // State for projection file content
  const [fileContent, setFileContent] = useState(null);
  // Toggle file uploader display
  const [showUploader, setShowUploader] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchInvestments();
      setInvestmentData(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleAddDefault = async (defaults) => {
    for (const inv of defaults) {
      const added = await addInvestment(inv);
      setInvestmentData((prev) => [...prev, added]);
    }
  };

  const handleAddManual = async (investment) => {
    const added = await addInvestment(investment);
    setInvestmentData((prev) => [...prev, added]);
  };

  // Aggregated current investments:
  const categoryChartData =
    aggregateInvestmentByCategoryAndMonth(investmentData);
  const totalChartData = aggregateTotalInvestmentByMonth(investmentData);
  // Parse performance data from file:
  const performanceSeries = fileContent ? parseChartData(fileContent) : [];
  // Calculate projections using your investments and the performance data.
  const projectionData =
    performanceSeries.length > 0
      ? calculateInvestmentProjections(investmentData, performanceSeries)
      : null;

  // Calculate total amounts based on completed status:
  const totalCompleted = investmentData.reduce(
    (sum, inv) => (inv.completed ? sum + Number(inv.amount) : sum),
    0
  );
  const totalPending = investmentData.reduce(
    (sum, inv) => (!inv.completed ? sum + Number(inv.amount) : sum),
    0
  );

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Investments Tracker
        </Typography>
        <Typography variant="body1">
          Edit and track your investments dynamically.
        </Typography>
      </Box>

      {/* Upload Projection File Section */}
      <Box sx={{ my: 4 }}>
        <Button
          variant="contained"
          onClick={() => setShowUploader(!showUploader)}
        >
          {showUploader ? "Hide File Uploader" : "Upload Projection File"}
        </Button>
        {showUploader && (
          <FileUploader
            onDataParsed={(data) => {
              if (data?.content) {
                setFileContent(data.content);
              }
            }}
          />
        )}
      </Box>

      <Box sx={{ my: 4 }}>
        <AddInvestmentButton
          onAddDefault={handleAddDefault}
          onAddManual={handleAddManual}
        />
      </Box>

      <Box sx={{ my: 4 }}>
        <DataTable
          onDataUpdate={setInvestmentData}
          rows={investmentData}
          setRows={setInvestmentData}
          loading={loading}
          setLoading={setLoading}
        />
      </Box>

      {/* Total Investments Section */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" gutterBottom>
          Investment Totals
        </Typography>
        <Typography variant="body1">
          Total Completed Investments: Rs {totalCompleted}
        </Typography>
        <Typography variant="body1">
          Total Pending Investments: Rs {totalPending}
        </Typography>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" gutterBottom>
          Investment Trends by Category (Month Wise)
        </Typography>
        {investmentData.length ? (
          <LineChart data={categoryChartData} height={600} />
        ) : (
          <Typography variant="body1">No investment data available.</Typography>
        )}
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" gutterBottom>
          Total Investment Trends (Month Wise)
        </Typography>
        {investmentData.length ? (
          <LineChart data={totalChartData} height={600} />
        ) : (
          <Typography variant="body1">No investment data available.</Typography>
        )}
      </Box>

      {projectionData && (
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            Projection Chart
          </Typography>
          <LineChart data={projectionData} height={600} />
        </Box>
      )}
    </Container>
  );
}

export default InvestmentsTracker;
