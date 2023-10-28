export function deleteExpense(userId, expenseId){
    try{
        fetch(`http://localhost:8080/${userId}/deleteexpense/${expenseId}`, {
            method: "DELETE"
        }).then(response => console.log(response)).catch(e => console.error(e))
    }catch(e){
        console.error(e);
    }
}