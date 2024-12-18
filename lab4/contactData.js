const form = document.getElementById('contact-data');

//Обработчик отправки формы
form.addEventListener('submit', function(event) {
  event.preventDefault(); 

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!name || !email) {
    alert('Пожалуйста, заполните все обязательные поля.');
    return;
  }

  const namePattern = /^[A-Za-zА-Яа-яЁё]+$/;
  if (!namePattern.test(name)) {
    alert('Имя должно содержать только буквы!');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Пожалуйста, введите корректный адрес электронной почты.');
    return;
  }

  const data = {
    name: name,
    email: email
  };

  fetch('http://localhost:8000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Ошибка при отправке данных');
    }
    return response.json();
  })
  .then((responseData) => {
    console.log('Ответ сервера:', responseData);
    alert('Форма успешно отправлена');
  })
  .catch((error) => {
    console.error('Ошибка:', error);
    alert('Ошибка при отправке формы');
  });
});
