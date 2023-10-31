export function addCost(id, costName, costPrice, callback){

    let data = {
        name: costName,
        price: costPrice
    }

    try{
        fetch(`${process.env.REACT_APP_DATABASE_URL}${id}/othercosts`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => callback()).catch(e => console.error(e));
    }catch(e){
        console.error(e);
    }
}