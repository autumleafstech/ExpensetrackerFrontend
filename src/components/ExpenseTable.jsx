import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TablePagination, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteExpenseModal from './DeleteExpenseModal';
import './ExpenseTable.css';
 
const ROWS_PER_PAGE = 10;
 
const formatDate = (iso) =>
  iso ? new Date(iso).toISOString().split('T')[0] : '—';
 
const ExpenseTable = ({ expenses = [], onDelete }) => {
  const [page,        setPage       ] = useState(0);
  const [deleteModal, setDeleteModal] = useState({
    open: false, expense: null,
  });
 
  const paginated = expenses.slice(
    page * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE + ROWS_PER_PAGE
  );
 
  return (
    <Paper elevation={2} className="expense-table__paper">
      <TableContainer>
        <Table>
 
          <TableHead>
            <TableRow className="expense-table__head-row">
              {['#','Date','Category','Vendor',
                'Amount','Description','Action'].map((h) => (
                <TableCell key={h} className="expense-table__head-cell">
                  {h}
                </TableCell>
              ))}
            </TableRow>
 </TableHead>
 
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="expense-table__empty">
                  No expenses found.
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((expense, i) => (
                <TableRow
                  key={expense.id}
                  className="expense-table__row"
                >
                  <TableCell className="expense-table__cell expense-table__cell--num">
                    {page * ROWS_PER_PAGE + i + 1}
                  </TableCell>
                  <TableCell className="expense-table__cell">
                    {formatDate(expense.date)}
                  </TableCell>
                  <TableCell className="expense-table__cell">
                    {expense.category}
                  </TableCell>
                  <TableCell className="expense-table__cell expense-table__cell--vendor">
                    {expense.vendor}
                  </TableCell>
                  <TableCell className="expense-table__cell expense-table__cell--amount">
                    {parseFloat(expense.amount)}
                  </TableCell>
                  <TableCell className="expense-table__cell">
                    {expense.description}
                  </TableCell>
                  <TableCell className="expense-table__cell">
                    <IconButton
                      size="small"
                      className="expense-table__del-btn"
                      onClick={() =>
                        setDeleteModal({ open: true, expense })
                      }
                    >
                      <DeleteIcon
                        className="expense-table__del-icon"
                        style={{ fontSize: 17 }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
 
      <TablePagination
        component="div"
        count={expenses.length}
        page={page}
        onPageChange={(_, p) => setPage(p)}
        rowsPerPage={ROWS_PER_PAGE}
        rowsPerPageOptions={[ROWS_PER_PAGE]}
        className="expense-table__pagination"
      />
<DeleteExpenseModal
        open={deleteModal.open}
        handleClose={() => setDeleteModal({ open: false, expense: null })}
        onDelete={onDelete}
        expense={deleteModal.expense}
      />
    </Paper>
  );
};
 
export default ExpenseTable;


// import React, { useState } from "react";
// import axios from "axios";
// import {
//   Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Paper, TablePagination, IconButton
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";

// const ROWS_PER_PAGE = 10;

// const formatDate = (iso) => iso ? new Date(iso).toISOString().split("T")[0] : "—";

// const ExpenseTable = ({ expenses , onDelete }) => {
//   console.log(onDelete)
  
//   const [page, setPage] = useState(0);

//   const paginated = expenses.slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE);

//   const cellStyle = {
//     fontFamily: "'Georgia', serif",
//     color: "#111827",
//     fontSize: "14px",
//   };

//   return (
//     <Paper elevation={2} sx={{ width: "95%", margin: "30px auto", borderRadius: 3, overflow: "hidden" }}>
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow sx={{ backgroundColor: "#3B82F6" }}>
//               {["#", "Date", "Category", "Vendor", "Amount", "Description", "Action"].map((h) => (
//                 <TableCell
//                   key={h}
//                   sx={{ color: "#fff", fontWeight: 700, fontSize: "14px", fontFamily: "'Georgia', serif" }}
//                 >
//                   {h}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {paginated.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={7} align="center" sx={{ py: 5, ...cellStyle, color: "#9CA3AF" }}>
//                   No expenses found.
//                 </TableCell>
//               </TableRow>
//             ) : (
//               paginated.map((expense, i) => (
//                 <TableRow
//                   key={expense.id}
//                   sx={{
//                     "&:nth-of-type(odd)": { backgroundColor: "#F9FAFB" },
//                     "&:hover": { backgroundColor: "#EFF6FF", transition: "background 0.15s" },
//                   }}
//                 >
//                   <TableCell sx={cellStyle}>{page * ROWS_PER_PAGE + i + 1}</TableCell>
//                   <TableCell sx={cellStyle}>{formatDate(expense.date)}</TableCell>
//                   <TableCell sx={cellStyle}>{expense.category}</TableCell>
//                   <TableCell sx={{ ...cellStyle, fontWeight: 600 }}>{expense.vendor}</TableCell>
//                   <TableCell sx={{ ...cellStyle, fontWeight: 700 }}>
//                     ₹{parseFloat(expense.amount).toLocaleString("en-IN")}
//                   </TableCell>
//                   <TableCell sx={cellStyle}>{expense.description}</TableCell>
//                   <TableCell>
//                     <IconButton
//                       size="small"
//                       onClick={() => onDelete(expense.id) }
//                       sx={{
//                         backgroundColor: "#FEE2E2",
//                         "&:hover": { backgroundColor: "#FCA5A5" },
//                         width: 32,
//                         height: 32,
//                       }}
//                     >
//                       <DeleteIcon sx={{ color: "#DC2626", fontSize: 17 }}  />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TablePagination
//         component="div"
//         count={expenses.length}
//         page={page}
//         onPageChange={(_, newPage) => setPage(newPage)}
//         rowsPerPage={ROWS_PER_PAGE}
//         rowsPerPageOptions={[ROWS_PER_PAGE]}
//         sx={{ borderTop: "1px solid #E5E7EB" }}
//       />
//     </Paper>
//   );
// };

// export default ExpenseTable;
