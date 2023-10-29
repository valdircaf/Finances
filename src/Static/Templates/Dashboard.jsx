import React, { useContext, useState, useEffect } from "react";


import Cards from "../Components/Cards";
import Navbar from "../Components/Navbar";
import { DashboardContext } from "../../Contexts/DashboardContext";
import { setSalaryValue } from "../../Services/setSalaryValue";
import { addExtense } from "../../Services/setExpenseValue";
import { deleteExpense } from "../../Services/deleteExpense";
import { addCost } from "../../Services/addCost";
import { deleteCost } from "../../Services/deleteCost";
import Total from "../Components/Total";

import '../Styles/Dashboard.scss'

export function Dashboard(){
    const {setShowSalary, showSalary, showExpenses, setShowExpenses, showOtherCosts, setShowOtherCosts} = useContext(DashboardContext);
    const [salary, setSalary] = useState(0);

    const [expenseName, setExpenseName] = useState("");
    const [expenseValue, setExpenseValue] = useState(0);
    const [expenseArr, setExpenseArr] = useState([]);
    const [expensesTotalValue, setExpensesTotalValue] = useState(0);

    const [costName, setCostName] = useState("");
    const [costValue, setCostValue] = useState(0);
    const [costArr, setCostArr] = useState([]);
    const [costTotalValue, setCostTotalValue] = useState(0);

    function getExpenses(id){
        try{
            fetch(`http://localhost:8080/users/${(id)}`, {
                method: "GET"
            }).then(response => response.json()).then(data => {
                    setExpenseArr(data.expenses);
                    let sum = 0;
                    for(let i = 0; i < data.expenses.length; i++){
                        sum += data.expenses[i].price;
                    }
                    setExpensesTotalValue(sum);
            }).catch(e => console.error(e))
        }catch(e){
            console.error(e);
        }
    }

    function getCosts(id){
        try{
            fetch(`http://localhost:8080/users/${(id)}`, {
                method: "GET"
            }).then(response => response.json()).then(data => {
                setCostArr(data.otherCosts)
                let sum = 0;
                for(let i = 0; i < data.otherCosts.length; i++){
                    sum += data.otherCosts[i].price;
                }
                setCostTotalValue(sum);
            }).catch(e => console.error(e))
        }catch(e){
            console.error(e);
        }
    }

    useEffect(()=>{
        try{
            //Salary
            fetch(`http://localhost:8080/users/${localStorage.getItem("id")}`, {
                method: "GET"
            }).then(response => response.json()).then(data => {
                setSalary(data.salary);
            }).catch(e => console.error(e));

            //Expenses
            fetch(`http://localhost:8080/users/${localStorage.getItem("id")}`, {
                method: "GET"
            }).then(response => response.json()).then(data => {
                    setExpenseArr(data.expenses);
                    let sum = 0;
                    for(let i = 0; i < data.expenses.length; i++){
                        sum += data.expenses[i].price;
                    }
                    setExpensesTotalValue(sum);
            }).catch(e => console.error(e))

            //Costs
            fetch(`http://localhost:8080/users/${localStorage.getItem("id")}`, {
                method: "GET"
            }).then(response => response.json()).then(data => {
                setCostArr(data.otherCosts);
                let sum = 0;
                for(let i = 0; i < data.otherCosts.length; i++){
                    sum += data.otherCosts[i].price;
                }
                setCostTotalValue(sum);
            }).catch(e => console.error(e))
        }catch(e){
            console.error(e);
        }
    }, [])

    return(
        <section className="dashboard">
            <nav className="navbar">
                <Navbar/>
            </nav>
            <section className="content">
                <h1>Olá, {localStorage.getItem("name")}!</h1>
                <h2>Aqui estão suas informações...</h2>
                <div className="cards">
                    <section className={showSalary ? "expand-salary" : "card-salary"}>
                        <form className={showSalary ? "edit-salary" : "hide"}>
                            <input type="number" placeholder="Digite o valor do seu salário..." onChange={(e)=>{
                                setSalary(e.target.value);
                            }}/>
                            <button onClick={(e)=>{
                                e.preventDefault();
                                setShowSalary(!showSalary);
                                setSalaryValue(localStorage.getItem("id"), salary);
                        }}>Aplicar</button>
                        </form>
                        <Cards title="Salário" value={salary != 0 && salary} className = {showSalary ? "hide" : ""}/>
                        <button onClick={(e)=>{
                            setShowSalary(!showSalary);
                        }} className = {showSalary ? "hide" : ""} >Editar</button>
                    </section>
                    <section className="card-spent">
                        <Cards title="Despesas" value={expensesTotalValue !=0 && expensesTotalValue} className={showExpenses && "hide"}/>

                        <section className={showExpenses ? "showListExpenses" : "hide"}>

                            <ul>
                                {expenseArr.map((expense)=>(
                                    <section className="expenses" key={expense.id}>
                                        <li>{expense.name}: R${expense.price},00</li>
                                        <button className="btn-rmv-expense" onClick={(e)=>{
                                            e.preventDefault();
                                            deleteExpense(localStorage.getItem("id"), expense.id);
                                            setTimeout(() => {
                                            getExpenses(localStorage.getItem("id"));    
                                            }, [300]);
                                        }}>Apagar</button>
                                    </section>
                                ))}
                            </ul>

                            <form action="" className="form-add-expense">

                            <input type="text" placeholder="Digite o nome da despesa" onChange={(e)=> {
                                setExpenseName(e.target.value);
                            }}/>
                            <input type="number" placeholder="Digite o valor da despesa" onChange={(e)=> {
                                setExpenseValue(e.target.value);
                            }}/>

                            <button className="btn-add-expense" onClick={(e)=>{
                                e.preventDefault();
                                addExtense(localStorage.getItem("id"), expenseName, expenseValue);
                                setTimeout(()=>{
                                    getExpenses(localStorage.getItem("id"));
                                }, [300])
                            }}>Adicionar</button>

                            </form>

                            <button className="btn-add" onClick={()=>{
                                setShowExpenses(!showExpenses);
                            }}>Fechar</button>

                        </section>

                        <div className={showExpenses ? "hide" : "buttons-card-spent"}>
                            <button type="button" className="btn-add" onClick={()=>{
                                setShowExpenses(!showExpenses);
                            }}>Ver</button>
                        </div>

                    </section>
                    <section className={showOtherCosts ? "expand-other-costs" : "other-costs"}>
                        <Cards title="Outros custos" value={costTotalValue && costTotalValue} className={showOtherCosts && "hide"}/>
                        <section className={showOtherCosts ? "list-other-costs" : "hide"}>
                            <ul>
                                {costArr.map((cost)=>(
                                    <section key={cost.id}>
                                        <li>{cost.name}: R${cost.price},00</li>
                                        <button onClick={(e)=>{
                                            e.preventDefault();
                                            deleteCost(cost.id, localStorage.getItem("id"));
                                            setTimeout(()=>{
                                                getCosts(localStorage.getItem("id"));
                                            }, 300)
                                        }}>Apagar</button>
                                    </section>
                                ))}
                            </ul>
                            <form action="add-other-cost">
                                <input type="text" placeholder="Digite o nome do custo..." onChange={(e)=>{
                                    setCostName(e.target.value);
                                }}/>

                                <input type="number" placeholder="Digite o valor do custo..." onChange={(e)=>{
                                    setCostValue(e.target.value);
                                }}/>
                                <button onClick={(e)=>{
                                    e.preventDefault();
                                    addCost(localStorage.getItem("id"), costName, costValue);
                                    setTimeout(()=>{
                                        getCosts(localStorage.getItem("id"));
                                    }, 300)
                                }}>Adicionar</button>
                            </form>
                            <button onClick={()=>{
                                setShowOtherCosts(!showOtherCosts);
                            }} className="close-expand-cost">Fechar</button>
                        </section>
                        <div className="buttons-other-costs">
                            <button type="button" className={showOtherCosts ? "hide" : "btn-add"} onClick={(e)=>{
                                e.preventDefault();
                                setShowOtherCosts(!showOtherCosts);
                            }}>Ver</button>
                        </div>
                    </section>
                </div>
            </section>
            <section className="total">
                <Total value = {salary - (costTotalValue + expensesTotalValue)}/>
            </section>
        </section>
    );
}