import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { categoryOptions, fundPlansMapping } from "../config/fundMapping";

function AddInvestmentDialog({ open, onClose, onAddDefault, onAddManual }) {
  // mode is either "default" for the preset breakdown or "manual"
  const [mode, setMode] = useState("default");
  // For manual mode, track selected category, fund, and amount.
  const [selectedCategory, setSelectedCategory] = useState(categoryOptions[0]);
  const [selectedFund, setSelectedFund] = useState(
    fundPlansMapping[categoryOptions[0]][0]
  );
  const [amount, setAmount] = useState("");

  const handleModeChange = (event) => {
    setMode(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const newCat = event.target.value;
    setSelectedCategory(newCat);
    const funds = fundPlansMapping[newCat] || [];
    setSelectedFund(funds[0] || "");
  };

  const handleSubmit = () => {
    if (mode === "manual") {
      if (!amount) return;
      onAddManual({
        category: selectedCategory,
        fund: selectedFund,
        amount: parseFloat(amount),
        month: "May 2025", // Default month, can be made dynamic
      });
    } else {
      // Default mode: use a preset breakdown.
      // This breakdown follows your given logic.
      const defaults = [
        // Long-Term Growth (40% - 6,000 RS)
        {
          category: "Shariah Compliant Equity",
          fund: "Al Meezan Mutual Fund",
          amount: 3000,
          month: "May 2025",
        },
        {
          category: "Shariah Compliant Index Tracker",
          fund: "KSE Meezan Index Fund",
          amount: 2000,
          month: "May 2025",
        },
        {
          category: "Shariah Compliant Asset Allocation",
          fund: "Meezan Asset Allocation Fund",
          amount: 1000,
          month: "May 2025",
        },
        // Medium-Term (30% - 4,500 RS)
        {
          category: "Shariah Compliant Balanced Fund",
          fund: "Meezan Balanced Fund",
          amount: 2500,
          month: "May 2025",
        },
        {
          category: "Shariah Compliant Income",
          fund: "Meezan Islamic Income Fund",
          amount: 2000,
          month: "May 2025",
        },
        // Short-Term (20% - 3,000 RS)
        {
          category: "Shariah Compliant Money Market",
          fund: "Meezan Cash Fund",
          amount: 1500,
          month: "May 2025",
        },
        {
          category: "Shariah Compliant Money Market",
          fund: "Meezan Cash Fund",
          amount: 1500,
          month: "May 2025",
        },
        // High-Risk (10% - 1,500 RS)
        {
          category: "Shariah Compliant Equity",
          fund: "Meezan Gold Fund",
          amount: 1500,
          month: "May 2025",
        },
      ];
      onAddDefault(defaults);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Investment</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset" fullWidth margin="normal">
          <RadioGroup row value={mode} onChange={handleModeChange}>
            <FormControlLabel
              value="default"
              control={<Radio />}
              label="Default Breakdown"
            />
            <FormControlLabel
              value="manual"
              control={<Radio />}
              label="Manual Investment"
            />
          </RadioGroup>
        </FormControl>
        {mode === "manual" ? (
          <Box>
            <FormControl fullWidth margin="normal">
              <InputLabel id="category-label">Fund Category</InputLabel>
              <Select
                labelId="category-label"
                value={selectedCategory}
                label="Fund Category"
                onChange={handleCategoryChange}
              >
                {categoryOptions.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="fund-label">Fund/Plan</InputLabel>
              <Select
                labelId="fund-label"
                value={selectedFund}
                label="Fund/Plan"
                onChange={(e) => setSelectedFund(e.target.value)}
              >
                {(fundPlansMapping[selectedCategory] || []).map((fund) => (
                  <MenuItem key={fund} value={fund}>
                    {fund}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              label="Amount (RS)"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              The default breakdown will add investments according to:
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", mt: 1 }}>
              Long-Term Growth (40% - 6,000 RS):
              {"\n"} - 3,000 RS: Al Meezan Mutual Fund
              {"\n"} - 2,000 RS: KSE Meezan Index Fund
              {"\n"} - 1,000 RS: Meezan Asset Allocation Fund
              {"\n\n"}Medium-Term (30% - 4,500 RS):
              {"\n"} - 2,500 RS: Meezan Balanced Fund
              {"\n"} - 2,000 RS: Meezan Islamic Income Fund
              {"\n\n"}Short-Term (20% - 3,000 RS):
              {"\n"} - 1,500 RS: Meezan Cash Fund
              {"\n"} - 1,500 RS: Meezan Cash Fund
              {"\n\n"}High-Risk (10% - 1,500 RS):
              {"\n"} - 1,500 RS: Meezan Gold Fund
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {mode === "default" ? "Add Investments" : "Add Investment"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddInvestmentDialog;
