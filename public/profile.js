const email = window.sessionStorage.getItem('email');

const anker = document.getElementById('email');
anker.setAttribute('value', email);

const change = document.getElementById('change');

const info = document.getElementsByClassName('info')[0];
const createAlert = (message, duration) => {
  const alert = document.createElement('div');
  
  alert.classList.add('alert', 'alert-danger');
  alert.setAttribute('role', 'alert');
  alert.innerText = message;

  info.prepend(alert)
  setTimeout(() => {
    alert.remove();
  }, duration);
};

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
        window.location.href = '/profile'
        return data;
      }
    })
    .catch((err) => {
      createAlert(err.message, 3500);
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
    createAlert(err.message, 3500);
    console.error(err)
  })
});

const changePw = document.getElementById('passwordChange');
changePw.addEventListener('click', () => {
  const oldPassword = document.getElementById('password').value;
  const newPassword = document.getElementById('newPassword').value;
  const email = document.getElementById('email').value;
  fetch('/api/user/password', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      oldPassword,
      newPassword,
    }),
  })
  .then( async (res) => {
    const data = await res.json();
    if (!res.ok) {
      throw Error(data.message);
    } else {
      window.location.href = '/profile'
      return data;
    }
  })
  .catch((err) => {
    createAlert(err.message, 3500);
    console.error(err)
  }).then(() => {
      document.getElementById('password').value = '';
      document.getElementById('newPassword').value = '';
    });
});
