import { Button } from "@mui/material";
import { useState } from "react";
import AddInvestmentDialog from "./AddInvestmentDialog";

function AddInvestmentButton({ onAddDefault, onAddManual }) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Investment
      </Button>
      <AddInvestmentDialog
        open={open}
        onClose={handleClose}
        onAddDefault={onAddDefault}
        onAddManual={onAddManual}
      />
    </>
  );
}

export default AddInvestmentButton;
