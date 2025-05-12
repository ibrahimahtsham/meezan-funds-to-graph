import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddInvestmentButton from "../components/AddInvestmentButton";
import DataTable from "../components/DataTable";
import LineChart from "../components/LineChart";
import { aggregateInvestmentByCategoryAndMonth } from "../utils/aggregateInvestmentByCategoryAndMonth";
import { addInvestment, fetchInvestments } from "../utils/investmentService";

function InvestmentsTracker() {
  const [investmentData, setInvestmentData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Aggregate data by category and month.
  const chartData = aggregateInvestmentByCategoryAndMonth(investmentData);

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
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" gutterBottom>
          Investment Trends (by Category & Month)
        </Typography>
        {investmentData.length ? (
          <LineChart data={chartData} height={600} />
        ) : (
          <Typography variant="body1">No investment data available.</Typography>
        )}
      </Box>
    </Container>
  );
}

export default InvestmentsTracker;
