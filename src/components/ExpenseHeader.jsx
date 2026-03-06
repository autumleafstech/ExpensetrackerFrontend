import React, { useState } from 'react'
import './Expenseheader.css';
import AddExpenseModal from '../components/AddExpenseModal';

const ExpenseHeader = ({onAdd}) => {
    const [openAddModal , setOpenAddModal] = useState(false);

    const handleOpenModal = () =>  {
        setOpenAddModal(true);
    }
    const handleCloseModal = () => {
    setOpenAddModal(false);
  };
  return (
    <div className='expense-header'>
      <h1 className='expense-header__title'>Expense Tracker</h1>
      <button className=" expense-header__btn"onClick={handleOpenModal}>+ Add Expense</button>

   <AddExpenseModal
        open={openAddModal}
        handleClose={handleCloseModal}
        onAdd={onAdd}
        />
    </div>
  )
}

export default ExpenseHeader
