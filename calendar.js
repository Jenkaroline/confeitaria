// Seletores
const calendarBody = document.getElementById('calendarBody');
const monthYear = document.getElementById('monthYear');
const prevMonth = document.getElementById('prevMonth');
const nextMonth = document.getElementById('nextMonth');

// Modal
const eventModal = document.getElementById('eventModal');
const selectedDateElement = document.getElementById('selectedDate');
const eventInput = document.getElementById('eventInput');
const saveEvent = document.getElementById('saveEvent');
const closeModal = document.getElementById('closeModal');

// Data inicial
let currentDate = new Date();
let events = {}; // Armazena eventos: { "YYYY-MM-DD": ["Evento 1", "Evento 2"] }

// Função para renderizar o calendário
function renderCalendar() {
  // Limpa o corpo do calendário
  calendarBody.innerHTML = '';

  // Obtém o mês e o ano atual
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  // Atualiza o título do calendário
  monthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

  // Primeiro dia do mês
  const firstDay = new Date(year, month, 1).getDay();

  // Último dia do mês
  const lastDate = new Date(year, month + 1, 0).getDate();

  // Criação das linhas e colunas
  let row = document.createElement('tr');
  for (let i = 0; i < firstDay; i++) {
    row.appendChild(document.createElement('td')); // Espaços vazios
  }

  // Preenche os dias do mês
  for (let day = 1; day <= lastDate; day++) {
    const cell = document.createElement('td');
    cell.textContent = day;

    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    // Destaca o dia atual
    if (
      day === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
    ) {
      cell.classList.add('today');
    }

    // Adiciona evento ao clicar no dia
    cell.addEventListener('click', () => openModal(dateKey));

    // Exibe eventos no calendário
    if (events[dateKey]) {
      const eventList = document.createElement('ul');
      events[dateKey].forEach((event) => {
        const listItem = document.createElement('li');
        listItem.textContent = event;
        listItem.style.fontSize = '12px'; // Estilização para eventos
        eventList.appendChild(listItem);
      });
      cell.appendChild(eventList);
    }

    row.appendChild(cell);

    // Inicia uma nova linha ao final da semana
    if ((firstDay + day) % 7 === 0) {
      calendarBody.appendChild(row);
      row = document.createElement('tr');
    }
  }

  // Adiciona a última linha
  calendarBody.appendChild(row);
}

// Navegação entre meses
prevMonth.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonth.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// Abre o modal para adicionar evento
function openModal(dateKey) {
  selectedDateElement.textContent = `Data: ${dateKey}`;
  eventInput.value = ''; // Limpa o input
  eventModal.style.display = 'flex';

  // Salvar evento
  saveEvent.onclick = () => {
    const eventText = eventInput.value.trim();
    if (eventText) {
      if (!events[dateKey]) {
        events[dateKey] = [];
      }
      events[dateKey].push(eventText);
      renderCalendar(); // Atualiza o calendário com o novo evento
      closeModalHandler();
    }
  };
}

// Fecha o modal
function closeModalHandler() {
  eventModal.style.display = 'none';
}

closeModal.addEventListener('click', closeModalHandler);

// Renderiza o calendário ao carregar a página
renderCalendar();
