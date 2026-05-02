const chatBox = document.getElementById('chat-box');
const input = document.getElementById('user-input');
const form = document.getElementById('chat-form');
const sendBtn = document.getElementById('send-btn');
const emojiBtn = document.getElementById('emoji-btn');
const picker = document.getElementById('emoji-picker');
const toggleTheme = document.getElementById('toggle-theme');

let conversation = [];

/* SEND MESSAGE */
function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage('user', text);
  conversation.push({ role: 'user', text });

  input.value = '';

  const thinking = addMessage('bot', 'Typing...');

  fetch('/api/chat', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ conversation })
  })
  .then(res => res.json())
  .then(data => {
    const reply = data.result || 'No response';
    typeEffect(thinking, reply);
    conversation.push({ role: 'model', text: reply });
  })
  .catch(() => {
    thinking.textContent = 'Error server';
  });
}

/* EVENT */
form.addEventListener('submit', e => {
  e.preventDefault();
  sendMessage();
});

sendBtn.onclick = sendMessage;

/* ENTER = SEND */
input.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
  }
});

/* ADD MESSAGE */
function addMessage(role, text) {
  const row = document.createElement('div');
  row.className = `message-row ${role === 'user' ? 'user-row' : ''}`;

  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = role === 'user' ? '🧑' : '🤖';

  const msg = document.createElement('div');
  msg.className = `message ${role === 'user' ? 'user' : 'bot'}`;

  // Markdown render
  msg.innerHTML = marked.parse(text);

  if (role === 'user') {
    row.appendChild(msg);
    row.appendChild(avatar);
  } else {
    row.appendChild(avatar);
    row.appendChild(msg);
  }

  chatBox.appendChild(row);
  scrollBottom();

  return msg;
}

/* AUTO RESIZE TEXTAREA */
input.addEventListener('input', () => {
  input.style.height = 'auto';
  input.style.height = input.scrollHeight + 'px';
});

input.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});


/* AUTO SCROLL */
function scrollBottom() {
  chatBox.scrollTo({
    top: chatBox.scrollHeight,
    behavior: 'smooth'
  });
}

/* TYPING EFFECT */
function typeEffect(el, text) {
  let i = 0;
  el.innerHTML = '';

  const interval = setInterval(() => {
    el.innerHTML = marked.parse(text.slice(0, i));
    i++;
    scrollBottom();

    if (i > text.length) clearInterval(interval);
  }, 15);
}

/* EMOJI */
emojiBtn.onclick = () => {
  picker.style.display = picker.style.display === 'none' ? 'block' : 'none';
};

picker.addEventListener('emoji-click', e => {
  input.value += e.detail.unicode;
});

/* DARK MODE */
toggleTheme.onclick = () => {
  document.body.classList.toggle('dark');
};