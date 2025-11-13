// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Estilos simples para os botões do painel
const styles = {
  pageTitle: {
    textAlign: 'center',
    color: '#333',
  },
  dashboard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem', // Espaçamento entre os botões
  },
  button: {
    display: 'block',
    padding: '1.5rem',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    textAlign: 'center',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  }
};

const Home = () => {
  return (
    <div>
      <h1 style={styles.pageTitle}>Ação Social</h1>
      <div style={styles.dashboard}>
        {/* Botão para a ação principal: Cadastrar Itens */}
        <Link to="/cadastrar-item" style={styles.button}>
          Receber Doação (Cadastrar Item)
        </Link>
        
        {/* Botão para a segunda ação principal: Realizar Doação */}
        <Link to="/realizar-doacao" style={styles.button}>
          Entregar Doação (Realizar)
        </Link>
        
        <hr />
        
        {/* Ações secundárias */}
        <Link to="/inventario" style={{...styles.button, backgroundColor: '#6c757d'}}>
          Ver Inventário (Estoque)
        </Link>
        
        <Link to="/cadastrar-familia" style={{...styles.button, backgroundColor: '#6c757d'}}>
          Gerenciar Famílias
        </Link>
      </div>
    </div>
  );
};

export default Home;