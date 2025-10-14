const darkMode = () => {
  const themeToggleBtns = document.querySelectorAll("#theme-toggle");
  // State
  const theme = localStorage.getItem('theme');

  // on mount
  theme && document.body.classList.add('light-mode');

  // Update icon visibility based on current theme
  const updateIcons = () => {
    const isLightMode = document.body.classList.contains('light-mode');
    themeToggleBtns.forEach(btn => {
      const sunIcon = btn.querySelector('.sun-icon');
      const moonIcon = btn.querySelector('.moon-icon');

      if (sunIcon && moonIcon) {
        if (isLightMode) {
          sunIcon.style.opacity = '1';
          sunIcon.style.transform = 'rotate(0deg) scale(1)';
          moonIcon.style.opacity = '0';
          moonIcon.style.transform = 'rotate(180deg) scale(0.8)';
        } else {
          sunIcon.style.opacity = '0';
          sunIcon.style.transform = 'rotate(-180deg) scale(0.8)';
          moonIcon.style.opacity = '1';
          moonIcon.style.transform = 'rotate(0deg) scale(1)';
        }
      }
    });
  };

  // Initial icon update
  updateIcons();

  // handlers
  const handleThemeToggle = () => {
    document.body.classList.toggle('light-mode');

    // Add smooth transition class
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';

    if (document.body.classList.contains('light-mode')) {
      localStorage.setItem('theme', 'light-mode');
    } else {
      localStorage.removeItem('theme');
    }

    // Update icons after theme change
    setTimeout(updateIcons, 50);
  };

  // for each events
  themeToggleBtns.forEach((btn) =>
    btn.addEventListener("click", handleThemeToggle)
  );
};

export default darkMode;