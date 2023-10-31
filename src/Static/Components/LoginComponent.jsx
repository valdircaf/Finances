import React, {useState, useContext} from "react";
import { Link } from "react-router-dom";
import { validateUser } from "../../Services/validateUser";
import '../Styles/LoginComponent.scss'
import { LoginContext } from "../../Contexts/LoginContext";

export default function LoginComponent(){

    const {showLogin, setShowLogin} = useContext(LoginContext);
    const [loginValue, setLoginValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    return(
        <>
            <form action="register" className= {showLogin ? "form-login" : "hide"}>
                <h1>Olá, seja bem vindo!</h1>
                <h2>Faça seu login ou cadastre-se para acessar seu dashboard!</h2>
                <input type="text" name="login" className="login-input" placeholder="Login" onChange={(e)=>{
                    setLoginValue(e.target.value);
                }}/>
                <input type="password" name="password" className="password-input" placeholder="Senha" onChange={(e)=>{
                    setPasswordValue(e.target.value);
                }}/>
                <button type="submit" onClick={(e)=>{
                    e.preventDefault();
                    validateUser(loginValue, passwordValue);
                }} className="btn-login">Entrar</button>
                <Link onClick={()=>{
                    setShowLogin(false);
                }}>Registrar</Link>
            </form>            
        </>
        
    );
}