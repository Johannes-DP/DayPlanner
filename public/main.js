let src = document.getElementById("testing");
let text = document.createElement("p");
text.innerText = "Testing";
src.append(text);


let myLanguage = document.createElement("p");
let labelMyLanguage = document.createElement("label");
labelMyLanguage.append("My Language: ");
let select = document.createElement("select");
     
let quantity = [1,2,3,4,5];

for (let element of quantity){
    let option = document.createElement("option");
    option.setAttribute('value', element);
    option.append(element);
    select.append(option);
}
labelMyLanguage.append(select);
    
myLanguage.append(labelMyLanguage);
src.append(myLanguage);




/*let otherLanguage = document.createElement("p");
let labelOtherLanguage = document.createElement("label");
labelOtherLanguage.append("Other Language: ");
let selectOtherLanguage = document.createElement("select");
for (let element of quantity){
    let option = document.createElement("option");
    option.setAttribute('value', element);
    option.append(element);
    select.append(option);
}
label.append(selectOtherLanguage);
    
otherLanguage.append(labelOtherLanguage);
src.append(otherLanguage);*/

/*async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  postData('http://localhost:3000/translator/translate', { answer: 42 }) //parameter aus feld übergeben
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call //in feld einfügen
    });*/
