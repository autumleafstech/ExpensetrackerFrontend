import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Chip,
  IconButton,
  Box
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const expenses = [
  {
    id: 1,
    date: "01 Mar 2026",
    category: "Food & Beverage",
    vendor: "Sagar Fresh Seafood Suppliers",
    amount: 42000,
    description: "Weekly seafood & produce delivery",
    receipt: "RCP-001"
  },
  {
    id: 2,
    date: "01 Mar 2026",
    category: "Utilities",
    vendor: "Maharashtra State Electricity",
    amount: 87500,
    description: "Monthly electricity bill – March",
    receipt: "RCP-002"
  }
];

const getCategoryColor = (category) => {
  const colors = {
    "Food & Beverage": { bg: "#FFE7C2", text: "#B45309" },
    Utilities: { bg: "#E0E7FF", text: "#4338CA" },
    Maintenance: { bg: "#DBEAFE", text: "#1D4ED8" },
    Marketing: { bg: "#FDE2E4", text: "#BE123C" }
  };
  return colors[category] || { bg: "#E5E7EB", text: "#374151" };
};

const ExpenseTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  return (
    <Paper sx={{ width: "95%", margin: "30px auto", borderRadius: 3 }}>
      <TableContainer>
        <Table>
          {/* HEADER */}
          <TableHead>
            <TableRow sx={{ backgroundColor: "#3B82F6" }}>
              {["#", "Date", "Category", "Vendor Name", "Amount", "Description", "Receipt", "Action"].map(
                (head) => (
                  <TableCell
                    key={head}
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "14px"
                    }}
                  >
                    {head}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>

          {/* BODY */}
          <TableBody>
            {expenses
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((expense, index) => {
                const color = getCategoryColor(expense.category);

                return (
                  <TableRow
                    key={expense.id}
                    sx={{
                      "&:nth-of-type(odd)": {
                        backgroundColor: "#F9FAFB"
                      }
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{expense.date}</TableCell>

                    {/* Category Chip */}
                    <TableCell>
                      <Chip
                        label={expense.category}
                        sx={{
                          backgroundColor: color.bg,
                          color: color.text,
                          fontWeight: 600
                        }}
                      />
                    </TableCell>

                    <TableCell sx={{ fontWeight: 600 }}>
                      {expense.vendor}
                    </TableCell>

                    {/* Amount */}
                    <TableCell
                      sx={{
                        color: "#2563EB",
                        fontWeight: "bold"
                      }}
                    >
                      ₹{expense.amount.toLocaleString()}
                    </TableCell>

                    <TableCell>{expense.description}</TableCell>

                    {/* Receipt Badge */}
                    <TableCell>
                      <Box
                        sx={{
                          backgroundColor: "#E5E7EB",
                          padding: "4px 10px",
                          borderRadius: "25px",
                          fontSize: "12px",
                          display: "inline-block"
                        }}
                      >
                        {expense.receipt}
                      </Box>
                    </TableCell>

                    {/* Delete Button */}
                    <TableCell>
                      <IconButton
                        sx={{
                          backgroundColor: "#FEE2E2",
                          "&:hover": { backgroundColor: "#FCA5A5" }
                        }}
                      >
                        <DeleteIcon sx={{ color: "#DC2626" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={expenses.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </Paper>
  );
};

export default ExpenseTable;