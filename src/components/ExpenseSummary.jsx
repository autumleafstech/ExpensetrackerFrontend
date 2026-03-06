import React from 'react';
import { TextField } from '@mui/material';
import './ExpenseSummary.css';
 import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
const ExpenseSummary = ({ expenses, handleVendorName }) => {
  const total = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount), 0
  );
 
  return (
    <div className="expense-summary">
      <div className="expense-summary__left">
        <span className="expense-summary__label">Total Expenses</span>
        <span className="expense-summary__amount">
          <CurrencyRupeeIcon/>{total}
        </span>
      </div>
 
      <TextField
        size="small"
        placeholder="Search by vendor name..."
        onChange={handleVendorName}
        className="expense-summary__search"
      />
    </div>
  );
};
 
export default ExpenseSummary;
