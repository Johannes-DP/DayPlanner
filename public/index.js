let button = document.getElementById("Join");
let change = document.getElementById("replace");

button.addEventListener("click", () =>{
        
            change.innerHTML ="";


            let form = document.createElement("form");
            form.setAttribute("action","api/user/signup");
            form.setAttribute("onsubmit" ,"storeEmail()");
            form.setAttribute("method","post");

            form.innerHTML = 
                "<h2>Registration</h2>" +
                "<p class = form-control><lable for=email>E-Mail-Adresse: </lable>" +  
                "<input type='text' placeholder='max.mustermann@email.com' id='email' name='email' required ></" + 
                "<br><p class = form-control><lable for=password>Passwort: </lable>"+
                "<input value type='password' id='password' name='password' required>"+
                "<i class='bi bi-eye-slash' id='togglePassword'></i></p>" +
                "<button type='reset' value='reset' >Löschen</button>" +
                "<button type='submit'>Bestätigen</button>";   

change.append(form);

showPassword();
});


let login = document.getElementById("link");
link.addEventListener("click", () =>{

            change.innerHTML ="";

            let form = document.createElement("form");
            form.setAttribute("action","api/user/login");
            form.setAttribute("onsubmit" ,"storeEmail()");
            form.setAttribute("method","post");

            form.innerHTML =
            "<h2> <b> Einloggen </b> </h2>" + 
            "<p class = form-control><lable for=email>Email: </lable>" +
            "<input type='text' id='email' name='email'  required></p>" +
            "<p class = form-control><lable for=password>Passwort: </lable>" +
            "<input type='password' id='password' name='password' required>" +
            "<i class='bi bi-eye-slash' id='togglePassword'></i></p>" +
            "<button type='submit' value='submit' name='login'>Absenden</button>";

            change.append(form);

            showPassword();
}) 

function showPassword(){
    var togglePassword = document.querySelector("#togglePassword");
    var password = document.querySelector("#password");


            togglePassword.addEventListener("click", function() {
                const type = password.getAttribute("type") === "password" ? "text" : "password";
                password.setAttribute("type",type);
                this.classList.toggle("bi-eye");
            });   
}

function storeEmail(){

var email = document.getElementById("email").value;
console.log(email);
sessionStorage.setItem("email",email);
}
