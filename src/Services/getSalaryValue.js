export function getSalaryValue(id){
    try{
        fetch(`${process.env.REACT_APP_DATABASE_URL}users/${id}`, {
            method: "GET"
        }).then(response => response.json()).then(data => {
            console.log(data.salary);
        }).catch(e => console.error(e));
    }catch(e){
        console.error(e);
    }
}