import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ObrasPage from "./components/obras/ObrasPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/obras" replace />} />
        <Route path="/obras" element={<ObrasPage />} />
        {/* Leva 3: rotas para Categorias e Detalhes */}
        {/* <Route path="/categorias" element={<CategoriasPage />} /> */}
        {/* <Route path="/detalhes" element={<DetalheProdutoPage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
