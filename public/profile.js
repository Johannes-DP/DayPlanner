const email = window.sessionStorage.getItem('email');

const anker = document.getElementById('email');
anker.setAttribute('value', email);

const change = document.getElementById('change');

change.addEventListener('click', () => {
  const changedEmail = document.getElementById('changedEmail').value;
  fetch('/api/user/change', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      changedEmail,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .then(window.sessionStorage.setItem('email', changedEmail))
    .catch((err) => console.log(err));
});

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
 
let changePw = document.getElementById("passwordChange");
changePw.addEventListener("click",()=>{
    let oldPassword = document.getElementById("password").value;
    let newPassword = document.getElementById("newPassword").value;
    fetch("/api/user/password",{
        method:"PATCH",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "email": email,
            "oldPassword": oldPassword,
            "newPassword": newPassword
        })
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
})
