import React, { useState } from 'react';
import axios from 'axios';
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button, TextField, MenuItem, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './AddExpenseModal.css';
 
const CATEGORIES = [
  'Food & Beverage', 'Utilities',
  'Maintenance', 'Marketing', 'Housekeeping',
];
 
const EMPTY = {
  category:'', vendor:'', amount:'', date:'', description:''
};
 
const AddExpenseModal = ({ open, handleClose, onAdd }) => {
  const [formData, setFormData] = useState(EMPTY);
  const [error,    setError   ] = useState('');
 
  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
 
  const reset = () => { setFormData(EMPTY); setError(''); };
 
  const handleSubmit = async () => {
    const { category, vendor, amount, date } = formData;
    if (!category || !vendor || !amount || !date) {
      setError('Please fill in all required fields.');
      return;
    }
    try {
      await axios.post('http://localhost:3000/api/addexpenses', formData);
      reset();
      if (onAdd) onAdd();
    } catch (err) {
      console.error('Error adding expense:', err);
      setError('Failed to add expense. Please try again.');
    }
  };
 
  const handleCloseReset = () => { reset(); handleClose(); };
 
  return (
    <Dialog
      open={open}
      onClose={handleCloseReset}
      maxWidth="md"
      fullWidth
      PaperProps={{ className: 'add-modal__paper' }}
    >
      <DialogTitle className="add-modal__title">
        Add New Expense
        <IconButton onClick={handleCloseReset} className="add-modal__close">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
 
      <DialogContent className="add-modal__content">
        {error && <p className="add-modal__error">{error}</p>}
 
        <div className="add-modal__row">
          <TextField
            select label="Category *" name="category"
            value={formData.category} onChange={handleChange}
            className="add-modal__field"
          >
            {CATEGORIES.map((c) => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Vendor Name *" name="vendor"
            value={formData.vendor} onChange={handleChange}
            className="add-modal__field"
          />
        </div>
 
        <div className="add-modal__row">
          <TextField
            label="Amount (rupee) *" name="amount" type="number"
            value={formData.amount} onChange={handleChange}
            className="add-modal__field"
          />
          <TextField
            label="Date *" name="date" type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.date} onChange={handleChange}
            className="add-modal__field"
          />
        </div>
 
        <TextField
          fullWidth label="Description" name="description"
          multiline rows={4}
          value={formData.description} onChange={handleChange}
        />
</DialogContent>
 
      <DialogActions className="add-modal__actions">
        <Button variant="outlined" onClick={handleCloseReset}
          className="add-modal__btn-cancel">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}
          className="add-modal__btn-save">
          Add Expense
        </Button>
      </DialogActions>
    </Dialog>
  );
};
 
export default AddExpenseModal;

