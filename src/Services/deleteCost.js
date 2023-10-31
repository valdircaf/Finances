export function deleteCost(costId, userId, callback){
    try{
        fetch(`${process.env.REACT_APP_DATABASE_URL}${userId}/deletecost/${costId}`, {
            method: "DELETE"
        }).then(response => callback()).catch(e => console.error(e));
    }catch(e){
        console.error(e);
    }
}