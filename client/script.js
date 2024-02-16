// import { io } from 'socket.io-client'; // bring this in from the CDN in the html file

const joinRoomBtn = document.getElementById('room-button');
const messageInput = document.getElementById('message-input');
const roomInput = document.getElementById('room-input');
const form = document.getElementById('form');

const socket = io('http://localhost:3000'); 

socket.on('connect', () => {
  displayMessage(`You are connected with id ${socket.id}`);
});

socket.on('receive-message', message => {
  displayMessage(message);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const room = roomInput.value;
  
  if (message == '') {
    return;
  }

  displayMessage(message);
  socket.emit('send-message', message, room);

  messageInput.value = '';

});

joinRoomBtn.addEventListener('click', () => {
  const room = roomInput.value;
  socket.emit('join-room', room);
});

function displayMessage(message) {
  const div = document.createElement('div');
  div.textContent = message;
  document.getElementById('message-container').appendChild(div);
}
