import { getUserValues } from "./validateUser";
import { Dashboard } from "../Static/Templates/Dashboard";
import { LoginContext } from "../Contexts/LoginContext";

export function ok(code, render){
    if(code === 200){
        render(true);
    }
    else{
        alert("Usuário já existe!");
    }
}

export function addUserValue(login, password, render){
    
    if(login != "" && password != ""){
        const data = {
            login: login,
            password: password,
        }
    
        try{
            fetch("http://localhost:8080/users", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(data)
            }).then(response => {
                    setTimeout(()=>{
                        ok(response.status, render);    
                    }, 1000)
            }).catch(e => console.error(e));
        } catch{
            console.log("Bad Request");
        }
    }
    else if(login === "" && password === ""){
        alert("Digite um usuário e uma senha!")
    }
    else if(login === ""){
        alert("Digite um nome de usuário!")
    }
    else if(password === ""){
        alert("Digite uma senha!")
    }
}


