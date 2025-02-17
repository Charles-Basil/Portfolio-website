const darkMode = () => {
  const themeToggleBtns = document.querySelectorAll("#theme-toggle");
// State
  const theme = localStorage.getItem('theme');

// on mount
  theme && document.body.classList.add('light-mode');
//   handlers
const handleThemeToggle = () => {
    document.body.classList.toggle('light-mode');
      if (document.body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light-mode');
        
      } else {
        localStorage.removeItem('theme');
        document.body.removeAttribute('class');
      }
};
// for each events
  themeToggleBtns.forEach((btn) => 
    btn.addEventListener("click",  handleThemeToggle)
  );
};

export default darkMode;