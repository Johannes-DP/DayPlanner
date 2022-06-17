let button = document.getElementById("Join");
let change = document.getElementById("replace");

button.addEventListener("click", () =>{
        
            change.innerHTML ="";

            let form = document.createElement("form");

            form.innerHTML = 
                "<h2>Registration</h2>" +
                "<lable for=username>Username:</lable>" +
                "<input type='text' placeholder='' class = 'form-control' id='username' name='username'  required>" +
                "<lable for=passwort>Passwort: </lable>" +
                "<input type='password' placeholder='' class = 'form-control' id='passwort' name='passwort' required>" +
                "<lable for=passwortbest>Passwort-Bestätigung: </lable>" +
                "<input type='password' placeholder='' class = 'form-control' id='passwortbest' name='passwortbest' required>" +
                "<lable for=email>E-Mail-Adresse: </lable>" +
                "<input type='text' placeholder='max.mustermann@email.com' class = 'form-control' id='email' name='email' required >" +
                "<button type='reset' value='reset' >Löschen</button>" +
                "<input type='hidden' name='action' value='benutzerErstellen'></input>" +
                "<button type='submit' value='submit' name='submit'>Absenden</button>";       
change.append(form);
});


let login = document.getElementById("link");
link.addEventListener("click", () =>{

            change.innerHTML ="";

            let form = document.createElement("form");

            form.innerHTML =
            "<h2> <b> Einloggen </b> </h2>" + 
            "<lable for=username>Username: </lable>" +
            "<input type='text' placeholer='' class = 'form-control' id='username' name='username'  required>" +
            "<lable for=passwort>Passwort: </lable>" +
            "<input type='password' placeholer='' class = 'form-control' id='passwort' name='passwort' required>" +
            "<button type='submit' value='submit' name='login'>Absenden</button>";

            change.append(form);
})


    
