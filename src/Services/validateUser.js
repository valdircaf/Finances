export let nameValue = "";

export function validateUser(name, password){
    function redirect(){
        window.location.href = "/dashboard";
    }

   
    try{
        fetch(`${process.env.REACT_APP_DATABASE_URL}users`, {
            method: "GET"
        }).then(response => response.json()).then(data => {
            if(data.length > 0){
                for(let i = 0; i < data.length; i++){
                    if(name === data[i].login){
                        if(password === data[i].password){
                            redirect();
                            localStorage.setItem("name", data[i].login);
                            localStorage.setItem("id", data[i].id);
                        }else if(password !== data[i].password){
                            alert("Senha incorreta!")
                        }
                    }
                }
            } else{
                return
            }
        }).catch(e => console.error(e))
    }catch(e){
        console.log(e);
    }
}