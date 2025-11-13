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
  textarea: { // Adicionando estilo para anotações
    width: '100%',
    padding: '0.8rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    minHeight: '80px',
  },
  button: {
    padding: '1.2rem',
    backgroundColor: '#007bff', // Azul padrão
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

const CadastroFamilia = ({ setFamilies }) => {
  const [responsibleName, setResponsibleName] = useState('');
  const [contact, setContact] = useState(''); 
  const [members, setMembers] = useState(1);
  const [notes, setNotes] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!responsibleName) {
      alert('Por favor, preencha o nome do responsável.');
      return;
    }

    const newFamily = {
      id: Date.now(), // Adiciona um ID único (baseado no tempo)
      name: responsibleName,
      contact: contact,
      members: parseInt(members, 10),
      notes: notes,
      registeredAt: new Date().toISOString(),
    };

    setFamilies(currentFamilies => [newFamily, ...currentFamilies]); // Adiciona no topo da lista

    alert('Família cadastrada com sucesso!');

    setResponsibleName('');
    setContact('');
    setMembers(1);
    setNotes('');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Cadastrar Nova Família</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Campo: Nome do Responsável */}
        <div>
          <label htmlFor="responsibleName" style={styles.label}>Nome do Responsável:</label>
          <input
            type="text"
            id="responsibleName"
            value={responsibleName}
            onChange={(e) => setResponsibleName(e.target.value)}
            style={styles.input}
            placeholder="Ex: Maria da Silva"
            required
          />
        </div>

        {/* Campo: Contato (Telefone ou Endereço) */}
        <div>
          <label htmlFor="contact" style={styles.label}>Contato (Telefone/Endereço):</label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            style={styles.input}
            placeholder="Ex: (34) 99999-9999 ou Rua..."
          />
        </div>

        {/* Campo: Número de Membros */}
        <div>
          <label htmlFor="members" style={styles.label}>Nº de Membros na Família:</label>
          <input
            type="number"
            id="members"
            value={members}
            onChange={(e) => setMembers(e.target.value)}
            style={styles.input}
            min="1"
            required
          />
        </div>

        {/* Campo: Anotações (Importante para o histórico) */}
        <div>
          <label htmlFor="notes" style={styles.label}>
            Anotações (Ex: precisa de fralda M):
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={styles.textarea}
            placeholder="Qualquer informação relevante sobre a família..."
          />
        </div>

        {/* Botão de Envio */}
        <button type="submit" style={styles.button}>
          Salvar Família
        </button>
      </form>
    </div>
  );
};

export default CadastroFamilia;