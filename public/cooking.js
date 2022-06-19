let src = document.getElementById('content_start');


let form = document.createElement("form");
form.setAttribute('onsubmit', "getRecipes(event)");

let div = document.createElement("div");
let textarea = document.createElement("textarea");
textarea.setAttribute('id', "dish");
textarea.setAttribute('placeholder', "Search for a dish");



let submitButton = document.createElement("input");
submitButton.classList.add("btn","btn-outline-primary")
submitButton.setAttribute('type', "submit");
submitButton.setAttribute('value', "Search");

div.append(textarea)
form.append(div);
form.append(submitButton)

src.append(form);

let divAccordeon = document.getElementById("recipeAccordion");

function createAccordion(index, recipe){
    let divItem = document.createElement("div");
    divItem.setAttribute('class', "accordion-item");
    let h2 = document.createElement("h2");
    h2.setAttribute('class', "accordion-header");
    h2.setAttribute('id', "heading"+ index);
    let button = document.createElement("button")
    button.setAttribute('class',"accordion-button");
    button.setAttribute("type", "button");
    button.setAttribute("data-bs-toggle", "collapse")
    button.setAttribute("data-bs-target", "#collapse"+ index)
    button.setAttribute("aria-expanded", "true");
    button.setAttribute("aria-controls", "collapse"+ index);
     button.innerText = recipe.name;
     let divText = document.createElement("div");
     divText.setAttribute("id", "collapse"+ index); 
     divText.setAttribute("class", "accordion-collapse collapse hide");
     divText.setAttribute("aria-labelledby", "heading"+ index);
     divText.setAttribute("data-bs-parent", "#recipeAccordion");
    
     let divBody = document.createElement("div");
     divBody.setAttribute('class', "accordion-body");
     //divBody.innerText = "Hallo"
    const keysToIgnore = ["name", "tags", "image"];
    const specialFields = ["nutrients", "time"] ;
    const arrayFields = ["ingredients", "instructions"]
    Object.entries(recipe).forEach(([key, value]) => {
        
        if (!keysToIgnore.includes(key)){
            let heading = document.createElement("h3");
            heading.innerText = key;
            let p = document.createElement("p");
            
            if(specialFields.includes(key)){
                
                Object.entries(value).forEach(([key, value]) => {
                    p.innerHTML += `<b>${key}</b>: ${value}` + "<br/>";

                });

            
        }   else if(arrayFields.includes(key)) {
                value = value.join("<br/>")
                p.innerHTML = value;
        }   else {
                p.innerHTML = value;
            }

            divBody.append(heading);
            divBody.append(p);
        }
     })
     h2.append(button);
     divText.append(divBody);
     divItem.append(h2);
     divItem.append(divText);
     divAccordeon.append(divItem);
}

function getRecipes(event) {
    event.preventDefault();
    let dish = document.getElementById("dish");


    
   
    //let translationField = document.getElementById("translatedText");

    let recipeJson = JSON.stringify({dish: dish.value});
  
    (async () => {
      const rawResponse = await fetch('http://localhost:3000/recipe/getRecipes', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: recipeJson
      });
      const content = await rawResponse.json();
      content.data.forEach((recipe,i) => createAccordion(i,recipe));
    })();
  }; 



