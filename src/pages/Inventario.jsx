import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

const styles = {
  container: {
    padding: '0 0.5rem',
  },
  pageTitle: {
    textAlign: 'center',
    color: '#333',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  listItem: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
    color: '#007bff',
  },
  itemDetails: {
    fontSize: '0.9rem',
    color: '#555',
    marginTop: '0.25rem',
  },
  itemQuantity: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
  },
  expiryWarning: {
    color: 'red',
    fontWeight: 'bold',
  }
};

const Inventario = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const itemsCollection = collection(db, "items");
    const q = query(itemsCollection, orderBy("addedAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const itemsData = [];
      querySnapshot.forEach((doc) => {
        itemsData.push({ ...doc.data(), id: doc.id });
      });
      
      setItems(itemsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  const formatDate = (dateString) => {
    if (!dateString) {
      return 'N/A';
    }

    const date = (typeof dateString === 'string') ? new Date(dateString) : dateString.toDate();
    
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000)
        .toLocaleDateString('pt-BR');
  };

  const isNearExpiry = (dateString) => {
    if (!dateString) return false;
    const expiry = (typeof dateString === 'string') ? new Date(dateString) : dateString.toDate();
    const today = new Date();
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 90;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Inventário (Estoque)</h1>
      
      {/* 5. Adiciona uma mensagem de "Carregando..." */}
      {loading && <p style={{ textAlign: 'center' }}>Carregando dados...</p>}
      
      {!loading && (
        <ul style={styles.list}>
          {items.length === 0 ? (
            <p style={{ textAlign: 'center' }}>Nenhum item cadastrado ainda.</p>
          ) : (
            items.map((item) => (
              <li key={item.id} style={styles.listItem}>
                {/* Lado Esquerdo: Detalhes */}
                <div>
                  <div style={styles.itemName}>{item.name}</div>
                  <div style={styles.itemDetails}>
                    Categoria: {item.category}
                  </div>
                  <div 
                    style={{
                      ...styles.itemDetails, 
                      ...(isNearExpiry(item.expiryDate) ? styles.expiryWarning : {})
                    }}
                  >
                    Validade: {formatDate(item.expiryDate)}
                  </div>
                </div>
                
                {/* Lado Direito: Quantidade */}
                <div style={styles.itemQuantity}>
                  {item.quantity}
                  <div style={{fontSize: '0.8rem', fontWeight: 'normal'}}>Unid.</div>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Inventario;