const chatContainer = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatForm = document.getElementById('chat-form');
const typingIndicator = document.getElementById('typing-indicator');

function appendMessage(text, sender) {
    const bubble = document.createElement('div');
    bubble.classList.add('chat-bubble', sender === 'user' ? 'chat-user' : 'chat-bot');
    
    // Simple text handling
    const tempDiv = document.createElement('div');
    tempDiv.textContent = text;
    bubble.innerHTML = tempDiv.innerHTML.replaceAll('\n', '<br>');
    
    typingIndicator.before(bubble);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showTyping() {
    typingIndicator.style.display = 'block';
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function hideTyping() {
    typingIndicator.style.display = 'none';
}

async function fetchBotResponse(userMessage) {
    showTyping();
    try {
        const response = await fetch(CONFIG.ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CONFIG.API_KEY}`
            },
            body: JSON.stringify({
                model: CONFIG.MODEL,
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: userMessage }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });
        
        const data = await response.json();
        hideTyping();
        
        if (data.choices && data.choices.length > 0) {
            appendMessage(data.choices[0].message.content, 'bot');
        } else {
            appendMessage("Maaf, EcoBot sedang mengalami gangguan. Coba lagi nanti ya!", 'bot');
        }
    } catch (error) {
        console.error("Error:", error);
        hideTyping();
        appendMessage("Terjadi kesalahan koneksi. Pastikan internetmu lancar.", 'bot');
    }
}

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;
    
    appendMessage(message, 'user');
    chatInput.value = '';
    
    fetchBotResponse(message);
});

// For suggestion chips
document.querySelectorAll('.suggestion-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        const message = chip.textContent.trim();
        appendMessage(message, 'user');
        fetchBotResponse(message);
    });
});
