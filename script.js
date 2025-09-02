document.querySelectorAll('.nav-links a, .btn').forEach(link => {
  link.addEventListener('click', function (e) {
    const target = this.getAttribute('href');
    if (target && target.startsWith('#')) {
      e.preventDefault();
      document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
    }
  });
});
