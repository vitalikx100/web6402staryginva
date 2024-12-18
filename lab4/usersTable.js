const URL = 'http://localhost:8000/users';

//Функция для загрузки данных с сервера
async function usersTable() {
  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    const users = await response.json();

    if (users.length === 0) {
      throw new Error('Отсутствуют данные');
    }

    const table = document.querySelector('#users-table tbody');
    table.innerHTML = '';

    users.forEach(user => {
      const row = document.createElement('tr');
      const nameCell = document.createElement('td');
      const emailCell = document.createElement('td');

      nameCell.textContent = user.name;
      emailCell.textContent = user.email;

      row.appendChild(nameCell);
      row.appendChild(emailCell);
      table.appendChild(row);
    });
  } catch (error) {
    alert(`Ошибка: ${error.message}`);
  }
}

document.addEventListener('DOMContentLoaded', usersTable);
