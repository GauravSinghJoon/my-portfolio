document.querySelectorAll('.nav-links a, .btn').forEach(link => {
  link.addEventListener('click', function (e) {
    const target = this.getAttribute('href');
    if (target && target.startsWith('#')) {
      e.preventDefault();
      document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

window.addEventListener('DOMContentLoaded', function() {
  const section = document.getElementById('home');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
});

const projects = [
  {
    title: 'Weather Application',
    image: 'images/weather-app.png',
    description: 'JavaScript, OpenWeatherMap API<br>Dynamic UI showing real-time weather conditions by location.',
    link: 'https://weathersitegsj.netlify.app/'
  },
  {
    title: 'PathWise Career Finder',
    image: 'images/pathwise.png',
    description: 'Python, Flask, Word2Vec<br>Interactive career guidance tool using NLP and AI similarity scoring.'
  },
  {
    title: 'Hotel Management System',
    image: 'images/hotel-mgmt.png',
    description: 'Python, Tkinter<br>GUI for room booking, payments, and staff management.'
  }
];

let idx = 0,
    autoScroll,
    scrollPaused = false;
const AUTOSCROLL_INTERVAL = 6500;

function showCard(index, fast = false) {
  const cardContainer = document.querySelector('.carousel-card');
  const existingCard = cardContainer.querySelector('.project-card');
  if (existingCard && !fast) {
    cardContainer.style.height = existingCard.offsetHeight + 'px';

    existingCard.classList.remove('fade-in');
    existingCard.classList.add('fade-out');
    existingCard.addEventListener('animationend', () => {
      renderProjectCard(index, cardContainer);
      cardContainer.style.height = 'auto'; // Reset height after new card renders
    }, { once: true });
  } else {
    renderProjectCard(index, cardContainer);
  }
  updateDots(index);
}

function renderProjectCard(index, container) {
  const p = projects[index];
  container.innerHTML = `
    <div class="project-card fade-in">
      ${
        p.link
          ? `<a href="${p.link}" target="_blank" rel="noopener"><img src="${p.image}" alt="${p.title}"></a>`
          : `<img src="${p.image}" alt="${p.title}">`
      }
      <h3>${p.title}</h3>
      <p>${p.description}</p>
    </div>
  `;
}

function updateDots(index) {
  const dotsContainer = document.querySelector('.carousel-dots');
  dotsContainer.innerHTML = '';
  projects.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === index ? ' active' : '');
    dot.setAttribute('aria-label', `Project ${i + 1}`);
    dot.onclick = () => {
      idx = i;
      scrollPaused = true;
      showCard(idx);
      resetAutoScroll();
    };
    dotsContainer.appendChild(dot);
  });
}

function startAutoScroll() {
  autoScroll = setInterval(() => {
    if (!scrollPaused) {
      idx = (idx + 1) % projects.length;
      showCard(idx);
    }
  }, AUTOSCROLL_INTERVAL);
}

function resetAutoScroll() {
  clearInterval(autoScroll);
  scrollPaused = false;
  startAutoScroll();
}

showCard(idx, true);
startAutoScroll();

const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach(r => revealObserver.observe(r));

window.addEventListener('scroll', () => {
  document
    .querySelectorAll('.navbar-pc, .navbar-mobile')
    .forEach(nav => nav.classList.toggle('scrolled', window.scrollY > 50));
});
window.addEventListener('load', () => {
  const intro = document.getElementById('intro-screen');

  // Start fade-out at 1.2s
  setTimeout(() => {
    intro.classList.add('hide');

    // Trigger hero animations AFTER intro starts fading
    document.body.classList.add('intro-done');
  }, 1200);

  // Remove from DOM after fade-out completes
  setTimeout(() => {
    intro.remove();
  }, 2000);
});
