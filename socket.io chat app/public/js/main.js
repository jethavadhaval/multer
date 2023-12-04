const socket = io();
const textBox = document.getElementById("chat-form");
const chatMsg = document.querySelector(".chat-messages");

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
console.log(" username, room: ", username, room);

socket.on("message", (msg) => {
  console.log("msg: ", msg);
  outputMsg(msg);
  chatMsg.scrollTop = chatMsg.scrollHeight;
});

textBox.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;
  socket.emit("chatMsg", msg);

  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

const outputMsg = (msg) => {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${msg.username} 
  <span>${msg.time}</span></p>
  <p class="text">${msg.text}</p>`;
  document.querySelector(".chat-messages").appendChild(div);
};
