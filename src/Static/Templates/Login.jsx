import React, { useContext} from "react";
import '../Styles/Login.scss';
import illustration from '../Images/Illustration.png';
import { LoginContext } from "../../Contexts/LoginContext";
import LoginComponent from "../Components/LoginComponent";
import Register from "../Components/Register";

export default function Login(){

    const {showLogin} = useContext(LoginContext);

    return(
        <>
            <section className="login-page">
                <section className="register">
                    {showLogin ? <LoginComponent/> : <Register/>}
                <section className="image">
                    <img src={illustration} alt="Illustration 1" />
                </section>
                </section>
            </section>
        </>
    )
}