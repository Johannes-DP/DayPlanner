let button = document.getElementById("Join");
let change = document.getElementById("replace");

button.addEventListener("click", () =>{
        
            change.innerHTML ="";

            let form = document.createElement("form");
            form.setAttribute("action","api/user/signup");
            form.setAttribute("method","post");

            form.innerHTML = 
                "<h2>Registration</h2>" +
                "<lable for=email>E-Mail-Adresse: </lable>" +  
                "<input type='text' placeholder='max.mustermann@email.com' class = 'form-control' id='email' name='email' required >" + 
                "<lable for=password>Passwort: </lable>" +
                "<input type='password' placeholder='' class = 'form-control' id='password' name='password' required>" +
                /*"<lable for=passwortbest>Passwort-Bestätigung: </lable>" +
                "<input type='password' placeholder='' class = 'form-control' id='passwortbest' name='passwortbest' required>" +*/
                "<button type='reset' value='reset' >Löschen</button>" +
                "<button type='submit'>Absenden</button>";       
change.append(form);
});


let login = document.getElementById("link");
link.addEventListener("click", () =>{

            change.innerHTML ="";

            let form = document.createElement("form");
            form.setAttribute("action","api/user/login");
            form.setAttribute("method","post");

            form.innerHTML =
            "<h2> <b> Einloggen </b> </h2>" + 
            "<lable for=email>Email: </lable>" +
            "<input type='text'  class = 'form-control' id='email' name='email'  required>" +
            "<lable for=password>Passwort: </lable>" +
            "<input type='password' class = 'form-control' id='password' name='password' required>" +
            "<button type='submit' value='submit' name='login'>Absenden</button>";

            change.append(form);
})


    
