import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

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
    backgroundColor: '#28a745', // Verde
    color: 'white',
    textDecoration: 'none',
    textAlign: 'center',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    border: 'none',
    cursor: 'pointer',
    marginTop: '1rem',
    opacity: 1,
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  }
};


const CadastroItem = () => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState('Alimento');
  const [expiryDate, setExpiryDate] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!itemName) {
      alert('Por favor, preencha o nome do item.');
      return;
    }

    setIsSubmitting(true);

    const newItem = {
      name: itemName,
      quantity: parseInt(quantity, 10),
      category: category,
      expiryDate: expiryDate || null,
      addedAt: serverTimestamp(), 
    };

    try {
      const docRef = await addDoc(collection(db, "items"), newItem);
      
      console.log("Documento salvo com ID: ", docRef.id);
      alert('Item cadastrado com sucesso!');

      setItemName('');
      setQuantity(1);
      setCategory('Alimento');
      setExpiryDate('');

    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
      alert('Erro ao salvar o item. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Cadastrar Novo Item</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* ... (seus campos de formulário ficam EXATAMENTE iguais) ... */}
        
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
            disabled={isSubmitting} // Desabilita enquanto salva
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
          >
            <option value="Alimento">Alimento Não-Perecível</option>
            <option value="Higiene">Higiene Pessoal</option>
            <option value="Limpeza">Limpeza</option>
            <option value="Roupa">Roupa</option>
            <option value="Movel">Móvel/Eletrodoméstico</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        {/* Campo: Data de Validade */}
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
            disabled={isSubmitting}
          />
        </div>

        {/* Botão de Envio */}
        <button 
          type="submit" 
          style={{
            ...styles.button, 
            ...(isSubmitting ? styles.buttonDisabled : {})
          }}
          disabled={isSubmitting} // Desabilita o botão
        >
          {isSubmitting ? 'Salvando...' : 'Salvar Item no Estoque'}
        </button>
      </form>
    </div>
  );
};

export default CadastroItem;