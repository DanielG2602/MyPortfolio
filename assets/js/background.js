const toggleBtn = document.getElementById('themeToggle');
const logo = document.getElementById('logo');

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');

    // Troca de ícone
    toggleBtn.textContent = isDark ? '🌕' : '☀️';

    // Troca de logo
    logo.src = isDark ? 'assets/images/logoPortBranca.png' : 'assets/images/logoPort.png';
});

