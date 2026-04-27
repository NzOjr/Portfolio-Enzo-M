// ============================================
// ENZO MOGLIA — V4 / NEON TECH
// ============================================

// === Theme toggle ===
(function() {
  const stored = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', stored);

  document.addEventListener('DOMContentLoaded', () => {
    updateThemeBtn();
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeBtn();
    });
  });

  function updateThemeBtn() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    btn.textContent = theme === 'dark' ? '☀' : '☾';
  }
})();

// === Lang toggle ===
(function() {
  const stored = localStorage.getItem('lang') || 'fr';
  document.documentElement.setAttribute('lang', stored);

  document.addEventListener('DOMContentLoaded', () => {
    applyLang(stored);
    const btn = document.getElementById('lang-toggle');
    if (btn) btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('lang') || 'fr';
      const next = current === 'fr' ? 'en' : 'fr';
      document.documentElement.setAttribute('lang', next);
      localStorage.setItem('lang', next);
      applyLang(next);
    });
  });

  function applyLang(lang) {
    document.querySelectorAll('[data-fr]').forEach(el => {
      const text = el.getAttribute('data-' + lang);
      if (text !== null) el.innerHTML = text;
    });
    const btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = lang === 'fr' ? 'EN' : 'FR';
    const titleEl = document.querySelector('title');
    if (titleEl && titleEl.dataset[lang]) titleEl.textContent = titleEl.dataset[lang];
  }
})();

// === Scroll reveal ===
(function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  });
})();

// === Count up animation on stats ===
(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const countables = document.querySelectorAll('[data-count]');
    if (!countables.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    countables.forEach(el => observer.observe(el));

    function countUp(el) {
      const target = parseInt(el.dataset.count, 10);
      const duration = 1800;
      const start = performance.now();
      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        // ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(target * eased);
        el.textContent = value;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
    }
  });
})();

// === Magnetic buttons ===
(function() {
  document.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia('(hover: none)').matches) return;
    const magnets = document.querySelectorAll('.btn-primary, .btn-secondary');
    magnets.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15 - 3}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  });
})();

// === Filters ===
(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-row');
    if (!buttons.length || !projects.length) return;

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        projects.forEach(p => {
          if (filter === 'all' || p.dataset.cat === filter) {
            p.style.display = '';
            p.style.opacity = '0';
            setTimeout(() => p.style.opacity = '1', 50);
          } else {
            p.style.display = 'none';
          }
        });
      });
    });
  });
})();

// === Modal slide-in for project details ===
(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('project-modal');
    if (!overlay || !modal) return;

    const triggers = document.querySelectorAll('[data-modal-trigger]');
    const closeBtn = modal.querySelector('.modal-close');

    function openModal(projectId) {
      // Hide all project content
      modal.querySelectorAll('.modal-project').forEach(p => p.style.display = 'none');
      // Show selected
      const target = modal.querySelector(`[data-project="${projectId}"]`);
      if (target) target.style.display = 'block';

      overlay.classList.add('open');
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      modal.scrollTop = 0;
    }

    function closeModal() {
      overlay.classList.remove('open');
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }

    triggers.forEach(t => {
      t.addEventListener('click', (e) => {
        e.preventDefault();
        const id = t.dataset.modalTrigger;
        openModal(id);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
  });
})();

// === Form ===
(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const lang = document.documentElement.getAttribute('lang') || 'fr';
      alert(lang === 'fr' ? 'Message envoyé ✓' : 'Message sent ✓');
      form.reset();
    });
  });
})();

// === Loading screen (1x per session) ===
(function() {
  const sessionKey = 'loaderShown';
  const today = new Date().toDateString();
  const lastShown = sessionStorage.getItem(sessionKey);

  if (lastShown === today) return;

  // Build loader on top of everything
  const loader = document.createElement('div');
  loader.className = 'loader';
  loader.innerHTML = `
    <div class="loader-name">Enzo Moglia</div>
    <div class="loader-bar"></div>
    <div class="loader-status" data-fr="Chargement…" data-en="Loading…">Chargement…</div>
  `;

  // Insert immediately (before DOMContentLoaded)
  if (document.body) {
    document.body.appendChild(loader);
  } else {
    document.addEventListener('DOMContentLoaded', () => document.body.appendChild(loader));
  }

  // Apply current lang to loader
  const lang = localStorage.getItem('lang') || 'fr';
  const status = loader.querySelector('.loader-status');
  if (status) status.textContent = lang === 'fr' ? 'Chargement…' : 'Loading…';

  // Hide after 2.2s
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      sessionStorage.setItem(sessionKey, today);
      setTimeout(() => loader.remove(), 700);
    }, 2200);
  });
})();

// === Chatbot ===
(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const lang = () => document.documentElement.getAttribute('lang') || 'fr';

    // Conversations data
    const conversations = {
      menu: {
        bot: {
          fr: "Salut ✨ Je suis le mini-bot du portfolio. Que puis-je te dire sur Enzo ?",
          en: "Hi ✨ I'm the portfolio mini-bot. What would you like to know about Enzo ?"
        },
        options: [
          { id: 'opportunity', fr: "Tu cherches quel type d'opportunité ?", en: "What kind of opportunity are you looking for ?" },
          { id: 'tools', fr: "Quels sont tes outils principaux ?", en: "What are your main tools ?" },
          { id: 'english', fr: "Quel est ton niveau d'anglais ?", en: "What's your English level ?" },
          { id: 'contact', fr: "Comment te contacter rapidement ?", en: "Fastest way to contact you ?" },
          { id: 'mobility', fr: "Tu peux te déplacer pour un entretien ?", en: "Can you travel for an interview ?" },
          { id: 'response', fr: "C'est quoi ton délai de réponse ?", en: "What's your response time ?" },
          { id: 'freelance', fr: "Tu acceptes les missions freelance ?", en: "Do you accept freelance work ?" }
        ]
      },
      opportunity: {
        bot: {
          fr: "Je cherche un <strong>CDI</strong> dans la communication digitale, idéalement à partir de septembre 2026 quand je terminerai mon BTS. Je suis aussi ouvert aux opportunités d'alternance plus longues si la mission est intéressante.",
          en: "I'm looking for a <strong>full-time role</strong> in digital communication, ideally starting September 2026 when I finish my BTS. I'm also open to longer apprenticeships if the role is interesting."
        }
      },
      tools: {
        bot: {
          fr: "Au quotidien : <strong>CapCut</strong> et <strong>Canva</strong> (les deux à fond), <strong>InDesign</strong> pour les supports éditoriaux, <strong>Photoshop</strong> et <strong>Figma</strong> à un niveau intermédiaire. Je m'adapte vite aux nouveaux outils.",
          en: "Daily: <strong>CapCut</strong> and <strong>Canva</strong> (heavy use), <strong>InDesign</strong> for editorial work, <strong>Photoshop</strong> and <strong>Figma</strong> at intermediate level. I pick up new tools fast."
        }
      },
      english: {
        bot: {
          fr: "<strong>C1</strong> — je peux travailler en anglais, lire des briefs, rédiger des emails et tenir une réunion sans souci.",
          en: "<strong>C1</strong> — I can work in English, read briefs, write emails and run a meeting without issues."
        }
      },
      contact: {
        bot: {
          fr: "Le plus simple : <a href='mailto:enzo.moglia@hotmail.fr'>enzo.moglia@hotmail.fr</a> ✉️ ou directement par téléphone au <a href='tel:+33625700895'>06 25 70 08 95</a>. Tu peux aussi passer par la page <a href='contact.html'>Contact</a>.",
          en: "Easiest way: <a href='mailto:enzo.moglia@hotmail.fr'>enzo.moglia@hotmail.fr</a> ✉️ or directly by phone at <a href='tel:+33625700895'>06 25 70 08 95</a>. You can also use the <a href='contact.html'>Contact</a> page."
        }
      },
      mobility: {
        bot: {
          fr: "Bien sûr ! Je suis basé à <strong>Lille</strong> et je peux me déplacer dans toute la France pour un entretien. Pour un poste, je suis flexible sur la localisation.",
          en: "Of course! I'm based in <strong>Lille</strong> and I can travel anywhere in France for an interview. For a job, I'm flexible on location."
        }
      },
      response: {
        bot: {
          fr: "Je réponds aux mails sous <strong>24h</strong> en semaine, souvent dans la journée. Sur mon téléphone direct, c'est encore plus rapide.",
          en: "I reply to emails within <strong>24h</strong> on weekdays, often the same day. On my direct phone, even faster."
        }
      },
      freelance: {
        bot: {
          fr: "Pour l'instant je me concentre sur mon alternance et mes études. Mais selon le projet, on peut toujours en discuter — surtout si c'est <strong>création de contenu social media</strong> ou <strong>édition</strong>.",
          en: "For now I'm focused on my apprenticeship and studies. But depending on the project, we can always discuss — especially if it's <strong>social media content</strong> or <strong>editorial</strong>."
        }
      }
    };

    // Build UI
    const toggle = document.createElement('button');
    toggle.className = 'chatbot-toggle';
    toggle.innerHTML = '💬<span class="chatbot-badge"></span>';
    toggle.setAttribute('aria-label', 'Open chatbot');
    document.body.appendChild(toggle);

    const win = document.createElement('div');
    win.className = 'chatbot-window';
    win.innerHTML = `
      <div class="chatbot-header">
        <div class="chatbot-avatar">EM</div>
        <div class="chatbot-title-block">
          <div class="chatbot-name" data-fr="Mini-bot Enzo" data-en="Enzo's mini-bot">Mini-bot Enzo</div>
          <div class="chatbot-status" data-fr="En ligne" data-en="Online">En ligne</div>
        </div>
      </div>
      <div class="chatbot-body"></div>
      <div class="chat-options"></div>
    `;
    document.body.appendChild(win);

    const body = win.querySelector('.chatbot-body');
    const optionsWrap = win.querySelector('.chat-options');

    function addMessage(text, role) {
      const msg = document.createElement('div');
      msg.className = `chat-message ${role}`;
      msg.innerHTML = text;
      body.appendChild(msg);
      setTimeout(() => body.scrollTop = body.scrollHeight, 50);
    }

    function showOptions(opts) {
      optionsWrap.innerHTML = '';
      opts.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'chat-option' + (opt.back ? ' back' : '');
        btn.textContent = opt[lang()] || opt.fr;
        btn.addEventListener('click', () => handleOption(opt));
        optionsWrap.appendChild(btn);
      });
    }

    function handleOption(opt) {
      if (opt.back) {
        body.innerHTML = '';
        startMenu();
        return;
      }
      // user picks
      addMessage(opt[lang()] || opt.fr, 'user');
      // bot replies after delay
      setTimeout(() => {
        const conv = conversations[opt.id];
        addMessage(conv.bot[lang()] || conv.bot.fr, 'bot');
        showOptions([{ back: true, fr: 'Autre question', en: 'Another question' }]);
      }, 600);
      optionsWrap.innerHTML = '';
    }

    function startMenu() {
      const menu = conversations.menu;
      addMessage(menu.bot[lang()] || menu.bot.fr, 'bot');
      setTimeout(() => showOptions(menu.options), 400);
    }

    let started = false;
    toggle.addEventListener('click', () => {
      const isOpen = win.classList.toggle('open');
      toggle.classList.toggle('open');
      toggle.innerHTML = isOpen ? '×' : '💬<span class="chatbot-badge"></span>';
      if (isOpen && !started) {
        started = true;
        setTimeout(startMenu, 300);
      }
    });

    // Re-translate when lang changes
    document.getElementById('lang-toggle')?.addEventListener('click', () => {
      setTimeout(() => {
        // Re-translate static parts
        win.querySelectorAll('[data-fr]').forEach(el => {
          el.textContent = el.dataset[lang()] || el.dataset.fr;
        });
      }, 50);
    });
  });
})();

// === Konami code easter egg → 8-bit retro mode ===
(function() {
  const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let pressed = [];

  document.addEventListener('keydown', (e) => {
    pressed.push(e.key.toLowerCase() === 'b' ? 'b' : e.key.toLowerCase() === 'a' ? 'a' : e.key);
    if (pressed.length > KONAMI.length) pressed.shift();
    if (pressed.length === KONAMI.length && KONAMI.every((k, i) => k.toLowerCase() === pressed[i].toLowerCase())) {
      activateRetro();
      pressed = [];
    }
  });

  function activateRetro() {
    if (document.body.classList.contains('retro-mode')) return;
    document.body.classList.add('retro-mode');

    const banner = document.createElement('div');
    banner.className = 'retro-banner';
    const lang = document.documentElement.getAttribute('lang') || 'fr';
    banner.textContent = lang === 'fr'
      ? '★ MODE 8-BIT ACTIVÉ ★ EASTER EGG TROUVÉ ★ FIN DANS 10S ★'
      : '★ 8-BIT MODE ON ★ EASTER EGG FOUND ★ END IN 10S ★';
    document.body.appendChild(banner);

    setTimeout(() => {
      document.body.classList.remove('retro-mode');
      banner.remove();
    }, 10000);
  }
})();

// === Loading screen (1 fois par session ~ 1x par jour) ===
(function() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  const lastShown = parseInt(localStorage.getItem('loaderLastShown') || '0', 10);
  const now = Date.now();
  const ONE_DAY = 1000 * 60 * 60 * 18; // 18h pour faire ~1x par jour

  if (now - lastShown < ONE_DAY) {
    // Skip loader
    loader.style.display = 'none';
    return;
  }

  // Show + animate
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    localStorage.setItem('loaderLastShown', now.toString());
    setTimeout(() => loader.remove(), 700);
  }, 1800);
})();

// === Chatbot ===
(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.getElementById('chatbot-trigger');
    const panel = document.getElementById('chatbot-panel');
    if (!trigger || !panel) return;

    const messagesEl = panel.querySelector('.chatbot-messages');
    const optionsEl = panel.querySelector('.chatbot-options');

    // Conversation flow
    const flowFR = {
      welcome: {
        bot: "Salut, moi c'est <strong>Enzo</strong> ✦ Qu'est-ce qui t'amène par ici ?",
        options: [
          { text: "Je cherche un alternant ou un CDI", next: "opportunity" },
          { text: "C'est quoi tes outils principaux ?", next: "tools" },
          { text: "Tu fais du freelance ?", next: "freelance" },
          { text: "Comment te contacter rapidement ?", next: "contact" },
          { text: "Niveau anglais ?", next: "english" },
        ]
      },
      opportunity: {
        user: "Je cherche un alternant ou un CDI",
        bot: "Parfait, <strong>je suis dispo à partir de septembre 2026</strong> en CDI. J'ai déjà 2 ans d'alternance à la Ville de Lomme en communication digitale. Tu peux me <a href='contact.html'>contacter ici</a> ou télécharger mon <a href='cv-enzo-moglia.pdf' target='_blank'>CV en PDF</a>.",
        options: [
          { text: "Tu peux te déplacer ?", next: "location" },
          { text: "Délai de réponse ?", next: "response" },
          { text: "Retour au menu", next: "welcome" },
        ]
      },
      tools: {
        user: "C'est quoi tes outils principaux ?",
        bot: "En création : <strong>CapCut, Canva, InDesign, Photoshop</strong> et un peu de Figma. Côté stratégie : réseaux sociaux, copywriting, stratégie éditoriale. Tu peux voir le détail sur la page <a href='a-propos.html'>À propos</a>.",
        options: [
          { text: "Tu maîtrises le montage vidéo ?", next: "video" },
          { text: "Et la stratégie ?", next: "strategy" },
          { text: "Retour au menu", next: "welcome" },
        ]
      },
      video: {
        user: "Tu maîtrises le montage vidéo ?",
        bot: "Oui ! Je tourne et je monte mes contenus vidéo principalement sur <strong>CapCut</strong>. Spécialisé dans les formats courts (Reels, TikTok, Shorts) qui tournent sur les réseaux de la Ville de Lomme.",
        options: [
          { text: "Je veux voir des projets", next: "projects" },
          { text: "Retour au menu", next: "welcome" },
        ]
      },
      strategy: {
        user: "Et la stratégie ?",
        bot: "Je travaille sur des plans de communication globaux : audit de l'existant, stratégie éditoriale, déclinaison sur les différents canaux. Mon dernier projet d'école sur l'<strong>e-réputation du Lycée Gaston Berger</strong> illustre bien cette approche.",
        options: [
          { text: "Voir le projet Gaston Berger", next: "gastonberger" },
          { text: "Retour au menu", next: "welcome" },
        ]
      },
      freelance: {
        user: "Tu fais du freelance ?",
        bot: "Pour des missions ponctuelles oui, ça dépend du projet et de mon temps dispo (j'ai mon BTS en parallèle). N'hésite pas à m'envoyer le brief par <a href='mailto:enzo.moglia@hotmail.fr'>email</a>.",
        options: [
          { text: "Comment te contacter", next: "contact" },
          { text: "Retour au menu", next: "welcome" },
        ]
      },
      contact: {
        user: "Comment te contacter rapidement ?",
        bot: "Le plus simple : <a href='mailto:enzo.moglia@hotmail.fr'>enzo.moglia@hotmail.fr</a> ou par téléphone au <strong>06 25 70 08 95</strong>. Je réponds en général dans les 24h.",
        options: [
          { text: "Voir la page contact", next: "contactpage" },
          { text: "Retour au menu", next: "welcome" },
        ]
      },
      contactpage: {
        user: "Voir la page contact",
        bot: "<a href='contact.html'>C'est par ici ✦</a> Tu y trouveras un formulaire et tous mes liens.",
        options: [
          { text: "Retour au menu", next: "welcome" },
        ]
      },
      english: {
        user: "Niveau anglais ?",
        bot: "<strong>C1</strong> (courant). Je peux travailler en anglais sans souci, à l'écrit comme à l'oral.",
        options: [
          { text: "Autres langues ?", next: "otherlangs" },
          { text: "Retour au menu", next: "welcome" },
        ]
      },
      otherlangs: {
        user: "Autres langues ?",
        bot: "Pour l'instant je me concentre sur le français et l'anglais, mais j'aime apprendre, donc tout est possible 😉",
        options: [
          { text: "Retour au menu", next: "welcome" },
        ]
      },
      location: {
        user: "Tu peux te déplacer ?",
        bot: "Je suis basé à <strong>Lille</strong> (Hauts-de-France) et je peux me déplacer pour les entretiens. Pour le poste, je suis ouvert à la mobilité, surtout sur la métropole lilloise et Paris.",
        options: [
          { text: "Retour au menu", next: "welcome" },
        ]
      },
      response: {
        user: "Délai de réponse ?",
        bot: "Je réponds en général sous <strong>24h</strong>, parfois plus vite si je suis dispo. Tu peux compter sur moi pour pas te faire poireauter.",
        options: [
          { text: "Retour au menu", next: "welcome" },
        ]
      },
      projects: {
        user: "Je veux voir des projets",
        bot: "Direction la <a href='projets.html'>page projets ✦</a> ou regarde directement le <a href='cv-enzo-moglia.pdf' target='_blank'>CV PDF</a>.",
        options: [
          { text: "Retour au menu", next: "welcome" },
        ]
      },
      gastonberger: {
        user: "Voir le projet Gaston Berger",
        bot: "Tu peux voir ce projet en détail sur la <a href='projets.html'>page projets</a> en cliquant sur le 1er. Document complet en PDF dispo.",
        options: [
          { text: "Retour au menu", next: "welcome" },
        ]
      },
    };

    const flowEN = {
      welcome: {
        bot: "Hi, I'm <strong>Enzo</strong> ✦ What brings you here ?",
        options: [
          { text: "I'm looking for an apprentice or full-time hire", next: "opportunity" },
          { text: "What are your main tools ?", next: "tools" },
          { text: "Do you do freelance ?", next: "freelance" },
          { text: "Quickest way to contact you ?", next: "contact" },
          { text: "English level ?", next: "english" },
        ]
      },
      opportunity: {
        user: "I'm looking for an apprentice or full-time hire",
        bot: "Perfect, <strong>I'm available from September 2026</strong> for a full-time role. I already have 2 years of apprenticeship at the City of Lomme in digital communication. You can <a href='contact.html'>contact me here</a> or download my <a href='cv-enzo-moglia.pdf' target='_blank'>CV (PDF)</a>.",
        options: [
          { text: "Can you travel ?", next: "location" },
          { text: "Response time ?", next: "response" },
          { text: "Back to menu", next: "welcome" },
        ]
      },
      tools: {
        user: "What are your main tools ?",
        bot: "Creation: <strong>CapCut, Canva, InDesign, Photoshop</strong> and some Figma. Strategy: social media, copywriting, editorial strategy. See the full breakdown on the <a href='a-propos.html'>About page</a>.",
        options: [
          { text: "Do you do video editing ?", next: "video" },
          { text: "And strategy ?", next: "strategy" },
          { text: "Back to menu", next: "welcome" },
        ]
      },
      video: {
        user: "Do you do video editing ?",
        bot: "Yes ! I shoot and edit my video content mainly on <strong>CapCut</strong>. Specialised in short-form (Reels, TikTok, Shorts) running on the City of Lomme channels.",
        options: [
          { text: "Show me projects", next: "projects" },
          { text: "Back to menu", next: "welcome" },
        ]
      },
      strategy: {
        user: "And strategy ?",
        bot: "I work on global comms plans: audit, editorial strategy, channel-by-channel rollout. My latest school project on the <strong>Lycée Gaston Berger e-reputation</strong> shows that approach well.",
        options: [
          { text: "See the Gaston Berger project", next: "gastonberger" },
          { text: "Back to menu", next: "welcome" },
        ]
      },
      freelance: {
        user: "Do you do freelance ?",
        bot: "For ad-hoc missions yes, depends on the project and my availability (BTS in parallel). Feel free to send me the brief by <a href='mailto:enzo.moglia@hotmail.fr'>email</a>.",
        options: [
          { text: "How to reach you", next: "contact" },
          { text: "Back to menu", next: "welcome" },
        ]
      },
      contact: {
        user: "Quickest way to contact you ?",
        bot: "Easiest: <a href='mailto:enzo.moglia@hotmail.fr'>enzo.moglia@hotmail.fr</a> or by phone at <strong>+33 6 25 70 08 95</strong>. I usually reply within 24h.",
        options: [
          { text: "See contact page", next: "contactpage" },
          { text: "Back to menu", next: "welcome" },
        ]
      },
      contactpage: {
        user: "See contact page",
        bot: "<a href='contact.html'>Right this way ✦</a> You'll find a form and all my links.",
        options: [
          { text: "Back to menu", next: "welcome" },
        ]
      },
      english: {
        user: "English level ?",
        bot: "<strong>C1</strong> (fluent). I can work in English without issue, both written and spoken.",
        options: [
          { text: "Other languages ?", next: "otherlangs" },
          { text: "Back to menu", next: "welcome" },
        ]
      },
      otherlangs: {
        user: "Other languages ?",
        bot: "For now I focus on French and English, but I like learning, so anything's possible 😉",
        options: [
          { text: "Back to menu", next: "welcome" },
        ]
      },
      location: {
        user: "Can you travel ?",
        bot: "I'm based in <strong>Lille</strong> (Northern France) and can travel for interviews. For the role itself, I'm open to mobility, especially around Lille metropolitan area and Paris.",
        options: [
          { text: "Back to menu", next: "welcome" },
        ]
      },
      response: {
        user: "Response time ?",
        bot: "I usually reply within <strong>24h</strong>, sometimes faster if available. You can count on me to not keep you waiting.",
        options: [
          { text: "Back to menu", next: "welcome" },
        ]
      },
      projects: {
        user: "Show me projects",
        bot: "Head to the <a href='projets.html'>projects page ✦</a> or check the <a href='cv-enzo-moglia.pdf' target='_blank'>CV PDF</a> directly.",
        options: [
          { text: "Back to menu", next: "welcome" },
        ]
      },
      gastonberger: {
        user: "See the Gaston Berger project",
        bot: "You can see it in detail on the <a href='projets.html'>projects page</a> by clicking the 1st row. Full PDF document available.",
        options: [
          { text: "Back to menu", next: "welcome" },
        ]
      },
    };

    function getFlow() {
      const lang = document.documentElement.getAttribute('lang') || 'fr';
      return lang === 'en' ? flowEN : flowFR;
    }

    function renderStep(stepKey) {
      const flow = getFlow();
      const step = flow[stepKey];
      if (!step) return;

      // If user clicked option, add user bubble
      if (step.user) addBubble(step.user, 'user');
      // Add bot reply with delay
      setTimeout(() => {
        addBubble(step.bot, 'bot');
        renderOptions(step.options);
      }, 400);
    }

    function addBubble(html, side) {
      const bubble = document.createElement('div');
      bubble.className = `chat-bubble ${side}`;
      bubble.innerHTML = html;
      messagesEl.appendChild(bubble);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function renderOptions(options) {
      optionsEl.innerHTML = '';
      options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = opt.next === 'welcome' ? 'chatbot-back' : 'chatbot-option';
        btn.textContent = opt.next === 'welcome' ?
          (document.documentElement.getAttribute('lang') === 'en' ? '← Back to menu' : '← Retour au menu') :
          opt.text;
        btn.addEventListener('click', () => renderStep(opt.next));
        optionsEl.appendChild(btn);
      });
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    let opened = false;
    trigger.addEventListener('click', () => {
      const isOpen = panel.classList.toggle('open');
      trigger.classList.toggle('open', isOpen);
      trigger.innerHTML = isOpen ? '×' : '<span>💬</span><span class="chatbot-trigger-pulse"></span>';
      if (isOpen && !opened) {
        opened = true;
        renderStep('welcome');
      }
    });
  });
})();

// === Konami code → Retro 8-bit mode ===
(function() {
  const KONAMI = [
    'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
    'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
    'b','a'
  ];
  let idx = 0;
  let active = false;

  document.addEventListener('keydown', (e) => {
    if (active) return;
    const key = e.key.toLowerCase().length === 1 ? e.key.toLowerCase() : e.key;
    const expected = KONAMI[idx].toLowerCase().length === 1 ? KONAMI[idx].toLowerCase() : KONAMI[idx];

    if (key === expected) {
      idx++;
      if (idx === KONAMI.length) {
        triggerRetro();
        idx = 0;
      }
    } else {
      idx = key === KONAMI[0].toLowerCase() ? 1 : 0;
    }
  });

  function triggerRetro() {
    active = true;
    document.body.classList.add('retro-mode');
    const lang = document.documentElement.getAttribute('lang') || 'fr';
    const banner = document.createElement('div');
    banner.className = 'retro-banner';
    banner.textContent = lang === 'fr'
      ? '✦ MODE 8-BIT ACTIVÉ ✦ EASTER EGG TROUVÉ ! ✦'
      : '✦ 8-BIT MODE ON ✦ EASTER EGG FOUND ! ✦';
    document.body.appendChild(banner);

    setTimeout(() => {
      document.body.classList.remove('retro-mode');
      banner.remove();
      active = false;
    }, 10000);
  }
})();
