const email = window.sessionStorage.getItem('email');

const anker = document.getElementById('email');
anker.setAttribute('value', email);

const change = document.getElementById('change');

change.addEventListener('click', () => {
  const changedEmail = document.getElementById('changedEmail').value;
  fetch('/api/user/changeLite', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      changedEmail,
    }),
  })
  .then(res=>res.json())
  .then(window.sessionStorage.setItem("email",changedEmail))
  .catch(err=>console.log(err))
  .then(anker.value = changedEmail)
  .then(document.getElementById("changedEmail").value = "")
});

const del = document.getElementById('deleteLite');
del.addEventListener('click', () => {
  fetch(`/api/user/delete/${email}`, {
    method: 'DELETE',
  })
    .then(res=>res.json())
    .catch(err=>console.log(err))
    .then(() => window.location.href="/")
});


let changePw = document.getElementById("passwordChange");
changePw.addEventListener("click",()=>{
    let oldPassword = document.getElementById("password").value;
    let newPassword = document.getElementById("newPassword").value;
    fetch("/api/user/passwordlite",{
        method:"PATCH",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "email": email,
            "oldPassword": oldPassword,
            "newPassword": newPassword
        })
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
    .then(() => {
        document.getElementById("password").value = "";
        document.getElementById("newPassword").value = "";
    });
})