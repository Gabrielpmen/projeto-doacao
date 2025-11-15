import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { 
  collection, 
  query, 
  onSnapshot, 
  orderBy, 
  doc, 
  updateDoc, 
  getDoc, 
  addDoc, 
  serverTimestamp 
} from "firebase/firestore";

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
    backgroundColor: '#dc3545',
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

const RealizarDoacao = () => {
  const [families, setFamilies] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedFamilyId, setSelectedFamilyId] = useState('');
  const [selectedItemId, setSelectedItemId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);

    const familiesQuery = query(collection(db, "families"), orderBy("name", "asc"));
    const unsubscribeFamilies = onSnapshot(familiesQuery, (querySnapshot) => {
      const familiesData = [];
      querySnapshot.forEach((doc) => {
        familiesData.push({ ...doc.data(), id: doc.id });
      });
      setFamilies(familiesData);
    });
    const itemsQuery = query(collection(db, "items"), orderBy("name", "asc"));
    const unsubscribeItems = onSnapshot(itemsQuery, (querySnapshot) => {
      const itemsData = [];
      querySnapshot.forEach((doc) => {
        const item = doc.data();
        if (item.quantity > 0) {
          itemsData.push({ ...item, id: doc.id });
        }
      });
      setItems(itemsData);
      setLoading(false);
    });

    return () => {
      unsubscribeFamilies();
      unsubscribeItems();
    };
  }, []); 


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!selectedFamilyId || !selectedItemId) {
      alert('Por favor, selecione uma família E um item.');
      setIsSubmitting(false);
      return;
    }

    const requestedQuantity = parseInt(quantity, 10);
    if (requestedQuantity <= 0) {
      alert('A quantidade deve ser pelo menos 1.');
      setIsSubmitting(false);
      return;
    }

    try {
      const itemRef = doc(db, "items", selectedItemId);
      const itemDoc = await getDoc(itemRef);

      if (!itemDoc.exists()) {
        throw new Error("Este item não existe mais!");
      }

      const currentItem = itemDoc.data();

      if (currentItem.quantity < requestedQuantity) {
        alert(`Erro: Estoque insuficiente. 
               Item: ${currentItem.name}
               Disponível: ${currentItem.quantity}
               Solicitado: ${requestedQuantity}`);
        setIsSubmitting(false);
        return;
      }

      const newQuantity = currentItem.quantity - requestedQuantity;
      await updateDoc(itemRef, {
        quantity: newQuantity
      });

      const donationRecord = {
        familyId: selectedFamilyId,
        familyName: families.find(f => f.id === selectedFamilyId)?.name || 'Nome não encontrado',
        itemId: selectedItemId,
        itemName: currentItem.name,
        quantity: requestedQuantity,
        donatedAt: serverTimestamp(),
      };
      await addDoc(collection(db, "donations"), donationRecord);

      console.log('Doação Registrada:', donationRecord);
      alert('Doação registrada com sucesso! Estoque atualizado.');
      setSelectedFamilyId('');
      setSelectedItemId('');
      setQuantity(1);

    } catch (e) {
      console.error("Erro ao registrar doação: ", e);
      alert('Erro ao registrar doação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Realizar Doação (Saída)</h1>
      
      {loading && <p style={{ textAlign: 'center' }}>Carregando dados...</p>}

      {!loading && (
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
              disabled={isSubmitting}
            >
              <option value="" disabled>-- Escolha uma família --</option>
              {families.map((family) => (
                <option key={family.id} value={family.id}>
                  {family.name} ({family.members} membros)
                </option>
              ))}
            </select>
          </div>

          {/* Campo: Selecionar Item */}
          <div>
            <label htmlFor="item" style={styles.label}>2. Selecione o Item (só aparecem itens em estoque):</label>
            <select
              id="item"
              value={selectedItemId}
              onChange={(e) => setSelectedItemId(e.target.value)}
              style={styles.input}
              required
              disabled={isSubmitting}
            >
              <option value="" disabled>-- Escolha um item do estoque --</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
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
            disabled={isSubmitting || loading}
          >
            {isSubmitting ? 'Registrando...' : 'Registrar Doação'}
          </button>
        </form>
      )}
    </div>
  );
};

export default RealizarDoacao;