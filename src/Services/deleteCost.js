export function deleteCost(costId, userId){
    try{
        fetch(`https://financesdatabase.onrender.com/${userId}/deletecost/${costId}`, {
            method: "DELETE"
        }).then(response => console.log(response)).catch(e => console.error(e));
    }catch(e){
        console.error(e);
    }
}