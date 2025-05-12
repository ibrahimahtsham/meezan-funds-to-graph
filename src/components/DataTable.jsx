import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { fetchInvestments, updateInvestment } from "../utils/investmentService";
import { fundPlansMapping, categoryOptions } from "../config/fundMapping";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function DataTable({ onDataUpdate, rows, setRows, loading, setLoading }) {
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
  ];

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
