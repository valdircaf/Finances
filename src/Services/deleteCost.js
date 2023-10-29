export function deleteCost(costId, userId){
    try{
        fetch(`http://localhost:8080/${userId}/deletecost/${costId}`, {
            method: "DELETE"
        }).then(response => console.log(response)).catch(e => console.error(e));
    }catch(e){
        console.error(e);
    }
}