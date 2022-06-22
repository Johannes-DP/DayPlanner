const src = document.getElementById('content_start');

const form = document.createElement('form');
form.setAttribute('onsubmit', 'translation(event)');

const myLanguage = document.createElement('p');
const labelMyLanguage = document.createElement('label');
labelMyLanguage.append('My Language: ');
const selectMyLanguage = document.createElement('select');
selectMyLanguage.setAttribute('id', 'selectMyLanguage');

const otherLanguage = document.createElement('p');
const labelOtherLanguage = document.createElement('label');
labelOtherLanguage.append('Other Language: ');
const selectOtherLanguage = document.createElement('select');
selectOtherLanguage.setAttribute('id', 'selectOtherLanguage');

fetch('http://localhost:3000/api/translator/getLanguages')
  .then((res) => res.json())
  .then((data) => data.languages)
  .then((languages) => {
    for (const language of languages) {
      const option = document.createElement('option');
      option.setAttribute('value', language.code);
      option.innerText = language.name;

      const option2 = document.createElement('option');
      option2.setAttribute('value', language.code);
      option2.innerText = language.name;

      selectMyLanguage.append(option);
      selectOtherLanguage.append(option2);
    }
  });

// append select to form
labelMyLanguage.append(selectMyLanguage);
myLanguage.append(labelMyLanguage);
form.append(myLanguage);

// append select to form
labelOtherLanguage.append(selectOtherLanguage);
otherLanguage.append(labelOtherLanguage);
form.append(otherLanguage);

const div1 = document.createElement('div');
const textarea1 = document.createElement('textarea');

div1.setAttribute('class', 'inline-div');
textarea1.setAttribute('id', 'myText');
textarea1.setAttribute('rows', 5);
textarea1.setAttribute('class', 'inline-txtarea');
textarea1.setAttribute('placeholder', 'Enter your text here');
div1.append(textarea1);
form.append(div1);

const div2 = document.createElement('div');
const textarea2 = document.createElement('textarea');

div2.setAttribute('class', 'inline-div');
textarea2.setAttribute('id', 'translatedText');
textarea2.setAttribute('rows', 5);
textarea2.setAttribute('class', 'inline-txtarea');
textarea2.setAttribute('readonly', 'true');
div2.append(textarea2);
form.append(div2);

const submitButton = document.createElement('input');
submitButton.setAttribute('type', 'submit');
submitButton.setAttribute('value', 'Translate');
submitButton.classList.add('btn', 'btn-primary');
const test = document.createElement('p');

form.append(test);
form.append(submitButton);

function translation(event) {
  event.preventDefault();
  const translationText = document.getElementById('myText');
  const myLang = document.getElementById('selectMyLanguage');
  const otherLang = document.getElementById('selectOtherLanguage');

  const translationField = document.getElementById('translatedText');

  if (myLang.value == otherLang.value) {
    translationField.value += 'Please use different languages!';
    return;
  }
  const translationjson = JSON.stringify({ sourceLanguage: myLang.value, targetLanguage: otherLang.value, text: translationText.value });

  (async () => {
    const rawResponse = await fetch('http://localhost:3000/api/translator/translate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: translationjson,
    });
    const content = await rawResponse.json();
    translationField.value = '';
    translationField.value += content.data.translatedText;
  })();
}

src.append(form);
