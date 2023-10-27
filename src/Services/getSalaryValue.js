export function getSalaryValue(id){
    try{
        fetch(`http://localhost:8080/users/${id}`, {
            method: "GET"
        }).then(response => response.json()).then(data => {
            console.log(data.salary);
        }).catch(e => console.error(e));
    }catch(e){
        console.error(e);
    }
}