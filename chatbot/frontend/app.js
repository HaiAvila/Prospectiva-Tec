const API = 'http://localhost:8000';

const messagesEl  = document.getElementById('messages');
const inputEl     = document.getElementById('user-input');
const sendBtn     = document.getElementById('send-btn');
const modelSelect = document.getElementById('model-select');
const hintModel   = document.getElementById('hint-model');
const newChatBtn  = document.getElementById('new-chat-btn');
const statusEl    = document.getElementById('status-indicator');
const welcomeEl   = document.getElementById('welcome');

let history   = [];
let streaming = false;

// ── Health ────────────────────────────────────────────────────────────────────
async function checkHealth() {
  try {
    const res  = await fetch(`${API}/api/health`);
    const data = await res.json();
    if (data.status === 'ok') {
      statusEl.className = 'status-indicator ok';
    } else throw new Error();
  } catch {
    statusEl.className = 'status-indicator err';
  }
}

// ── Models ────────────────────────────────────────────────────────────────────
async function loadModels() {
  try {
    const res      = await fetch(`${API}/api/models`);
    const { models } = await res.json();
    modelSelect.innerHTML = models
      .map(m => `<option value="${m}">${m}</option>`)
      .join('');
    syncModel();
  } catch { /* keep default */ }
}

function syncModel() {
  hintModel.textContent = modelSelect.value;
}
modelSelect.addEventListener('change', syncModel);

// ── Textarea auto-resize ──────────────────────────────────────────────────────
inputEl.addEventListener('input', () => {
  inputEl.style.height = 'auto';
  inputEl.style.height = Math.min(inputEl.scrollHeight, 160) + 'px';
  sendBtn.disabled = !inputEl.value.trim() || streaming;
});

inputEl.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (!sendBtn.disabled) sendMessage(); }
});

sendBtn.addEventListener('click', sendMessage);

// ── Chips ─────────────────────────────────────────────────────────────────────
document.querySelectorAll('.chip').forEach(c =>
  c.addEventListener('click', () => {
    inputEl.value = c.dataset.prompt;
    inputEl.dispatchEvent(new Event('input'));
    sendMessage();
  })
);

// ── New conversation ──────────────────────────────────────────────────────────
newChatBtn.addEventListener('click', () => {
  history = [];
  messagesEl.innerHTML = '';
  welcomeEl.style.display = '';
  messagesEl.appendChild(welcomeEl);
  inputEl.value = '';
  inputEl.style.height = 'auto';
  sendBtn.disabled = true;
});

// ── Render helpers ────────────────────────────────────────────────────────────
function md(text) {
  return marked.parse(text, { breaks: true, gfm: true });
}

function scrollBottom() {
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function addRow(role, html = '') {
  if (welcomeEl.parentNode) welcomeEl.style.display = 'none';

  const row    = document.createElement('div');
  row.className = `row ${role}`;

  const av     = document.createElement('div');
  av.className = 'av';
  av.textContent = role === 'user' ? 'Tú' : 'S';

  const bubble  = document.createElement('div');
  bubble.className = 'bubble';
  if (html) bubble.innerHTML = html;

  row.appendChild(av);
  row.appendChild(bubble);
  messagesEl.appendChild(row);
  scrollBottom();
  return bubble;
}

// ── Send ──────────────────────────────────────────────────────────────────────
async function sendMessage() {
  const text = inputEl.value.trim();
  if (!text || streaming) return;

  streaming = true;
  sendBtn.disabled = true;
  inputEl.value = '';
  inputEl.style.height = 'auto';

  history.push({ role: 'user', content: text });
  addRow('user', md(text));

  const bubble = addRow('assistant');
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  bubble.appendChild(cursor);
  scrollBottom();

  let accumulated = '';

  try {
    const res = await fetch(`${API}/api/conversation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history, model: modelSelect.value, stream: true }),
    });

    if (!res.ok) throw new Error(`Error del servidor (${res.status})`);

    const reader  = res.body.getReader();
    const decoder = new TextDecoder();
    let   buffer  = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const payload = line.slice(6).trim();
        if (payload === '[DONE]') continue;
        try {
          const { content, error } = JSON.parse(payload);
          if (error) throw new Error(error);
          if (content) {
            accumulated += content;
            bubble.innerHTML = md(accumulated);
            bubble.appendChild(cursor);
            scrollBottom();
          }
        } catch { /* skip malformed */ }
      }
    }
  } catch (err) {
    bubble.innerHTML = `<span style="color:#f87171;font-size:.9rem">${err.message}</span>`;
  } finally {
    cursor.remove();
    if (accumulated) {
      bubble.innerHTML = md(accumulated);
      history.push({ role: 'assistant', content: accumulated });
    }
    streaming = false;
    sendBtn.disabled = !inputEl.value.trim();
    scrollBottom();
  }
}

// ── Init ──────────────────────────────────────────────────────────────────────
checkHealth();
loadModels();
