import React, { useState } from 'react' // 1. Importe o useState
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import CadastroItem from './pages/CadastroItem'
import CadastroFamilia from './pages/CadastroFamilia'
import RealizarDoacao from './pages/RealizarDoacao'
import Inventario from './pages/Inventario'
import Layout from './components/Layout'

const mockInventory = [
  { id: 1, name: 'Arroz (5kg)', quantity: 20, category: 'Alimento', expiryDate: '2026-10-30' },
  { id: 2, name: 'Feijão (1kg)', quantity: 35, category: 'Alimento', expiryDate: '2027-05-15' },
  { id: 3, name: 'Casaco de Inverno (M)', quantity: 5, category: 'Roupa', expiryDate: null },
  { id: 4, name: 'Pasta de Dente', quantity: 50, category: 'Higiene', expiryDate: '2025-12-01' },
];
const mockFamilies = [
  { id: 1, name: 'Família Silva (Maria)', members: 4, notes: '' },
  { id: 2, name: 'João Souza', members: 1, notes: 'Precisa fralda G' },
  { id: 3, name: 'Família Costa (Ana)', members: 3, notes: '' },
];


function App() {
  const [items, setItems] = useState(mockInventory);
  const [families, setFamilies] = useState(mockFamilies);

  return (
    <BrowserRouter>
      <Layout> 
        <Routes>
          {/* 4. Passe o estado (e as funções de mudar o estado) para as páginas */}
          <Route path="/" element={<Home />} />
          
          <Route 
            path="/cadastrar-item" 
            element={<CadastroItem />}
          />
          <Route 
            path="/cadastrar-familia" 
            element={<CadastroFamilia setFamilies={setFamilies} />} 
          />
          <Route 
            path="/realizar-doacao" 
            element={<RealizarDoacao items={items} setItems={setItems} families={families} />} 
          />
          <Route 
            path="/inventario" 
            element={<Inventario />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App