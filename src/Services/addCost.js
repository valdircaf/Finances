export function addCost(id, costName, costPrice){

    let data = {
        name: costName,
        price: costPrice
    }

    try{
        fetch(`http://localhost:8080/${id}/othercosts`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => console.log(response)).catch(e => console.error(e));
    }catch(e){
        console.error(e);
    }
}