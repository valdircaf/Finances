export function ok(code){
    if(code === 200){
        window.location.href = "/dashboard"
    }
    else{
        alert("Usuário já existe!");
    }
}

export function addUserValue(login, password){
    
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
                ok(response.status);
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


