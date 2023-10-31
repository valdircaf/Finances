export function addCost(id, costName, costPrice){

    let data = {
        name: costName,
        price: costPrice
    }

    try{
        fetch(`https://financesdatabase.onrender.com/${id}/othercosts`, {
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