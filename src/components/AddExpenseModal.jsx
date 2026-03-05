import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const categories = [
  "Food & Beverage",
  "Utilities",
  "Maintenance",
  "Marketing",
  "Housekeeping"
];

const AddExpenseModal = ({ open, handleClose, handleAdd }) => {
  const [formData, setFormData] = useState({
    category: "",
    vendor: "",
    amount: "",
    date: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try{
           const response = await axios.post(" http://localhost:3000/addexpenses",formData) ;
           console.log(response);
           handleClose();
    }
    catch(err) {
 console.log("Error while adding expesne:",err)
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>
        Add New Expense
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", right: 10, top: 10 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>

       
        <Box
          sx={{
            display: "flex",
            gap: 3,
            mb: 3,
            flexWrap: "wrap"
          }}
        >
          <TextField
            select
            label="Category *"
            name="category"
            value={formData.category}
            onChange={handleChange}
            sx={{ flex: 1, minWidth: 250 }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Vendor Name *"
            name="vendor"
            value={formData.vendor}
            onChange={handleChange}
            sx={{ flex: 1, minWidth: 250 }}
          />
        </Box>

     
        <Box
          sx={{
            display: "flex",
            gap: 3,
            mb: 3,
            flexWrap: "wrap"
          }}
        >
          <TextField
            label="Amount (₹) *"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            sx={{ flex: 1, minWidth: 250 }}
          />

          <TextField
            label="Date *"
            name="date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.date}
            onChange={handleChange}
            sx={{ flex: 1, minWidth: 250 }}
          />
        </Box>

        
        <TextField
          fullWidth
          label="Description"
          name="description"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleChange}
        />
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#3B82F6",
            "&:hover": { backgroundColor: "#2563EB" }
          }}
        >
          Add Expense
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExpenseModal;