import { getSalaryValue } from "./getSalaryValue";

export function setSalaryValue(id, salary){

    let data = {
        salary : salary
    }
    try{
        fetch(`https://financesdatabase.onrender.com/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => console.log(response)).catch(e => console.error(e))
    }catch(e){
        console.error(e);
    }
}