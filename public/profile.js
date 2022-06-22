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
    .then(window.sessionStorage.setItem('email', changedEmail))
    .catch((err) => console.log(err))
    .then(anker.value = changedEmail)
    .then(document.getElementById('changedEmail').value = '');
});

const del = document.getElementById('delete');
del.addEventListener('click', () => {
  fetch(`/api/user/delete/${email}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
    .then(() => window.location.href = '/');
});

const changePw = document.getElementById('passwordChange');
changePw.addEventListener('click', () => {
  const oldPassword = document.getElementById('password').value;
  const newPassword = document.getElementById('newPassword').value;
  fetch('/api/user/password', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      oldPassword,
      newPassword,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
    .then(() => {
      document.getElementById('password').value = '';
      document.getElementById('newPassword').value = '';
    });
});
