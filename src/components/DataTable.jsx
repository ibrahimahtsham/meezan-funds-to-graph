import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebaseConfig";

function DataTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: "id", headerName: "ID", width: 100, editable: false },
    { field: "category", headerName: "Category", width: 200, editable: true },
    { field: "fund", headerName: "Fund/Plan", width: 300, editable: true },
  ];

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "investments"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRows(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Handle cell edit
  const handleProcessRowUpdate = async (newRow) => {
    const updatedRow = { ...newRow };
    const docRef = doc(db, "investments", newRow.id);
    await updateDoc(docRef, {
      category: newRow.category,
      fund: newRow.fund,
    });
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
