// src/pages/CadastroItem.jsx
import React, { useState } from 'react';

const styles = {
  container: {
    padding: '0 1rem', 
  },
  pageTitle: {
    textAlign: 'center',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem', 
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
    marginBottom: '0.25rem',
    display: 'block', 
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxSizing: 'border-box', 
  },
  button: {
    padding: '1.2rem',
    backgroundColor: '#28a745', 
    color: 'white',
    textDecoration: 'none',
    textAlign: 'center',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    border: 'none',
    cursor: 'pointer',
    marginTop: '1rem',
  }
};

const CadastroItem = () => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState('Alimento'); // Categoria padrão
  const [expiryDate, setExpiryDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o recarregamento da página

    if (!itemName) {
      alert('Por favor, preencha o nome do item.');
      return;
    }

    const newItem = {
      name: itemName,
      quantity: parseInt(quantity, 10), // Garante que é um número
      category: category,
      expiryDate: expiryDate || null, // Define como nulo se estiver vazio
      addedAt: new Date().toISOString(), // Data do cadastro
    };


    console.log('Novo Item Cadastrado:', newItem);


    alert('Item cadastrado com sucesso!');
    setItemName('');
    setQuantity(1);
    setCategory('Alimento');
    setExpiryDate('');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Cadastrar Novo Item</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Campo: Nome do Item */}
        <div>
          <label htmlFor="itemName" style={styles.label}>Nome do Item:</label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            style={styles.input}
            placeholder="Ex: Arroz (5kg)"
            required
          />
        </div>

        {/* Campo: Quantidade */}
        <div>
          <label htmlFor="quantity" style={styles.label}>Quantidade (Unidades):</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={styles.input}
            min="1"
            required
          />
        </div>

        {/* Campo: Categoria */}
        <div>
          <label htmlFor="category" style={styles.label}>Categoria:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.input}
          >
            <option value="Alimento">Alimento Não-Perecível</option>
            <option value="Higiene">Higiene Pessoal</option>
            <option value="Limpeza">Limpeza</option>
            <option value="Roupa">Roupa</option>
            <option value="Movel">Móvel/Eletrodoméstico</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        {/* Campo: Data de Validade (Importante para ODS 12 e desperdício) */}
        <div>
          <label htmlFor="expiryDate" style={styles.label}>
            Data de Validade (se houver):
          </label>
          <input
            type="date"
            id="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* Botão de Envio */}
        <button type="submit" style={styles.button}>
          Salvar Item no Estoque
        </button>
      </form>
    </div>
  );
};

export default CadastroItem;