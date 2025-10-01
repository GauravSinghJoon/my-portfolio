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
  const section = document.getElementById('about');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
});
const projects = [
  {
    title: 'Weather Application',
    image: 'images/weather-app.png',
    description: 'JavaScript, OpenWeatherMap API<br>Dynamic UI showing real-time weather conditions by location.'
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
    // Fix the container height while animating
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
      <img src="${p.image}" alt="${p.title}">
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
