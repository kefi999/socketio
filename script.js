const socket = io("http://localhost:3000");

const messageContainer = document.getElementById("message-container");
const sendContainer = document.getElementById("send-container");
const inputMessage = document.getElementById("input-message");
const submitButton = document.getElementById("submit-button");

const nameJoined = prompt("What's your name?");
if (nameJoined != null) {
  appendMessage("You Joined");
  socket.emit("joined-name", nameJoined);
}

socket.on("user-connected", (newUser) => {
  appendMessage(`${newUser} connected`);
});

socket.on("chat-message", (message) => {
  appendMessage(`${message.joinedUser}:${message.message}`);
});
sendContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputMessage.value) {
    appendMessage(inputMessage.value);
    socket.emit("input-message", inputMessage.value);
    inputMessage.value = "";
  }
});

function appendMessage(message) {
  const newMessage = document.createElement("div");
  newMessage.innerText = message;
  messageContainer.append(newMessage);
}
