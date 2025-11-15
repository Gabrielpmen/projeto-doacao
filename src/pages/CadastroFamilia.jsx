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
  textarea: {
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
    backgroundColor: '#007bff', // Azul
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

const CadastroFamilia = () => {
  const [responsibleName, setResponsibleName] = useState('');
  const [contact, setContact] = useState('');
  const [members, setMembers] = useState(1);
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!responsibleName) {
      alert('Por favor, preencha o nome do responsável.');
      return;
    }
    
    setIsSubmitting(true);

    const newFamily = {
      name: responsibleName,
      contact: contact,
      members: parseInt(members, 10),
      notes: notes,
      registeredAt: serverTimestamp(), 
    };

    try {
      const docRef = await addDoc(collection(db, "families"), newFamily);
      
      console.log("Documento salvo com ID: ", docRef.id);
      alert('Família cadastrada com sucesso!');

      setResponsibleName('');
      setContact('');
      setMembers(1);
      setNotes('');

    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
      alert('Erro ao salvar a família. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
          />
        </div>

        {/* Campo: Anotações */}
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
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Salvando...' : 'Salvar Família'}
        </button>
      </form>
    </div>
  );
};

export default CadastroFamilia;