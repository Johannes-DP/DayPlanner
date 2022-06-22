const src = document.getElementById('content_start');

const form = document.createElement('form');
form.setAttribute('onsubmit', 'getRecipes(event)');

const div = document.createElement('div');
const textarea = document.createElement('textarea');
textarea.setAttribute('id', 'dish');
textarea.setAttribute('placeholder', 'Search for a dish');

const submitButton = document.createElement('input');
submitButton.classList.add('btn', 'btn-outline-primary');
submitButton.setAttribute('type', 'submit');
submitButton.setAttribute('value', 'Search');

div.append(textarea);
form.append(div);
form.append(submitButton);

src.append(form);

const divAccordeon = document.getElementById('recipeAccordion');

function createAccordion(index, recipe) {
  const divItem = document.createElement('div');
  divItem.setAttribute('class', 'accordion-item');
  const h2 = document.createElement('h2');
  h2.setAttribute('class', 'accordion-header');
  h2.setAttribute('id', `heading${index}`);
  const button = document.createElement('button');
  button.setAttribute('class', 'accordion-button');
  button.setAttribute('type', 'button');
  button.setAttribute('data-bs-toggle', 'collapse');
  button.setAttribute('data-bs-target', `#collapse${index}`);
  button.setAttribute('aria-expanded', 'true');
  button.setAttribute('aria-controls', `collapse${index}`);
  button.innerText = recipe.name;
  const divText = document.createElement('div');
  divText.setAttribute('id', `collapse${index}`);
  divText.setAttribute('class', 'accordion-collapse collapse hide');
  divText.setAttribute('aria-labelledby', `heading${index}`);
  divText.setAttribute('data-bs-parent', '#recipeAccordion');

  const divBody = document.createElement('div');
  divBody.setAttribute('class', 'accordion-body');
  const keysToIgnore = ['name', 'tags', 'image'];
  const specialFields = ['nutrients', 'time'];
  const arrayFields = ['ingredients', 'instructions'];
  Object.entries(recipe).forEach(([key, value]) => {
    if (!keysToIgnore.includes(key)) {
      const heading = document.createElement('h3');
      heading.innerText = key;
      const p = document.createElement('p');

      if (specialFields.includes(key)) {
        Object.entries(value).forEach(([key, value]) => {
          p.innerHTML += `<b>${key}</b>: ${value}` + '<br/>';
        });
      } else if (arrayFields.includes(key)) {
        value = value.join('<br/>');
        p.innerHTML = value;
      } else {
        p.innerHTML = value;
      }

      divBody.append(heading);
      divBody.append(p);
    }
  });
  h2.append(button);
  divText.append(divBody);
  divItem.append(h2);
  divItem.append(divText);
  divAccordeon.append(divItem);
}

function getRecipes(event) {
  event.preventDefault();
  const dish = document.getElementById('dish');

  const recipeJson = JSON.stringify({ dish: dish.value });

  (async () => {
    const rawResponse = await fetch('http://localhost:3000/api/recipe/getRecipes', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: recipeJson,
    });
    const content = await rawResponse.json();
    content.data.forEach((recipe, i) => createAccordion(i, recipe));
  })();
}
