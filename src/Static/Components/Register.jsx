import React, {useState, useContext} from "react";
import { Link } from "react-router-dom";
import { addUserValue } from "../../Services/setUserValue";
import { LoginContext } from "../../Contexts/LoginContext";
import '../Styles/Register.scss'

export default function Register(){

    const [loginValue, setLoginValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const {showLogin, setShowLogin} = useContext(LoginContext);

    return(
        <form action="register" className={!showLogin ? "form-register" : "hide"}>
            <h1>olá, seja bem vindo!</h1>
            <h2>faça seu cadastro, para acessar seu dashboard!</h2>
            <input type="text" name="login" className="login-input" placeholder="Login" onChange={(e)=>{
                setLoginValue(e.target.value);
            }}/>
            <input type="password" name="password" className="password-input" placeholder="Senha" onChange={(e)=>{
                setPasswordValue(e.target.value);
            }}/>
            <button type="submit" onClick={(e)=>{
                e.preventDefault();
                addUserValue(loginValue, passwordValue, setShowLogin);
            }} className="btn-login">Cadastrar</button>
            <Link onClick={()=>{
                setShowLogin(true);
            }}>Login</Link>
        </form>
    );
}