// src/components/Layout.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

// Estilos CSS-in-JS (simples, sem arquivos CSS extras)
const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    flex: 1, // Faz o conteúdo principal crescer e ocupar o espaço
    padding: '1rem',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-around', // Espaça os links igualmente
    padding: '1rem',
    backgroundColor: '#f0f0f0',
    borderTop: '1px solid #ccc',
    position: 'fixed', // Fixa o menu na parte inferior
    bottom: 0,
    width: '100%',
    boxSizing: 'border-box', // Garante que o padding não quebre o layout
  },
  navLink: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold',
    fontSize: '0.8rem',
    textAlign: 'center',
  },
  // Estilo para o link ativo (página atual)
  activeLink: {
    color: '#007bff',
  }
};

// Componente Layout
const Layout = ({ children }) => {
  return (
    <div style={styles.layout}>
      {/* O 'children' é a página que será exibida */}
      <main style={styles.main}>
        {children}
      </main>

      {/* Navegação Fixa na Base */}
      <nav style={styles.nav}>
        <NavLink 
          to="/" 
          style={({ isActive }) => (isActive ? {...styles.navLink, ...styles.activeLink} : styles.navLink)}
        >
          Início
        </NavLink>
        <NavLink 
          to="/cadastrar-item" 
          style={({ isActive }) => (isActive ? {...styles.navLink, ...styles.activeLink} : styles.navLink)}
        >
          Cadastrar
        </NavLink>
        <NavLink 
          to="/realizar-doacao" 
          style={({ isActive }) => (isActive ? {...styles.navLink, ...styles.activeLink} : styles.navLink)}
        >
          Doar
        </NavLink>
        <NavLink 
          to="/inventario" 
          style={({ isActive }) => (isActive ? {...styles.navLink, ...styles.activeLink} : styles.navLink)}
        >
          Estoque
        </NavLink>
      </nav>
    </div>
  );
};

export default Layout;