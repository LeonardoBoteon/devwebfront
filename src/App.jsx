import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ObrasPage from "./components/obras/ObrasPage";
import CategoriasPage from "./components/categorias/CategoriasPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/obras" replace />} />
        <Route path="/obras" element={<ObrasPage />} />
        <Route path="/categorias" element={<CategoriasPage />} />
      </Route>
    </Routes>
  );
}

export default App;
