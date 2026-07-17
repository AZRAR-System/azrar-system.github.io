// ── CUSTOM AI FAQ CHATBOT ─────────────────────────────────────────
const chatData = {
  ar: {
    welcome: "مرحباً بك! أنا مساعد أزرار الذكي 🤖. كيف يمكنني مساعدتك اليوم؟",
    options: [
      { id: "what", text: "🏗️ ما هو نظام أزرار؟", next: "ans_what" },
      { id: "offline", text: "🔌 هل يعمل بدون إنترنت؟", next: "ans_offline" },
      { id: "price", text: "💰 ما هي الباقات والأسعار؟", next: "ans_price" },
      { id: "reqs", text: "💻 ما هي متطلبات التشغيل؟", next: "ans_reqs" },
      { id: "trial", text: "🚀 كيف أقوم بتجربة النظام؟", next: "ans_trial" },
      { id: "human", text: "📞 أريد التحدث مع الدعم الفني", next: "ans_human" }
    ],
    ans_what: {
      text: "نظام <b>أزرار</b> هو برنامج إدارة عقارات متكامل موجه للمكاتب والشركات العقارية. يقوم بإدارة العقود، الأقساط، العمولات، الصيانة، الصادر والوارد، إصدار سندات الصرف والقبض، وله مساعد ذكي مدمج ويدعم واتساب جماعي لإرسال تذكيرات الدفع والرسائل التلقائية لعملائك بنقرة واحدة.",
      options: ["price", "offline", "trial", "back"]
    },
    ans_offline: {
      text: "<b>نعم، وبشكل كامل!</b> نظام أزرار مصمم ليعمل بدون إنترنت تماماً (Offline 100%) لحماية خصوصية بياناتك. يتم حفظ قاعدة البيانات محلياً على جهازك وتشفيرها، مما يمنحك سرعة فائقة في معالجة آلاف العقود دون أي بطء أو انقطاع.",
      options: ["what", "trial", "back"]
    },
    ans_price: {
      text: "لدينا 3 باقات سنوية تناسب احتياجاتك:<br><br>• <b>Solo:</b> جهاز واحد بسعر $49/سنة.<br>• <b>Office (الأكثر طلباً):</b> جهازان بسعر $79/سنة.<br>• <b>Pro:</b> 3 أجهزة بسعر $119/سنة.<br><br>جميع الباقات تشمل كافة الأنظمة الـ 12 والتحديثات مجانية طوال فترة الترخيص.",
      options: ["trial", "human", "back"]
    },
    ans_reqs: {
      text: "يعمل نظام أزرار على أجهزة الكمبيوتر واللابتوب التي تعمل بنظام تشغيل <b>Windows 10</b> أو <b>Windows 11</b> (بمعمارية 64-bit). لا يتطلب مواصفات عالية ويعمل بكفاءة على الأجهزة المتوسطة.",
      options: ["what", "trial", "back"]
    },
    ans_trial: {
      text: "تستطيع تجربة نظام أزرار بكامل ميزاته مجاناً ولمدة **30 يوماً** بدون الحاجة لبطاقة ائتمانية. يتوفر التجربة بنسخة تجريبية كاملة. يمكنك طلب النسخة التجريبية مباشرة بالضغط على الزر أسفله للتواصل معنا عبر واتساب وسنرسل لك رابط التحميل فوراً 🚀",
      cta: { text: "📲 اطلب التجربة المجانية عبر واتساب", url: "https://wa.me/962798986465?text=أريد%20تجربة%20نظام%20أزرار%20مجاناً" },
      options: ["price", "human", "back"]
    },
    ans_human: {
      text: "يسعدنا خدمتك والإجابة على أي استفسارات خاصة بالنظام أو طريقة الشراء. يمكنك الضغط على الزر أسفله لفتح محادثة مباشرة مع الدعم الفني عبر واتساب 📞",
      cta: { text: "💬 تحدث مع الدعم الفني الآن", url: "https://wa.me/962798986465" },
      options: ["trial", "price", "back"]
    }
  },
  en: {
    welcome: "Welcome! I am the AZRAR Assistant 🤖. How can I help you today?",
    options: [
      { id: "what", text: "🏗️ What is AZRAR?", next: "ans_what" },
      { id: "offline", text: "🔌 Does it work offline?", next: "ans_offline" },
      { id: "price", text: "💰 Plans & Pricing?", next: "ans_price" },
      { id: "reqs", text: "💻 System Requirements?", next: "ans_reqs" },
      { id: "trial", text: "🚀 How to start a free trial?", next: "ans_trial" },
      { id: "human", text: "📞 Contact Support", next: "ans_human" }
    ],
    ans_what: {
      text: "<b>AZRAR</b> is an offline real estate management system. It handles contracts, installments, receipts, payments, commissions, maintenance, WhatsApp reminders, and has a built-in AI assistant. It manages everything on your local device without needing cloud servers.",
      options: ["price", "offline", "trial", "back"]
    },
    ans_offline: {
      text: "<b>Yes, 100%!</b> AZRAR works completely offline. Your database is stored locally on your device, ensuring maximum privacy, zero downtime, and extremely fast search and processing of contracts.",
      options: ["what", "trial", "back"]
    },
    ans_price: {
      text: "We offer 3 yearly subscription plans:<br><br>• <b>Solo:</b> 1 device for $49/year.<br>• <b>Office (Popular):</b> 2 devices for $79/year.<br>• <b>Pro:</b> 3 devices for $119/year.<br><br>All plans include all 12 modules and free updates.",
      options: ["trial", "human", "back"]
    },
    ans_reqs: {
      text: "AZRAR runs on laptops or desktop PCs running <b>Windows 10</b> or <b>Windows 11</b> (64-bit). It is lightweight and works smoothly on standard computers.",
      options: ["what", "trial", "back"]
    },
    ans_trial: {
      text: "You can try AZRAR completely free with all features for **30 days** without a credit card. Press the button below to get the download link instantly via WhatsApp! 🚀",
      cta: { text: "📲 Get Free Trial on WhatsApp", url: "https://wa.me/962798986465?text=I%20want%20to%20try%20AZRAR%20Free" },
      options: ["price", "human", "back"]
    },
    ans_human: {
      text: "We are happy to help! Press the button below to start a live WhatsApp chat with our technical support team 📞",
      cta: { text: "💬 Chat with Live Support", url: "https://wa.me/962798986465" },
      options: ["trial", "price", "back"]
    }
  }
};

const chatWidget = document.getElementById('chat-widget');
const chatTrigger = document.getElementById('chat-trigger');
const chatCloseBtn = document.getElementById('chat-close-btn');
const chatBody = document.getElementById('chat-body');
const chatOptionsContainer = document.getElementById('chat-options-container');

if (chatTrigger) {
  chatTrigger.addEventListener('click', () => {
    chatWidget.classList.toggle('open');
    const badge = document.querySelector('.chat-badge');
    if (badge) badge.style.display = 'none';
    if (chatBody && chatBody.children.length === 0) {
      showWelcomeMessage();
    }
  });
}

if (chatCloseBtn) {
  chatCloseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    chatWidget.classList.remove('open');
  });
}

function getChatLang() {
  return document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'ar';
}

function showWelcomeMessage() {
  const lang = getChatLang();
  if (chatBody) {
    chatBody.innerHTML = '';
    addMessage(chatData[lang].welcome, 'bot');
    showOptions(chatData[lang].options);
  }
}

function resetChatLanguage() {
  if (chatBody && chatBody.children.length > 0) {
    showWelcomeMessage();
  }
}

function addMessage(text, sender) {
  if (!chatBody) return;
  const msg = document.createElement('div');
  msg.className = `chat-msg ${sender}`;
  msg.innerHTML = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function showTypingIndicator() {
  if (!chatBody) return;
  const ind = document.createElement('div');
  ind.className = 'chat-typing';
  ind.id = 'chat-typing-indicator';
  ind.innerHTML = '<span></span><span></span><span></span>';
  chatBody.appendChild(ind);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function removeTypingIndicator() {
  const ind = document.getElementById('chat-typing-indicator');
  if (ind) ind.remove();
}

function showOptions(options) {
  if (!chatOptionsContainer) return;
  chatOptionsContainer.innerHTML = '';
  const lang = getChatLang();
  options.forEach(opt => {
    let optText = '';
    let action = null;
    
    if (typeof opt === 'string') {
      if (opt === 'back') {
        optText = lang === 'en' ? "↩️ Back to main menu" : "↩️ العودة للقائمة الرئيسية";
        action = () => {
          addMessage(optText, 'user');
          showTyping(() => showWelcomeMessage());
        };
      } else {
        const optionData = chatData[lang].options.find(o => o.id === opt);
        if (optionData) {
          optText = optionData.text;
          action = () => selectOption(optionData);
        }
      }
    } else {
      optText = opt.text;
      action = () => selectOption(opt);
    }
    
    if (optText && action) {
      const btn = document.createElement('button');
      btn.className = 'chat-opt';
      btn.textContent = optText;
      btn.addEventListener('click', action);
      chatOptionsContainer.appendChild(btn);
    }
  });
}

function selectOption(opt) {
  const lang = getChatLang();
  addMessage(opt.text, 'user');
  if (chatOptionsContainer) chatOptionsContainer.innerHTML = '';
  
  showTyping(() => {
    const ans = chatData[lang][opt.next];
    if (ans.cta) {
      const ctaHtml = `${ans.text}<br><a href="${ans.cta.url}" target="_blank" rel="noopener" class="chat-cta-btn">${ans.cta.text}</a>`;
      addMessage(ctaHtml, 'bot');
    } else {
      addMessage(ans.text, 'bot');
    }
    showOptions(ans.options);
  });
}

function showTyping(callback) {
  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    callback();
  }, 600);
}