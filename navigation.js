// navigation.js
const totalPages = 25;
const currentPageName = window.location.pathname.split('/').pop();
let currentPageIndex = 0;

if (currentPageName && currentPageName.startsWith('page_')) {
  const match = currentPageName.match(/page_(\d+)\.html/);
  if (match) {
    currentPageIndex = parseInt(match[1], 10);
  }
} else if (currentPageName === 'index.html' || !currentPageName) {
  currentPageIndex = 0;
}

// Step reveal state
let currentStep = 0;
let maxSteps = 0;
let revealItems = [];

function initStepReveal() {
  revealItems = Array.from(document.querySelectorAll('.reveal-item'));
  maxSteps = revealItems.reduce((max, item) => {
    const step = parseInt(item.dataset.step, 10);
    return isNaN(step) ? max : Math.max(max, step);
  }, 0);

  const urlParams = new URLSearchParams(window.location.search);
  const dir = urlParams.get('dir');

  if (dir === 'prev') {
    currentStep = maxSteps;
  } else {
    currentStep = 0;
  }

  updateRevealItems();
}

function setStep(newStep) {
  if (newStep >= 0 && newStep <= maxSteps) {
    currentStep = newStep;
    updateRevealItems();
    return true;
  }
  return false;
}

function updateRevealItems() {
  let newlyRevealed = [];
  revealItems.forEach(item => {
    const step = parseInt(item.dataset.step, 10);
    if (!isNaN(step)) {
      if (step <= currentStep) {
        if (!item.classList.contains('reveal-active')) {
          newlyRevealed.push(item);
        }
        item.classList.add('reveal-active');
      } else {
        item.classList.remove('reveal-active');
      }
    }
  });

  if (newlyRevealed.length > 0) {
    setTimeout(() => {
      const lastItem = newlyRevealed[newlyRevealed.length - 1];
      lastItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
  } else {
    // If no new elements were revealed, we might be going backward.
    const activeSlide = document.querySelector('.slide.active');
    if (activeSlide) {
      if (currentStep === 0) {
        setTimeout(() => {
          activeSlide.scrollTo({ top: 0, behavior: 'smooth' });
        }, 50);
      } else {
        const activeRevealItems = revealItems.filter(item => item.classList.contains('reveal-active'));
        if (activeRevealItems.length > 0) {
          setTimeout(() => {
            const lastItem = activeRevealItems[activeRevealItems.length - 1];
            lastItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 50);
        }
      }
    }
  }
}

// Function to resolve filenames
function getPageUrl(index) {
  if (index === 0) return 'index.html';
  return `page_${index}.html`;
}

// Generate dots
const dotsContainer = document.getElementById('nav-dots');
if (dotsContainer) {
  for (let i = 0; i < totalPages; i++) {
    const d = document.createElement('a');
    d.className = 'nav-dot' + (i === currentPageIndex ? ' active' : '');
    d.href = getPageUrl(i) + `?dir=${i < currentPageIndex ? 'prev' : 'next'}`;
    dotsContainer.appendChild(d);
  }
}

// Set up prev/next buttons
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const counter = document.getElementById('nav-counter');

if (counter) {
  counter.textContent = `${currentPageIndex + 1}/${totalPages}`;
}

if (btnPrev) {
  btnPrev.textContent = '↑';
  if (currentPageIndex === 0) {
    btnPrev.disabled = true;
  } else {
    btnPrev.onclick = () => window.location.href = getPageUrl(currentPageIndex - 1) + '?dir=prev';
  }
}

if (btnNext) {
  btnNext.textContent = '↓';
  if (currentPageIndex === totalPages - 1) {
    btnNext.disabled = true;
  } else {
    btnNext.onclick = () => window.location.href = getPageUrl(currentPageIndex + 1) + '?dir=next';
  }
}

// Help modal injection
const helpModal = document.createElement('div');
helpModal.id = 'help-modal';
helpModal.style.cssText = `
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.95);
  background: rgba(19, 22, 24, 0.98);
  border: 1px solid var(--border2);
  border-radius: 12px;
  padding: 24px;
  max-width: 380px;
  width: 90%;
  z-index: 10000;
  opacity: 0;
  pointer-events: none;
  transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 20px 50px rgba(0,0,0,0.7);
  backdrop-filter: blur(10px);
`;
helpModal.innerHTML = `
  <h3 style="font-family: var(--serif); font-size: 22.5px; color: var(--teal); margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" style="vertical-align:middle;"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
    Atajos de Presentación
  </h3>
  <div style="display: flex; flex-direction: column; gap: 10px; font-size: 14.5px; font-family: var(--mono); color: var(--text2);">
    <div style="display:flex; justify-content:space-between; border-bottom: 1px solid rgba(255,255,255,0.03); padding-bottom: 4px;"><span style="color:var(--text)">[→] o [↓] o [Espacio]</span> <span>Siguiente slide</span></div>
    <div style="display:flex; justify-content:space-between; border-bottom: 1px solid rgba(255,255,255,0.03); padding-bottom: 4px;"><span style="color:var(--text)">[←] o [↑]</span> <span>Slide anterior</span></div>
    <div style="display:flex; justify-content:space-between; border-bottom: 1px solid rgba(255,255,255,0.03); padding-bottom: 4px;"><span style="color:var(--text)">[0 - 9]</span> <span>Ir a slide #</span></div>
    <div style="display:flex; justify-content:space-between; border-bottom: 1px solid rgba(255,255,255,0.03); padding-bottom: 4px;"><span style="color:var(--text)">[P]</span> <span>Modo Proyector (1280x800)</span></div>
    <div style="display:flex; justify-content:space-between;"><span style="color:var(--text)">[H]</span> <span>Mostrar/ocultar ayuda</span></div>
  </div>
  <button id="close-help-btn" style="margin-top: 20px; width: 100%; padding: 8px; background: var(--teal-dim); border: 1px solid rgba(45,212,176,0.3); border-radius: 6px; color: var(--teal); font-family: var(--sans); font-size: 13.5px; cursor: pointer; transition: background 0.2s;">
    Entendido
  </button>
`;
document.body.appendChild(helpModal);

// Dynamic inject HUD buttons in #nav
const navContainer = document.getElementById('nav');
if (navContainer) {
  const counterEl = document.getElementById('nav-counter');
  if (counterEl) {
    const btnProjector = document.createElement('button');
    btnProjector.id = 'btn-projector';
    btnProjector.title = 'Modo Proyector 16:10 (1280x800) [P]';
    btnProjector.style.cssText = 'margin-top: 4px;';
    btnProjector.innerHTML = `<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`;
    
    const btnHelp = document.createElement('button');
    btnHelp.id = 'btn-help';
    btnHelp.title = 'Atajos de Teclado [H]';
    btnHelp.style.cssText = 'margin-top: 4px;';
    btnHelp.innerHTML = `<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
    
    navContainer.insertBefore(btnProjector, btnNext);
    navContainer.insertBefore(btnHelp, btnNext);

    btnProjector.onclick = toggleProjectorMode;
    btnHelp.onclick = toggleHelpModal;
    
    // Hover styling
    [btnProjector, btnHelp].forEach(b => {
      b.onmouseenter = () => {
        if (!b.classList.contains('active-hud')) {
          b.style.color = 'var(--teal)';
          b.style.background = 'var(--teal-dim)';
        }
      };
      b.onmouseleave = () => {
        if (!b.classList.contains('active-hud')) {
          b.style.color = 'var(--text2)';
          b.style.background = 'none';
        }
      };
    });
  }
}

const closeHelpBtn = document.getElementById('close-help-btn');
if (closeHelpBtn) {
  closeHelpBtn.onclick = toggleHelpModal;
}

// Projector Mode logic
function toggleProjectorMode() {
  const isActive = document.body.classList.toggle('projector-mode');
  localStorage.setItem('projector-mode', isActive ? 'true' : 'false');
  
  const btn = document.getElementById('btn-projector');
  if (btn) {
    if (isActive) {
      btn.classList.add('active-hud');
      btn.style.color = 'var(--teal)';
      btn.style.background = 'var(--teal-dim)';
    } else {
      btn.classList.remove('active-hud');
      btn.style.color = 'var(--text2)';
      btn.style.background = 'none';
    }
  }
  
  resizeProjector();
}

function toggleHelpModal() {
  const show = helpModal.style.opacity === '0' || !helpModal.style.opacity;
  helpModal.style.opacity = show ? '1' : '0';
  helpModal.style.pointerEvents = show ? 'all' : 'none';
  helpModal.style.transform = show ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.95)';
  
  const btn = document.getElementById('btn-help');
  if (btn) {
    if (show) {
      btn.classList.add('active-hud');
      btn.style.color = 'var(--teal)';
      btn.style.background = 'var(--teal-dim)';
    } else {
      btn.classList.remove('active-hud');
      btn.style.color = 'var(--text2)';
      btn.style.background = 'none';
    }
  }
}

function resizeProjector() {
  const deck = document.getElementById('deck');
  if (!deck) return;
  
  if (!document.body.classList.contains('projector-mode')) {
    deck.style.transform = '';
    deck.style.position = '';
    deck.style.width = '';
    deck.style.height = '';
    deck.style.left = '';
    deck.style.top = '';
    deck.style.boxShadow = '';
    deck.style.border = '';
    deck.style.background = '';
    return;
  }
  
  const targetW = 1280;
  const targetH = 800;
  const winW = window.innerWidth;
  const winH = window.innerHeight;
  
  const scale = Math.min(winW / targetW, winH / targetH);
  
  deck.style.position = 'fixed';
  deck.style.width = `${targetW}px`;
  deck.style.height = `${targetH}px`;
  deck.style.left = '50%';
  deck.style.top = '50%';
  deck.style.transform = `translate(-50%, -50%) scale(${scale})`;
  deck.style.transformOrigin = 'center center';
  deck.style.boxShadow = '0 20px 60px rgba(0,0,0,0.8)';
  deck.style.border = '1px solid rgba(255,255,255,0.08)';
  deck.style.background = 'var(--bg)';
}

// Window resize listener
window.addEventListener('resize', resizeProjector);

// Wheel / Scroll event listener with inertial cooldown (700ms)
let lastScrollTime = Date.now();
const scrollCooldown = 700;

function isInteractiveTarget(target) {
  if (!target) return false;
  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'BUTTON' || tag === 'SELECT' || tag === 'A') {
    return true;
  }
  if (target.closest('.ctrl-row') || 
      target.closest('.fret-panel') || 
      target.closest('#mol-canvas') || 
      target.closest('.chart-wrap') ||
      target.closest('button') ||
      target.closest('select') ||
      target.closest('a')) {
    return true;
  }
  return false;
}

window.addEventListener('wheel', e => {
  // If help modal is open, ignore
  if (helpModal && helpModal.style.opacity === '1') return;

  // Let interactive components receive scroll/wheel events
  if (isInteractiveTarget(e.target)) {
    return;
  }

  const activeSlide = document.querySelector('.slide.active');
  
  if (activeSlide) {
    const isScrollable = activeSlide.scrollHeight > activeSlide.clientHeight;
    // Allow a small 10px tolerance for rounding and scaling issues (especially in projector mode)
    const isAtBottom = activeSlide.scrollHeight - activeSlide.scrollTop <= activeSlide.clientHeight + 10;
    const isAtTop = activeSlide.scrollTop <= 10;

    if (e.deltaY > 30) {
      // Scroll down -> next step or scroll slide down or next slide
      if (currentStep < maxSteps) {
        // We have steps left to reveal. Prevent default and advance step.
        e.preventDefault();
        const now = Date.now();
        if (now - lastScrollTime < scrollCooldown) return;
        lastScrollTime = now;
        setStep(currentStep + 1);
      } else {
        // All steps revealed.
        if (isScrollable && !isAtBottom) {
          // Slide is scrollable and not at bottom -> let browser scroll slide naturally
          return;
        } else {
          // Slide is not scrollable OR already at the bottom -> prevent default and transition to next page
          e.preventDefault();
          const now = Date.now();
          if (now - lastScrollTime < scrollCooldown) return;
          lastScrollTime = now;
          if (currentPageIndex < totalPages - 1) {
            window.location.href = getPageUrl(currentPageIndex + 1) + '?dir=next';
          }
        }
      }
    } else if (e.deltaY < -30) {
      // Scroll up -> scroll slide up or prev step or prev slide
      if (isScrollable && !isAtTop) {
        // Slide is scrollable and not at the top -> let browser scroll slide naturally
        return;
      } else {
        // Already at top.
        e.preventDefault();
        const now = Date.now();
        if (now - lastScrollTime < scrollCooldown) return;
        lastScrollTime = now;
        if (currentStep > 0) {
          setStep(currentStep - 1);
        } else {
          if (currentPageIndex > 0) {
            window.location.href = getPageUrl(currentPageIndex - 1) + '?dir=prev';
          }
        }
      }
    }
  } else {
    // Fallback if no active slide is found
    e.preventDefault();
    const now = Date.now();
    if (now - lastScrollTime < scrollCooldown) return;

    if (e.deltaY > 30) {
      lastScrollTime = now;
      if (currentPageIndex < totalPages - 1) {
        window.location.href = getPageUrl(currentPageIndex + 1) + '?dir=next';
      }
    } else if (e.deltaY < -30) {
      lastScrollTime = now;
      if (currentPageIndex > 0) {
        window.location.href = getPageUrl(currentPageIndex - 1) + '?dir=prev';
      }
    }
  }
}, { passive: false });

// Touch swipe navigation with cooldown (700ms)
let touchStartY = 0;
let touchStartX = 0;
let lastTouchTime = 0;
const touchCooldown = 700;

window.addEventListener('touchstart', e => {
  if (isInteractiveTarget(e.target)) {
    return;
  }
  touchStartY = e.touches[0].clientY;
  touchStartX = e.touches[0].clientX;
}, { passive: true });

window.addEventListener('touchend', e => {
  if (isInteractiveTarget(e.target)) {
    return;
  }
  
  const now = Date.now();
  if (now - lastTouchTime < touchCooldown) return;

  const touchEndY = e.changedTouches[0].clientY;
  const touchEndX = e.changedTouches[0].clientX;
  const diffY = touchStartY - touchEndY;
  const diffX = touchStartX - touchEndX;

  const threshold = 50;
  if (Math.abs(diffY) > Math.abs(diffX)) {
    // Vertical swipe
    if (Math.abs(diffY) > threshold) {
      const activeSlide = document.querySelector('.slide.active');
      const isAtBottom = activeSlide ? (activeSlide.scrollHeight - activeSlide.scrollTop <= activeSlide.clientHeight + 10) : true;
      const isAtTop = activeSlide ? (activeSlide.scrollTop <= 10) : true;

      if (diffY > 0) {
        // Swiped up -> scroll down -> next step / page
        if (currentStep < maxSteps) {
          lastTouchTime = now;
          setStep(currentStep + 1);
        } else {
          // If the slide is scrollable and not at bottom, let it scroll naturally (do nothing here)
          if (isAtBottom) {
            lastTouchTime = now;
            if (currentPageIndex < totalPages - 1) {
              window.location.href = getPageUrl(currentPageIndex + 1) + '?dir=next';
            }
          }
        }
      } else {
        // Swiped down -> scroll up -> prev step / page
        if (isAtTop) {
          lastTouchTime = now;
          if (currentStep > 0) {
            setStep(currentStep - 1);
          } else if (currentPageIndex > 0) {
            window.location.href = getPageUrl(currentPageIndex - 1) + '?dir=prev';
          }
        }
      }
    }
  } else {
    // Horizontal swipe (always transition page / step immediately)
    if (Math.abs(diffX) > threshold) {
      lastTouchTime = now;
      if (diffX > 0) {
        // Swiped left -> next step / page
        if (currentStep < maxSteps) {
          setStep(currentStep + 1);
        } else if (currentPageIndex < totalPages - 1) {
          window.location.href = getPageUrl(currentPageIndex + 1) + '?dir=next';
        }
      } else {
        // Swiped right -> prev step / page
        if (currentStep > 0) {
          setStep(currentStep - 1);
        } else if (currentPageIndex > 0) {
          window.location.href = getPageUrl(currentPageIndex - 1) + '?dir=prev';
        }
      }
    }
  }
}, { passive: true });

// Keyboard navigation (Arrows and Numeric shortcuts)
document.addEventListener('keydown', e => {
  // Check if target is user input
  if (document.activeElement && 
      ((document.activeElement.tagName === 'INPUT' && document.activeElement.type !== 'range') || 
       document.activeElement.tagName === 'TEXTAREA' || 
       document.activeElement.isContentEditable)) {
    return;
  }

  // Arrow / Space navigation
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
    if (e.key === ' ') e.preventDefault(); // prevent scrolling space
    if (currentStep < maxSteps) {
      setStep(currentStep + 1);
    } else if (currentPageIndex < totalPages - 1) {
      window.location.href = getPageUrl(currentPageIndex + 1) + '?dir=next';
    }
  }
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp') {
    if (currentStep > 0) {
      setStep(currentStep - 1);
    } else if (currentPageIndex > 0) {
      window.location.href = getPageUrl(currentPageIndex - 1) + '?dir=prev';
    }
  }
  
  // Projector toggle [P]
  if (e.key === 'p' || e.key === 'P') {
    toggleProjectorMode();
  }

  // Help toggle [H]
  if (e.key === 'h' || e.key === 'H') {
    toggleHelpModal();
  }
  
  // Numeric navigation (0-9)
  if (e.key >= '0' && e.key <= '9') {
    const targetIdx = parseInt(e.key, 10);
    if (targetIdx >= 0 && targetIdx < totalPages && targetIdx !== currentPageIndex) {
      const dir = targetIdx > currentPageIndex ? 'next' : 'prev';
      window.location.href = getPageUrl(targetIdx) + `?dir=${dir}`;
    }
  }
});

// Trigger slide entry animation and load projector state after load
window.addEventListener('DOMContentLoaded', () => {
  // Initialize slide element reveal steps
  initStepReveal();

  const urlParams = new URLSearchParams(window.location.search);
  const dir = urlParams.get('dir');
  const slide = document.querySelector('.slide');
  if (slide) {
    if (dir === 'prev') {
      slide.classList.add('from-left');
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        slide.classList.add('active');
      });
    });
  }
  
  // Load Projector preference
  const projPref = localStorage.getItem('projector-mode');
  if (projPref === 'true') {
    document.body.classList.add('projector-mode');
    const btn = document.getElementById('btn-projector');
    if (btn) {
      btn.classList.add('active-hud');
      btn.style.color = 'var(--teal)';
      btn.style.background = 'var(--teal-dim)';
    }
    resizeProjector();
  }
});

// Fade out loading screen overlay
window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.classList.add('loaded');
    resizeProjector();
  }, 100);
});

// Dynamic left progress bar
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';
progressBar.style.position = 'fixed';
progressBar.style.top = '0';
progressBar.style.left = '0';
progressBar.style.width = '3px';
progressBar.style.backgroundColor = 'var(--teal)';
progressBar.style.height = `${((currentPageIndex + 1) / totalPages) * 100}%`;
progressBar.style.zIndex = '9999';
progressBar.style.transition = 'height 0.3s ease';
document.body.appendChild(progressBar);

// Helper functions to dynamically load KaTeX
function loadCSS(url) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}

function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Load KaTeX dynamically from CDN and run auto-render
loadCSS('https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css');
loadScript('https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js')
  .then(() => loadScript('https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js'))
  .then(() => {
    if (typeof renderMathInElement === 'function') {
      renderMathInElement(document.body, {
        delimiters: [
          {left: '$$', right: '$$', display: true},
          {left: '$', right: '$', display: false},
          {left: '\\(', right: '\\)', display: false},
          {left: '\\[', right: '\\[', display: true}
        ],
        throwOnError: false
      });
    }
  })
  .catch(err => console.error('Error loading KaTeX:', err));
