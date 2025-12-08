import React, { createContext, useState, useEffect, useContext } from 'react';

// Criando o contexto
const ThemeContext = createContext();

// Provider do contexto
export const ThemeProvider = ({ children }) => {
  // Estado do tema, inicializado com o valor do localStorage ou "light"
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Atualiza o localStorage e o body sempre que o tema mudar
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // Função para alternar o tema
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para usar o ThemeContext facilmente
export const useTheme = () => useContext(ThemeContext);
