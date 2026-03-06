import React from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button, IconButton
} from '@mui/material';
import CloseIcon  from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import './DeleteExpenseModal.css';
 
const DeleteExpenseModal = ({ open, handleClose, onDelete, expense }) => {
  if (!expense) return null;
 
  const handleConfirm = () => {
    if (onDelete) onDelete(expense.id);
    handleClose();
  };
 
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ className: 'del-modal__paper' }}
    >
      <DialogTitle className="del-modal__title">
        Delete Expense
        <IconButton onClick={handleClose} className="del-modal__close">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
 
     
 
      <DialogActions className="del-modal__actions">
        <Button variant="outlined" onClick={handleClose}
          className="del-modal__btn-cancel">
          Cancel
        </Button>
        <Button variant="contained"
           startIcon={<DeleteIcon />}
          onClick={handleConfirm}
          className="del-modal__btn-delete">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
 
export default DeleteExpenseModal;

