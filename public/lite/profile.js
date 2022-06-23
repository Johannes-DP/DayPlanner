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
  }).then( async (res) => {
    const data = await res.json();
    if (!res.ok) {
      throw Error(data.message);
    } else {
      window.sessionStorage.setItem('email', changedEmail)
      anker.value = changedEmail
      window.location.href = '/lite/profile'
      return data;
    }
  })
  .catch((err) => {
    alert(err)
    console.error(err)
  })
});

const del = document.getElementById('delete');
del.addEventListener('click', () => {
  fetch(`/api/user/delete/${email}`, {
    method: 'DELETE',
  }).then( async (res) => {
    const data = await res.json();
    if (!res.ok) {
      throw Error(data.message);
    } else {
      window.location.href = '/'
      return data;
    }
  })
  .catch((err) => {
    alert(err)
    console.error(err)
  })
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
  }).then( async (res) => {
    const data = await res.json();
    if (!res.ok) {
      throw Error(data.message);
    } else {
      return data;
    }
    })
    .catch((err) => {
      alert(err)
      console.error(err)
    })
    .then(() => {
      document.getElementById('password').value = '';
      document.getElementById('newPassword').value = '';
    });
});
