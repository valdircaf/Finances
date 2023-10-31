export function addExtense(id, expenseName, expenseValue){

    let data = {
        name: expenseName,
        price: expenseValue,
    }

    if(expenseName != "" && expenseValue != 0){
        try{
            fetch(`https://financesdatabase.onrender.com/${id}/expense`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(response => console.log(response)).catch(er => console.error(er))
        }catch(e){
            console.error(e);
        }
    }else{
        alert("Digite um valor válido.")
    }
    
}