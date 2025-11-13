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
    backgroundColor: '#dc3545', // Vermelho para "Doar" (saída)
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

const RealizarDoacao = ({ items, setItems, families }) => {

  const [selectedFamilyId, setSelectedFamilyId] = useState('');
  const [selectedItemId, setSelectedItemId] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedFamilyId || !selectedItemId) {
      alert('Por favor, selecione uma família E um item.');
      return;
    }

    const selectedItem = items.find(item => item.id === parseInt(selectedItemId, 10));
    const requestedQuantity = parseInt(quantity, 10);

    if (requestedQuantity <= 0) {
      alert('A quantidade deve ser pelo menos 1.');
      return;
    }

    if (!selectedItem || selectedItem.quantity < requestedQuantity) {
       alert(`Erro: Estoque insuficiente. 
             Item: ${selectedItem ? selectedItem.name : 'Desconhecido'}
             Disponível: ${selectedItem ? selectedItem.quantity : 0}
             Solicitado: ${requestedQuantity}`);
      return;
    }


    const donationRecord = {
      familyId: parseInt(selectedFamilyId, 10),
      itemId: parseInt(selectedItemId, 10),
      quantity: requestedQuantity,
      donatedAt: new Date().toISOString(),
    };

    console.log('Doação Registrada:', donationRecord);


    setItems(currentItems =>
      currentItems.map(item =>
        item.id === selectedItem.id
          ? { ...item, quantity: item.quantity - requestedQuantity }
          : item
      )
    );

    alert('Doação registrada com sucesso! Estoque atualizado.');

    // 4. Limpa o formulário
    setSelectedFamilyId('');
    setSelectedItemId('');
    setQuantity(1);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Realizar Doação (Saída)</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Campo: Selecionar Família */}
        <div>
          <label htmlFor="family" style={styles.label}>1. Selecione a Família:</label>
          <select
            id="family"
            value={selectedFamilyId}
            onChange={(e) => setSelectedFamilyId(e.target.value)}
            style={styles.input}
            required
          >
            <option value="" disabled>-- Escolha uma família --</option>
            {/* Agora lê 'families' que veio do App.jsx */}
            {families.map((family) => (
              <option key={family.id} value={family.id}>
                {family.name} ({family.members} membros)
              </option>
            ))}
          </select>
        </div>

        {/* Campo: Selecionar Item */}
        <div>
          <label htmlFor="item" style={styles.label}>2. Selecione o Item:</label>
          <select
            id="item"
            value={selectedItemId}
            onChange={(e) => setSelectedItemId(e.target.value)}
            style={styles.input}
            required
          >
            <option value="" disabled>-- Escolha um item do estoque --</option>
            {/* Agora lê 'items' que veio do App.jsx */}
            {items.map((item) => (
              <option key={item.id} value={item.id} disabled={item.quantity === 0}>
                {item.name} (Disponível: {item.quantity})
              </option>
            ))}
          </select>
        </div>

        {/* Campo: Quantidade */}
        <div>
          <label htmlFor="quantity" style={styles.label}>3. Quantidade a Doar:</label>
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

        {/* Botão de Envio */}
        <button type="submit" style={styles.button}>
          Registrar Doação
        </button>
      </form>
    </div>
  );
};

export default RealizarDoacao;