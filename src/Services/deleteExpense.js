export function deleteExpense(userId, expenseId, callback){
    try{
        fetch(`${process.env.REACT_APP_DATABASE_URL}${userId}/deleteexpense/${expenseId}`, {
            method: "DELETE"
        }).then(response => callback()).catch(e => console.error(e))
    }catch(e){
        console.error(e);
    }
}