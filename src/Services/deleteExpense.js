export function deleteExpense(userId, expenseId){
    try{
        fetch(`https://financesdatabase.onrender.com/${userId}/deleteexpense/${expenseId}`, {
            method: "DELETE"
        }).then(response => console.log(response)).catch(e => console.error(e))
    }catch(e){
        console.error(e);
    }
}