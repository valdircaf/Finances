import React, { useContext, useState, useEffect } from "react";

//IMPORT COMPONENTS
import Cards from "../Components/Cards";
import Navbar from "../Components/Navbar";
import Total from "../Components/Total";
import SectionsDashboard from "../Components/SectionsDashboard";

//IMPORT SCRIPTS
import { DashboardContext } from "../../Contexts/DashboardContext";
import { setSalaryValue } from "../../Services/setSalaryValue";

//IMPORT STYLES
import "../Styles/Dashboard.scss";

export function Dashboard() {
  //CONTEXT
  const {
    setShowSalary,
    showSalary,
    showExpenses,
    setShowExpenses,
    showOtherCosts,
    setShowOtherCosts,
    expensesTotalValue,
    setExpensesTotalValue,
    costTotalValue,
    setCostTotalValue,
  } = useContext(DashboardContext);

  //STATES
  const [salary, setSalary] = useState(0);
  const [expenseArr, setExpenseArr] = useState([]);


  //EFFECT
  useEffect(() => {
    try {
      //GET SALARY
      fetch(`${process.env.REACT_APP_DATABASE_URL}users/${localStorage.getItem("id")}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setSalary(data.salary);
        })
        .catch((e) => console.error(e));

      //GET EXPENSES
      fetch(`${process.env.REACT_APP_DATABASE_URL}users/${localStorage.getItem("id")}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          let sum = 0;
          for (let i = 0; i < data.expenses.length; i++) {
            sum += data.expenses[i].price;
          }
          setExpensesTotalValue(sum);
        })
        .catch((e) => console.error(e));

      //GET COSTS
      fetch(`${process.env.REACT_APP_DATABASE_URL}users/${localStorage.getItem("id")}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          let sum = 0;
          for (let i = 0; i < data.otherCosts.length; i++) {
            sum += data.otherCosts[i].price;
          }
          setCostTotalValue(sum);
        })
        .catch((e) => console.error(e));
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <section className="dashboard">
      {/* NAVBAR */}
      <nav className="navbar">
        <Navbar />
      </nav>
      <section className="content">
        <h1>Olá, {localStorage.getItem("name")}!</h1>
        <h2>Aqui estão suas informações...</h2>
      
      {/* CARDS */}
        <div className="cards">

      {/* SALARY'S CARD */}
          <section className={showSalary ? "expand-salary" : "card-salary"}>
            <form className={showSalary ? "edit-salary" : "hide"}>
              <input
                type="number"
                placeholder="Digite o valor do seu salário..."
                onChange={(e) => {
                  setSalary(e.target.value);
                }}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowSalary(!showSalary);
                  setSalaryValue(localStorage.getItem("id"), salary);
                }}
              >
                Aplicar
              </button>
            </form>
            <Cards
              title="Salário"
              value={salary != 0 && salary}
              className={showSalary ? "hide" : ""}
            />
            <button
              onClick={(e) => {
                setShowSalary(!showSalary);
              }}
              className={showSalary ? "hide" : ""}
            >
              Editar
            </button>
          </section>

      {/* EXPENSE'S CARD */}
          <section className="card-spent">
            <Cards
              title="Despesas"
              value={expensesTotalValue != 0 && expensesTotalValue}
              className={showExpenses && "hide"}
            />
            <SectionsDashboard
              className={!showExpenses && "hide"}
              placeHolderText="Nome"
              placeHolderNumber="Valor"
              name="expense"
              arrayToRender={expenseArr}
            />
            <div className={showExpenses ? "hide" : "buttons-card-spent"}>
              <button
                type="button"
                className="btn-add"
                onClick={() => {
                  setShowExpenses(!showExpenses);
                }}
              >
                Ver
              </button>
            </div>
          </section>

      {/* COST'S CARD*/}
          <section className="other-costs">
            <Cards
              title="Outros custos"
              value={costTotalValue && costTotalValue}
              className={showOtherCosts && "hide"}
            />
            <SectionsDashboard
              className={!showOtherCosts && "hide"}
              placeHolderText="Nome"
              placeHolderNumber="Valor"
              name="costs"
            />
            <div className="buttons-other-costs">
              <button
                type="button"
                className={showOtherCosts ? "hide" : "btn-add"}
                onClick={(e) => {
                  e.preventDefault();
                  setShowOtherCosts(!showOtherCosts);
                }}
              >
                Ver
              </button>
            </div>
          </section>
        </div>
      </section>

      {/* TOTAL */}
      <section className="total">
        <Total value={salary - (costTotalValue + expensesTotalValue)} />
      </section>
    </section>
  );
}
