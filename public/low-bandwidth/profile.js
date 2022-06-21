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

const del = document.getElementById('delete');
del.addEventListener('click', () => {
  console.log('irgendwas');
  fetch(`/api/user/delete/${email}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err))
    .then(window.location.href = '/');
});
