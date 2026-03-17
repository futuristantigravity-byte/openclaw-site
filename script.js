window.addEventListener('scroll', () => { const e = document.getElementById('sp'), h = document.documentElement.scrollHeight - window.innerHeight; e.style.width = h > 0 ? (window.scrollY / h) * 100 + '%' : '0' }, { passive: !0 });
const obs = new IntersectionObserver(e => { e.forEach(e => { if (e.isIntersecting) e.target.classList.add('v') }) }, { threshold: .06, rootMargin: '0px 0px -20px 0px' });
document.querySelectorAll('.rv').forEach(e => obs.observe(e));
const cobs = new IntersectionObserver(e => { e.forEach(e => { if (e.isIntersecting) { const el = e.target, end = parseInt(el.dataset.count); if (!end || el.dataset.done) return; el.dataset.done = '1'; let s = 0; const dur = 1200, step = Math.ceil(dur / 60), inc = end / step; const t = setInterval(() => { s += inc; if (s >= end) { el.textContent = end + '+'; clearInterval(t) } else { el.textContent = Math.floor(s) + '+' } }, dur / step) } }) }, { threshold: .5 });
document.querySelectorAll('[data-count]').forEach(e => cobs.observe(e));
function switchTab(n) { document.querySelectorAll('.tab-btn').forEach((b, i) => b.classList.toggle('active', i === n)); document.querySelectorAll('.tab-panel').forEach((p, i) => p.classList.toggle('active', i === n)) }
function tA(h) { const i = h.parentElement, b = h.nextElementSibling, o = i.classList.contains('open'); document.querySelectorAll('.ai').forEach(x => { x.classList.remove('open'); x.querySelector('.ab').style.maxHeight = '0' }); if (!o) { i.classList.add('open'); b.style.maxHeight = b.scrollHeight + 'px' } }
document.querySelectorAll('a[href^="#"]').forEach(a => { a.addEventListener('click', e => { e.preventDefault(); const t = document.querySelector(a.getAttribute('href')); t && t.scrollIntoView({ behavior: 'smooth', block: 'start' }) }) });
const fcta = document.getElementById('fcta');
const svid = document.getElementById('scroll-video');
window.addEventListener('scroll', () => {
  fcta.classList.toggle('show', window.scrollY > 600);
  if (svid && svid.duration) {
    const parent = svid.parentElement.parentElement;
    const rect = parent.getBoundingClientRect();
    const scrollProgress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
    // Add a slight smoothing effect or just map directly
    svid.currentTime = scrollProgress * svid.duration;
  }
}, { passive: !0 });
const ns = document.createElement('style'); ns.textContent = '@media(min-width:769px){#nav-links{display:flex!important}}'; document.head.appendChild(ns);
const getUTMs = () => { const p = new URLSearchParams(location.search), u = {};['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(k => { if (p.get(k)) u[k] = p.get(k) }); return u };
document.getElementById('fm').addEventListener('submit', async e => {
  e.preventDefault(); const f = e.target, hp = f.querySelector('input[name="hp"]'); if (hp && hp.value) return;
  const b = f.querySelector('button[type="submit"]'), orig = b.innerHTML;
  b.innerHTML = '<span>Отправка...</span>'; b.disabled = !0;
  const d = {}; f.querySelectorAll('input,textarea').forEach(e => { if (e.name && e.value && e.name !== 'hp') d[e.name] = e.value });
  const utms = getUTMs(); const payload = { ...d, ...utms, page_url: location.href, project: 'OpenClaw — Futurist' };
  const TG = 'YOUR_BOT_TOKEN', CH = 'YOUR_CHAT_ID';
  let m = '<b>OpenClaw Lead</b>\n\n'; for (const [k, v] of Object.entries(d)) m += `<b>${k}:</b> ${v}\n`;
  m += `\n<b>URL:</b> ${location.href}\n`;
  if (Object.keys(utms).length > 0) { m += '\n<b>UTM:</b>\n'; for (const [k, v] of Object.entries(utms)) m += `${k}: ${v}\n` }
  try {
    await Promise.all([fetch(`https://api.telegram.org/bot${TG}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: CH, text: m, parse_mode: 'HTML' }) })]);
    b.innerHTML = '<span style="color:var(--g)">Отправлено!</span>'; f.reset(); setTimeout(() => { b.innerHTML = orig; b.disabled = !1 }, 4000);
  } catch (err) { b.innerHTML = '<span>Ошибка — напишите напрямую</span>'; setTimeout(() => { b.innerHTML = orig; b.disabled = !1 }, 3000) }
});

document.querySelectorAll('.scen-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const p = btn.closest('.scen-wrapper');
    p.querySelectorAll('.scen-btn').forEach(b => {
      b.classList.remove('active');
      b.style.background = 'transparent';
      b.style.borderColor = 'transparent';
      b.style.color = 'var(--mt)';
    });
    btn.classList.add('active');
    btn.style.background = 'rgba(255,255,255,.04)';
    btn.style.borderColor = 'rgba(255,255,255,.1)';
    btn.style.color = '#fff';

    const target = btn.dataset.target;
    p.querySelectorAll('.scen-pane').forEach(pane => {
      if (pane.id === target) {
        pane.style.opacity = '1';
        pane.style.visibility = 'visible';
        pane.style.pointerEvents = 'auto';
        pane.style.zIndex = '2';
        pane.style.transform = 'translateY(0)';
      } else {
        pane.style.opacity = '0';
        pane.style.visibility = 'hidden';
        pane.style.pointerEvents = 'none';
        pane.style.zIndex = '1';
        pane.style.transform = 'translateY(20px)';
      }
    });
  });
});

// Calendar interaction
document.querySelectorAll('.cal-day:not(.empty)').forEach(d => {
  d.addEventListener('click', () => {
    document.querySelectorAll('.cal-day').forEach(x => x.classList.remove('active'));
    d.classList.add('active');
    document.getElementById('sel-date-text').textContent = d.textContent + ' Марта';
    document.getElementById('booking_date').value = d.dataset.date;
  });
});

document.querySelectorAll('.cal-time').forEach(t => {
  t.addEventListener('click', () => {
    document.querySelectorAll('.cal-time').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    document.getElementById('booking_time').value = t.textContent;

    // Reveal Form Stage 2 (Calendly flow)
    const stage2 = document.getElementById('booking-stage-2');
    stage2.style.display = 'flex';
    // Small delay to allow display to apply before opacity transition
    setTimeout(() => {
      stage2.style.opacity = '1';
    }, 50);
  });
});

// Phone Input Mask Initialization
const phoneInputField = document.querySelector("#phone");
if (phoneInputField) {
  const phoneInput = window.intlTelInput(phoneInputField, {
    initialCountry: "auto",
    nationalMode: false,
    autoInsertDialCode: true,
    strictMode: true,
    geoIpLookup: callback => {
      fetch("https://ipapi.co/json")
        .then(res => res.json())
        .then(data => callback(data.country_code))
        .catch(() => callback("ru"));
    },
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@20.0.5/build/js/utils.js",
  });

  // Optional: Make intl-tel-input play nice with the dark theme
  phoneInputField.style.paddingLeft = '50px'; // ensure space for flag
}

// ═══════════════ AI CHAT WIDGET LOGIC ═══════════════
document.addEventListener('DOMContentLoaded', () => {
    const chatWidget = document.getElementById('ai-chat-window');
    const chatToggle = document.getElementById('ai-chat-toggle');
    const chatClose = document.getElementById('ai-chat-close');
    const chatMessages = document.getElementById('ai-chat-messages');
    
    // Config
    const TELEGRAM_BOT_TOKEN = "YOUR_TELEGRAM_TOKEN"; // Placeholder
    const TELEGRAM_CHAT_ID = "YOUR_CHAT_ID";         // Placeholder
    const MAIK_BOT_URL = "YOUR_MAIK_BOT_URL";       // Placeholder
    const MAIK_BOT_TOKEN = "YOUR_MAIK_BOT_TOKEN";   // Placeholder

    let chatData = {
        name: "",
        phone: "",
        company: "",
        task: "",
        date: "",
        time: ""
    };

    let chatState = 'INIT'; // INIT -> QUIZ_1 -> NAME -> PHONE -> COMPANY -> CALENDAR -> SUCCESS
    let phoneInputInstance = null;
    let isInitialized = false;

    // Toggle Chat
    chatToggle.addEventListener('click', () => {
        chatWidget.classList.add('open');
        chatToggle.style.transform = 'scale(0)';
        if(!isInitialized) {
            isInitialized = true;
            startChat();
        }
    });

    chatClose.addEventListener('click', () => {
        chatWidget.classList.remove('open');
        chatToggle.style.transform = 'scale(1)';
    });

    // Handle Manual Text Input Globally
    const form = document.getElementById('ai-chat-form');
    const input = document.getElementById('ai-chat-input');
    
    if (form && input) {
        form.onsubmit = async (e) => {
            e.preventDefault();
            const text = input.value.trim();
            if(!text) return;
            input.value = '';
            
            // If we are waiting for name/phone/company, maybe treat text as the answer?
            // For now, let's just append the user message and forward to AI, 
            // unless it's a specific step where we want to intercept. 
            // The simplest approach is to treat it as a general AI query if we reach here 
            // or if the user skips the quiz paths.
            appendUserMessage(text);
            
            // Specific overrides for Quiz states with manual input:
            if(chatState === 'NAME') { chatData.name = text; return nextState('PHONE'); }
            if(chatState === 'PHONE') { chatData.phone = text; return nextState('COMPANY'); }
            if(chatState === 'COMPANY') { chatData.company = text; return nextState('TASK'); }
            if(chatState === 'TASK') { chatData.task = text; return nextState('CALENDAR'); }
            
            // Otherwise, normal FREE_CHAT askAI behavior
            const msgDiv = document.createElement('div');
            msgDiv.className = 'chat-msg-container';
            msgDiv.innerHTML = `<div class="chat-msg-bot"><span style="opacity:0.6"><i class="ph ph-dots-three"></i> AI думает...</span></div>`;
            chatMessages.appendChild(msgDiv);
            scrollToBottom();
            
            try {
                const response = await askAI(text);
                msgDiv.innerHTML = `<div class="chat-msg-bot">${response.message || response.text || response}</div>`;
            } catch (err) {
                 msgDiv.innerHTML = `<div class="chat-msg-bot" style="color:#f43f5e">Ошибка связи с AI. Убедитесь, что настроен WEB_API_TOKEN.</div>`;
            }
            scrollToBottom();
        };
    }

    function appendBotMessage(text, quickReplies = []) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-msg-container';
        
        let html = `<div class="chat-msg-bot">${text}</div>`;
        
        if (quickReplies.length > 0) {
            html += `<div class="chat-quick-replies">`;
            quickReplies.forEach(reply => {
                html += `<button class="chat-quick-reply">${reply.text}</button>`;
            });
            html += `</div>`;
        }
        
        msgDiv.innerHTML = html;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();

        // Add event listeners to quick replies
        if (quickReplies.length > 0) {
            const buttons = msgDiv.querySelectorAll('.chat-quick-reply');
            buttons.forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    // Disable all buttons in this block
                    buttons.forEach(b => b.style.pointerEvents = 'none');
                    appendUserMessage(quickReplies[index].text);
                    quickReplies[index].action();
                });
            });
        }
    }

    function appendUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-msg-container';
        msgDiv.innerHTML = `<div class="chat-msg-user">${text}</div>`;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    function scrollToBottom() {
        // Small delay to ensure render is complete
        setTimeout(() => {
            chatMessages.scrollTo({
                top: chatMessages.scrollHeight,
                behavior: 'smooth'
            });
        }, 50);
    }

    // Input handlers
    function requestTextInput(placeholder, callback, isPhone = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-msg-container';
        msgDiv.style.alignSelf = 'flex-end';
        msgDiv.style.width = '85%';
        
        const inputId = 'chat-input-' + Date.now();
        const type = isPhone ? 'tel' : 'text';
        
        msgDiv.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:8px;">
                <input type="${type}" id="${inputId}" placeholder="${placeholder}" style="width:100%; padding:0.75rem 1rem; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:12px; color:#fff; font-family:inherit; outline:none;" autocomplete="off">
                <button class="chat-submit-btn">Отправить</button>
            </div>
        `;
        
        chatMessages.appendChild(msgDiv);
        scrollToBottom();

        const inputEl = document.getElementById(inputId);
        const btnEl = msgDiv.querySelector('.chat-submit-btn');

        if (isPhone && window.intlTelInput) {
            phoneInputInstance = window.intlTelInput(inputEl, {
                initialCountry: "auto",
                nationalMode: false,
                autoInsertDialCode: true,
                strictMode: true,
                geoIpLookup: cb => {
                    fetch("https://ipapi.co/json").then(res => res.json()).then(data => cb(data.country_code)).catch(() => cb("ru"));
                },
                utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@20.0.5/build/js/utils.js",
            });
            inputEl.style.paddingLeft = '50px';
        }

        const handleSubmit = () => {
            let val = inputEl.value.trim();
            if (isPhone && phoneInputInstance) {
                if(!phoneInputInstance.isValidNumber()){
                    inputEl.style.borderColor = 'red';
                    // Optional shake animation here
                    return;
                }
                val = phoneInputInstance.getNumber();
            }
            if(!val) return;
            
            // Disable input so user can't reclick
            inputEl.disabled = true;
            btnEl.disabled = true;
            btnEl.innerHTML = 'Отправка...';

            msgDiv.remove();
            appendUserMessage(val);
            callback(val);
        };

        btnEl.addEventListener('click', handleSubmit);
        inputEl.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') handleSubmit();
            inputEl.style.borderColor = 'rgba(255,255,255,0.1)';
        });
        
        scrollToBottom();
    }

    function requestDateTimePicker(callback) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-msg-container';
        msgDiv.style.alignSelf = 'flex-end';
        
        msgDiv.innerHTML = `
            <div class="chat-date-time-picker" style="max-width:320px;padding:1rem;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:16px;">
                <div style="font-size:0.75rem;color:var(--mt);font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:1rem;">Select Date (МСК)</div>
                <div id="chat-cal-scroll-dates" style="display:flex;gap:8px;overflow-x:auto;padding-bottom:12px;scrollbar-width:none;-ms-overflow-style:none;margin-bottom:1.5rem;"></div>
                
                <div style="font-size:0.75rem;color:var(--mt);font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:1rem;">Select Time</div>
                <div id="chat-cal-scroll-times" style="display:flex;gap:8px;overflow-x:auto;padding-bottom:12px;scrollbar-width:none;-ms-overflow-style:none;opacity:0.3;pointer-events:none;transition:opacity 0.3s;margin-bottom:1.5rem;">
                    <button type="button" class="cal-time-scr">10:00</button>
                    <button type="button" class="cal-time-scr">11:00</button>
                    <button type="button" class="cal-time-scr">12:00</button>
                    <button type="button" class="cal-time-scr">13:00</button>
                    <button type="button" class="cal-time-scr">14:00</button>
                    <button type="button" class="cal-time-scr">15:00</button>
                    <button type="button" class="cal-time-scr">16:00</button>
                    <button type="button" class="cal-time-scr">17:00</button>
                </div>
                
                <button class="chat-submit-btn" id="chat-datetime-submit" style="opacity:0.3;pointer-events:none;transition:opacity 0.3s;width:100%;">Подтвердить</button>
            </div>
        `;
        
        chatMessages.appendChild(msgDiv);
        scrollToBottom();

        const datesContainer = document.getElementById('chat-cal-scroll-dates');
        const timesContainer = document.getElementById('chat-cal-scroll-times');
        const submitBtn = document.getElementById('chat-datetime-submit');
        
        let selectedDate = null;
        let selectedTime = null;

        const DOW_NAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const MONTH_NAMES_SHORT = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const today = new Date();
        today.setHours(0,0,0,0);

        // Generate Dates
        for (let i = 0; i < 30; i++) {
            const dateObj = new Date(today);
            dateObj.setDate(today.getDate() + i);
            if (dateObj.getDay() === 0 || dateObj.getDay() === 6) continue;
            
            const dStr = dateObj.getFullYear() + '-' + String(dateObj.getMonth() + 1).padStart(2, '0') + '-' + String(dateObj.getDate()).padStart(2, '0');
            const dowStr = DOW_NAMES[dateObj.getDay()];
            const monStr = MONTH_NAMES_SHORT[dateObj.getMonth()];
            const numStr = dateObj.getDate();

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'cal-date-scr';
            btn.innerHTML = `<div class="dow">${dowStr}</div><div class="num">${numStr}</div><div class="mon">${monStr}</div>`;
            
            btn.addEventListener('click', () => {
                datesContainer.querySelectorAll('.cal-date-scr').forEach(x => x.classList.remove('active'));
                btn.classList.add('active');
                selectedDate = dStr;
                
                timesContainer.style.opacity = '1';
                timesContainer.style.pointerEvents = 'auto';
                
                if (selectedDate && selectedTime) {
                    submitBtn.style.opacity = '1';
                    submitBtn.style.pointerEvents = 'auto';
                }
            });
            datesContainer.appendChild(btn);
        }

        // Handle Times
        timesContainer.querySelectorAll('.cal-time-scr').forEach(t => {
            t.addEventListener('click', () => {
                timesContainer.querySelectorAll('.cal-time-scr').forEach(x => x.classList.remove('active'));
                t.classList.add('active');
                selectedTime = t.textContent;
                
                if (selectedDate && selectedTime) {
                    submitBtn.style.opacity = '1';
                    submitBtn.style.pointerEvents = 'auto';
                }
            });
        });

        submitBtn.addEventListener('click', () => {
            if(!selectedDate || !selectedTime) return;
            msgDiv.remove();
            appendUserMessage(`Выбрано: ${selectedDate} в ${selectedTime}`);
            callback(selectedDate, selectedTime);
        });
    }

    // Chat Flow Logic
    function startChat() {
        chatState = 'QUIZ_1';
        setTimeout(() => {
            appendBotMessage("Здравствуйте! 👋 Я цифровой ассистент Futurist.");
            setTimeout(() => {
                appendBotMessage("Чем могу помочь вам сегодня?", [
                    { text: "Автоматизировать процесс", action: () => nextState('COMPANY', "Отличный выбор! ИИ превосходно справляется с рутиной.") },
                    { text: "Внедрить AI-агентов", action: () => nextState('COMPANY', "Супер! AI-агенты могут заменить целые отделы.") },
                    { text: "Просто вопрос", action: () => nextState('FREE_CHAT', "Слушаю вас! Задайте любой вопрос.") }
                ]);
            }, 600);
        }, 300);
    }

    function nextState(stateName, prepText = "") {
        chatState = stateName;
        if(prepText) {
            setTimeout(() => {
                appendBotMessage(prepText);
                triggerStateLogic();
            }, 500);
        } else {
            triggerStateLogic();
        }
    }

    function triggerStateLogic() {
        const delay = 600;
        setTimeout(() => {
            if (chatState === 'COMPANY') {
                appendBotMessage("Для начала, подскажите название вашей компании или чем вы занимаетесь?");
                requestTextInput("Тут название вашей компании...", (val) => {
                    chatData.company = val;
                    nextState('TASK');
                });
            } else if (chatState === 'TASK') {
                appendBotMessage("Какую главную бизнес-задачу вы хотите решить?");
                requestTextInput("Внедрение ИИ в техподдержку...", (val) => {
                    chatData.task = val;
                    nextState('NAME');
                });
            } else if (chatState === 'NAME') {
                appendBotMessage("Как я могу к вам обращаться?");
                requestTextInput("Максим...", (val) => {
                    chatData.name = val;
                    nextState('PHONE');
                });
            } else if (chatState === 'PHONE') {
                appendBotMessage(`Приятно познакомиться, ${chatData.name}! Укажите ваш контактный номер.`);
                requestTextInput("Телефон...", (val) => {
                    chatData.phone = val;
                    nextState('CALENDAR');
                }, true); // isPhone = true
            } else if (chatState === 'CALENDAR') {
                appendBotMessage("Давайте выберем время для короткой встречи в Zoom (до 30 минут). Там мы обсудим ваш проект детально.");
                requestDateTimePicker((dateVal, timeVal) => {
                    chatData.date = dateVal;
                    chatData.time = timeVal;
                    nextState('SUCCESS');
                });
            } else if (chatState === 'SUCCESS') {
                appendBotMessage("🎉 Супер! Получил данные. Наш техдир свяжется с вами для подтверждения. Удачного дня!");
                sendDataToTelegram(chatData);
            } else if (chatState === 'FREE_CHAT') {
                // Free AI Chat mode is already handled by the global form submit event
            }
        }, delay);
    }

    // Integrations
    async function sendDataToTelegram(data) {
        if(TELEGRAM_BOT_TOKEN.includes("YOUR_")) {
            console.log("Mock Lead Submission: ", data);
            return; 
        }

        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        const textMsg = `🤖 Новая заявка с Чат-Виджета\n\n👤 Имя: ${data.name}\n📱 Телефон: ${data.phone}\n🏢 Компания: ${data.company}\n🎯 Задача: ${data.task}\n📅 Запись: ${data.date} в ${data.time}`;
        
        try {
            await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: textMsg })
            });
        } catch (e) {
            console.error("TG Send Failed", e);
        }
    }

    async function askAI(question) {
        if(MAIK_BOT_URL.includes("YOUR_")) {
            return new Promise(resolve => setTimeout(() => resolve({message: "Для ответа ИИ подключите ваш бэкенд в script.js."}), 1000));
        }

        const res = await fetch(`${MAIK_BOT_URL}/api/message`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${MAIK_BOT_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: "web-user-" + Math.floor(Math.random() * 100000),
                message: question
            })
        });

        if(!res.ok) throw new Error("API Error");
        return await res.json();
    }
});
