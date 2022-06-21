
let email = window.sessionStorage.getItem("email");

let anker = document.getElementById("email");
anker.setAttribute("value",email);

let change = document.getElementById("change");

change.addEventListener("click",()=>{
let changedEmail = document.getElementById("changedEmail").value;
    fetch("/api/user/change",{
        method:"PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "email": email,
            "changedEmail": changedEmail      
        })  
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
    .then(window.sessionStorage.setItem("email",changedEmail))
    .catch(err=>console.log(err))
    
})


let del = document.getElementById("delete");
del.addEventListener("click",() =>{
    console.log("irgendwas");
    fetch("/api/user/delete/" + email,{
        method: "DELETE",
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
    .then(window.location.href="/")
})
 