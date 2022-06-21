let email = window.sessionStorage.getItem("email");

let anker = document.getElementById("email");
anker.setAttribute("value",email);


let del = document.getElementById("delete");
del.setAttribute("method","post");
del.setAttribute("action","api/user/delete")