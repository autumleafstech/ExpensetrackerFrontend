import { useEffect, useState } from 'react'
import './App.css'
import ExpenseHeader from './components/ExpenseHeader'
import ExpenseTable from './components/ExpenseTable'
import axios from 'axios';
import ExpenseSummary from './components/ExpenseSummary';

function App() {
    const [expenses , setExpenses] = useState([]);
    const [vendorName, setVendorName] = useState("")
    const fetchExpenses = async () => {
         try{
         const response = await axios.get("http://localhost:3000/api/getexpenses");
        console.log(response.data)
        setExpenses(response.data)
         }
         catch(err) {
            console.error("Error while fetchinf expense", err)
         }
    }

    useEffect(() => {
      fetchExpenses();
    },[])
 function handleVendorName(e) {
      setVendorName(e.target.value);
      console.log(e.target.value);
  }
  
    // const filteredData = expenses.filter(
    //   (exp) => exp.vendor.toLowerCase().includes(vendorName.toLowerCase()));
    // console.log(filteredData);
const filteredExpense = vendorName? expenses.filter((exp) => exp.vendor.toLowerCase().includes(vendorName.toLowerCase())): expenses;
   async function deleteExpense(expenseId) {
  try {
    console.log(`http://localhost:3000/api/expenses/${expenseId}`);
    const response = await axios.delete(`http://localhost:3000/api/deleteexpense/${expenseId}`);
    setExpenses((prev) => prev.filter((exp) => exp.id !== expenseId));
    console.log("Deleted:", response.data.id);
    return response.data;
  } catch (error) {
    console.error("Error deleting expense:", error);
  }
} 

function handleAddExpense() {
    fetchExpenses();
}
  return (
    <>
      <ExpenseHeader onAdd={handleAddExpense}/>
      <ExpenseSummary  expenses={expenses} handleVendorName={handleVendorName}/>
      <ExpenseTable expenses={filteredExpense} onDelete={deleteExpense}/>
    </>
  )
}

export default App
