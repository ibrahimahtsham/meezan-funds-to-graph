import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect } from "react";
import { categoryOptions, fundPlansMapping } from "../config/fundMapping";
import {
  deleteInvestment,
  fetchInvestments,
  updateInvestment,
} from "../utils/investmentService";

function DataTable({ onDataUpdate, rows, setRows, loading, setLoading }) {
  const theme = useTheme();

  const columns = [
    { field: "id", headerName: "ID", width: 100, editable: false },
    {
      field: "category",
      headerName: "Category",
      width: 250,
      editable: true,
      type: "singleSelect",
      valueOptions: categoryOptions,
    },
    {
      field: "fund",
      headerName: "Fund/Plan",
      width: 350,
      editable: true,
      renderEditCell: (params) => {
        const { id, value, row } = params;
        const options = fundPlansMapping[row.category] || [];
        return (
          <Select
            value={value || ""}
            onChange={(event) => {
              params.api.setEditCellValue(
                { id, field: params.field, value: event.target.value },
                event
              );
            }}
            fullWidth
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        );
      },
    },
    { field: "amount", headerName: "Amount (RS)", width: 150, editable: true },
    { field: "month", headerName: "Month", width: 150, editable: true },
    {
      field: "completed",
      headerName: "Status",
      width: 150,
      editable: true,
      type: "boolean",
      renderCell: (params) => {
        const bgColor = params.value
          ? theme.palette.success.light
          : theme.palette.error.light;
        const text = params.value ? "Done" : "Not Done";
        return (
          <div
            style={{
              backgroundColor: bgColor,
              padding: "5px",
              borderRadius: "4px",
              textAlign: "center",
              width: "100%",
            }}
          >
            {text}
          </div>
        );
      },
      renderEditCell: (params) => {
        return (
          <Select
            value={params.value ? "done" : "not-done"}
            onChange={(event) => {
              const newValue = event.target.value === "done";
              params.api.setEditCellValue(
                { id: params.id, field: params.field, value: newValue },
                event
              );
            }}
            fullWidth
          >
            <MenuItem value="done">Done</MenuItem>
            <MenuItem value="not-done">Not Done</MenuItem>
          </Select>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => {
        return (
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon color="error" />
          </IconButton>
        );
      },
    },
  ];

  const handleDelete = async (id) => {
    try {
      await deleteInvestment(id);
      const updatedRows = rows.filter((row) => row.id !== id);
      setRows(updatedRows);
      if (onDataUpdate) onDataUpdate(updatedRows);
    } catch (error) {
      console.error("Error deleting investment:", error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchInvestments();
      setRows(data);
      setLoading(false);
      if (onDataUpdate) onDataUpdate(data);
    };
    getData();
  }, [onDataUpdate, setRows, setLoading]);

  const handleProcessRowUpdate = async (newRow) => {
    const updatedRow = await updateInvestment(newRow);
    const updatedRows = rows.map((row) =>
      row.id === updatedRow.id ? updatedRow : row
    );
    if (onDataUpdate) onDataUpdate(updatedRows);
    return updatedRow;
  };

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        components={{
          Toolbar: GridToolbar,
        }}
        processRowUpdate={handleProcessRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </div>
  );
}

export default DataTable;
