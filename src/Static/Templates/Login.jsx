import React, {useState} from "react";
import '../Styles/Login.scss';
import { addUserValue } from "../../Services/setUserValue";
import illustration from '../Images/Illustration.png';


export default function Login(){

    const [loginValue, setLoginValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    return(
        <>
            <section className="login-page">
                <section className="login">
                    <form action="login" className="form">
                        <h1>olá, seja bem vindo!</h1>
                        <h2>faça seu cadastro, ou entre na sua conta para acessar seu dashboard!</h2>
                        <input type="text" name="login" className="login-input" placeholder="Login" onChange={(e)=>{
                            setLoginValue(e.target.value);
                        }}/>
                        <input type="password" name="password" className="password-input" placeholder="Senha" onChange={(e)=>{
                            setPasswordValue(e.target.value);
                        }}/>
                        <button type="submit" onClick={(e)=>{
                            e.preventDefault();
                            addUserValue(loginValue, passwordValue);
                        }} className="btn-login">Entrar</button>
                    </form>
                <section className="image">
                    <img src={illustration} alt="Illustration 1" />
                </section>
                </section>
            </section>
        </>
    )
}