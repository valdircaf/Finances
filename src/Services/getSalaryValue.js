export function getSalaryValue(id){
    try{
        fetch(`https://financesdatabase.onrender.com/users/${id}`, {
            method: "GET"
        }).then(response => response.json()).then(data => {
            console.log(data.salary);
        }).catch(e => console.error(e));
    }catch(e){
        console.error(e);
    }
}