const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

// Maintain the conversation history for context-aware replies
let conversation = [];

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Add user message to UI and history
  appendMessage('user', userMessage);
  conversation.push({ role: 'user', text: userMessage });
  input.value = '';

  // Show a temporary "Thinking..." message and keep a reference to its element
  const thinkingMessage = appendMessage('model', 'Thinking...');

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversation })
    });

    const data = await response.json();

    if (response.ok && data.result) {
      // Replace "Thinking..." with the actual AI response
      thinkingMessage.textContent = data.result;
      conversation.push({ role: 'model', text: data.result });
    } else {
      thinkingMessage.textContent = 'Sorry, no response received.';
    }
  } catch (error) {
    thinkingMessage.textContent = 'Failed to get response from server.';
    console.error('Chat error:', error);
  }
});

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg;
}
