import React, { useContext, useState, useEffect } from "react";


import Cards from "../Components/Cards";
import Navbar from "../Components/Navbar";
import { DashboardContext } from "../../Contexts/DashboardContext";
import { setSalaryValue } from "../../Services/setSalaryValue";

import '../Styles/Dashboard.scss'

export function Dashboard(){
    const {setShowSalary, showSalary} = useContext(DashboardContext);
    const [salary, setSalary] = useState(0);

    useEffect(()=>{
        try{
            fetch(`http://localhost:8080/users/${localStorage.getItem("id")}`, {
                method: "GET"
            }).then(response => response.json()).then(data => {
                setSalary(data.salary);
            }).catch(e => console.error(e));
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
                        <Cards title="Despesas" value="2.000"/>
                        <div className="buttons-card-spent">
                            <button type="button" className="btn-add">Adicionar</button>
                            <button type="button" className="btn-rmv">Remover</button>
                        </div>
                    </section>
                    <section className="other-costs">
                        <Cards title="Outros custos" value="2.000"/>
                        <div className="buttons-other-costs">
                            <button type="button" className="btn-add">Adicionar</button>
                            <button type="button" className="btn-rmv">Remover</button>
                        </div>
                    </section>
                </div>
            </section>
        </section>
    );
}