import React from 'react' 
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import CadastroItem from './pages/CadastroItem'
import CadastroFamilia from './pages/CadastroFamilia'
import RealizarDoacao from './pages/RealizarDoacao'
import Inventario from './pages/Inventario'
import Layout from './components/Layout'


function App() {


  return (
    <BrowserRouter>
      <Layout> 
        <Routes>
          {/* As rotas agora são mais simples e não passam props de estado */}
          <Route path="/" element={<Home />} />
          
          <Route 
            path="/cadastrar-item" 
            element={<CadastroItem />} 
          />
          <Route 
            path="/cadastrar-familia" 
            element={<CadastroFamilia />} 
          />
          <Route 
            path="/realizar-doacao" 
            element={<RealizarDoacao />} 
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