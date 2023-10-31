export function deleteCost(costId, userId){
    try{
        fetch(`${process.env.REACT_APP_DATABASE_URL}${userId}/deletecost/${costId}`, {
            method: "DELETE"
        }).then(response => console.log(response)).catch(e => console.error(e));
    }catch(e){
        console.error(e);
    }
}