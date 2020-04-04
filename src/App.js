import React, {useState, useEffect} from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList'
import ExpenseForm from './components/ExpenseForm'
import Alert from './components/Alert'
import uuid from 'uuid/v4'

const initialExpenses = [
  
];

// const initialExpenses = localStorage.getItem("expenses")
//   ? JSON.parse(localStorage.getItem("expenses"))
//   : [];

function App() {

 const [expenses, setExpenses] = useState(initialExpenses);
 const [charge, setCharge] = useState('');
 const [amount, setAmount] = useState('');
 const [alert, setAlert] = useState({show: false})
 const [edit, setEdit] = useState(false)
 const [id, setId] = useState(0)

//  useEffect(()=>{
//    localStorage.setItem('expenses', JSON.stringify(expenses))
//  })

 const handleCharge = e=>{

   setCharge(e.target.value);
 }
 const handleAmount = e=>{
  setAmount(e.target.value);
}
const handleAlert=({type,text})=>{
  setAlert({show: true,type,text})
  setTimeout(()=>{
    setAlert({show: false})
  },4000)
}
const handleSubmit = e=>{
  e.preventDefault();
  if(charge !== '' && amount > 0){
    if(edit){
      let tempExpenses = expenses.map(item=>{
        return item.id === id? {...item,charge,amount}:item
      })
      setExpenses(tempExpenses);
      setEdit(false)
      handleAlert({type: 'success', text: 'item edited'})
    }else{
      const singleExpense = {id: uuid(), charge,amount}
      setExpenses([...expenses,singleExpense])
      handleAlert({type: 'success', text: 'item added'})
    }
    
    setCharge('')
    setAmount('')
  }else{
    handleAlert({type: 'danger', text: `charge or amount can't be empty`})
  }
}

const clearItems=()=>{
  setExpenses([]);
  handleAlert({type: 'danger', text: 'all items deleted'})
}
const handleDelete=(id)=>{
  let tempExpenses = expenses.filter(item=>item.id!==id);
  setExpenses(tempExpenses);
  handleAlert({type: 'danger', text: 'item deleted'})
}
const handleEdit=(id)=>{
  let expense = expenses.find(item=>item.id===id);
  let {charge, amount} = expense;
  setCharge(charge);
  setAmount(amount);
  setEdit(true);
  setId(id);
}
  return (
    <>
    {alert.show && <Alert type={alert.type} text={alert.text}/>}
      <Alert />
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm charge={charge} 
        amount={amount} 
        handleAmount={handleAmount} 
        handleCharge={handleCharge}
        handleSubmit={handleSubmit}
        edit={edit}/>
        <ExpenseList expenses={expenses} handleDelete={handleDelete}
        handleEdit={handleEdit} clearItems={clearItems}
        />
      </main>
      <h1>
        total spending: <span className="total">
          $ {expenses.reduce((acc,curr)=>{
            return acc += parseInt(curr.amount)
          },0)}
        </span>
      </h1>
    </>
  );
}

export default App;
