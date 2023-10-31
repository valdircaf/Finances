import React, { useContext, useEffect, useState } from "react";
import "../Styles/SectionsDashboard.scss";
import { IoCloseOutline } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { DashboardContext } from "../../Contexts/DashboardContext";
import { addExtense } from "../../Services/setExpenseValue";
import { deleteExpense } from "../../Services/deleteExpense";
import {addCost} from '../../Services/addCost';
import { deleteCost } from '../../Services/deleteCost';

export default function SectionsDashboard({
  className,
  placeHolderText,
  placeHolderNumber,
  name,
}) {
  //STATES
  const [inputName, setInputName] = useState("");
  const [inputValue, setInputValue] = useState(0);
  const [cost, setCost] = useState([]);
  const [expenses, setExpenses] = useState([]); 

  const {
    setShowExpenses,
    showExpenses,
    setExpensesTotalValue,
    showOtherCosts,
    setShowOtherCosts,
    setCostTotalValue,
  } = useContext(DashboardContext);

  useEffect(() => {
    if (name === "expense") {
      try {
        fetch(`https://financesdatabase.onrender.com/users/${localStorage.getItem("id")}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            setExpenses(data.expenses);
            let sum = 0;
            for (let i = 0; i < data.expenses.length; i++) {
              sum += data.expenses[i].price;
            }
            setExpensesTotalValue(sum);
          })
          .catch((e) => console.error(e));
      } catch (e) {
        console.error(e);
      }
    } else if (name === "costs") {
      try {
        fetch(`https://financesdatabase.onrender.com/users/${localStorage.getItem("id")}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            setCost(data.otherCosts);
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
    }
  }, []);

  function getRequisitions() {
    if (name === "expense") {
      try {
        fetch(`https://financesdatabase.onrender.com/users/${localStorage.getItem("id")}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            setExpenses(data.expenses);
            let sum = 0;
            for (let i = 0; i < data.expenses.length; i++) {
              sum += data.expenses[i].price;
            }
            setExpensesTotalValue(sum);
          })
          .catch((e) => console.error(e));
      } catch (e) {
        console.error(e);
      }
    } else if (name === "costs") {
        try {
            fetch(`https://financesdatabase.onrender.com/users/${localStorage.getItem("id")}`, {
              method: "GET",
            })
              .then((response) => response.json())
              .then((data) => {
                setCost(data.otherCosts);
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
    }
  }

  return (
    <section className={className ? className : "container-sections"}>
      <section className="list-and-svg">
        <ul>
          {name === "expense"
            ? expenses.map((item) => (
                <section key={item.id}>
                  <li>
                    {(item.name)[0].toUpperCase() + (item.name).substring(1)}: R$${item.price},00
                  </li>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (name === "expense") {
                        deleteExpense(localStorage.getItem("id"), item.id);
                      }
                      setTimeout(() => {
                        getRequisitions();
                      }, 300);
                    }}
                  >
                    <AiFillDelete />
                  </button>
                </section>
              ))
            : cost.map((item) => (
                <section key={item.id}>
                  <li>
                    {(item.name)[0].toUpperCase() + (item.name).substring(1)}: R${item.price},00
                  </li>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (name === "costs") {
                        deleteCost(item.id, localStorage.getItem("id"));
                      }
                      setTimeout(() => {
                        getRequisitions();
                      }, 300);
                    }}
                  >
                    <AiFillDelete />
                  </button>
                </section>
              ))}
        </ul>
        <button
          className="btn-close"
          onClick={(e) => {
            e.preventDefault();
            if (name === "expense") {
              setShowExpenses(!showExpenses);
            } else if (name === "costs") {
              setShowOtherCosts(!showOtherCosts);
            }
          }}
        >
          <IoCloseOutline />
        </button>
      </section>
      <form action="add-info" className="form-sections">
        <input
          type="text"
          placeholder={placeHolderText}
          className="inputs"
          onChange={(e) => {
            setInputName(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder={placeHolderNumber}
          className="inputs"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            if (name === "expense") {
              addExtense(localStorage.getItem("id"), inputName, inputValue);
            } else if(name === "costs"){
                addCost(localStorage.getItem("id"), inputName, inputValue);
            }
            setTimeout(() => {
              getRequisitions();
            }, 300);
          }}
        >
          Adicionar
        </button>
      </form>
    </section>
  );
}
