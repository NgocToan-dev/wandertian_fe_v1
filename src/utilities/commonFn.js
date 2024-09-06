const toggleDarkMode = (darkMode) => {
  localStorage.setItem("darkMode", darkMode);
  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

export { toggleDarkMode };
