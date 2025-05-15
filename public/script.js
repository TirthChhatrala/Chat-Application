const socket = io();

// Elements
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const toggleBtn = document.getElementById('toggle-btn');
const body = document.body;

// Send message on form submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value.trim() !== '') {
    socket.emit('chat message', input.value.trim());
    input.value = '';
  }
});

// Receive message from server
socket.on('chat message', (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight; // scroll to bottom
});

// Toggle dark/light mode
toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  if (body.classList.contains('dark')) {
    toggleBtn.textContent = 'Light Mode';
  } else {
    toggleBtn.textContent = 'Dark Mode';
  }
});
