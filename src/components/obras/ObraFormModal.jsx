import { useState, useEffect } from "react";
import Modal from "../ui/Modal";

function ObraFormModal({
  isOpen,
  onClose,
  obraEditando,
  onSalvar,
  categorias,
  artistas,
  galerias,
}) {
  const [nome, setNome] = useState("");
  const [ano, setAno] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [artistaId, setArtistaId] = useState("");
  const [galeriaId, setGaleriaId] = useState("");

  // Preenche ou limpa o formulário quando o modal abre
  useEffect(() => {
    if (isOpen) {
      if (obraEditando) {
        setNome(obraEditando.nome || "");
        setAno(obraEditando.ano?.toString() || "");
        setCategoriaId(obraEditando.categoriaId || "");
        setArtistaId(obraEditando.artistaId || "");
        setGaleriaId(obraEditando.galeriaId || "");
      } else {
        setNome("");
        setAno("");
        setCategoriaId("");
        setArtistaId("");
        setGaleriaId("");
      }
    }
  }, [isOpen, obraEditando]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const obra = {
      nome,
      ano: parseInt(ano),
    };

    if (categoriaId) {
      obra.categoriaId = parseInt(categoriaId);
    }

    if (artistaId) {
      obra.artistaId = parseInt(artistaId);
    }

    if (galeriaId) {
      obra.galeriaId = parseInt(galeriaId);
    }

    if (obraEditando) {
      obra.id = obraEditando.id;
      obra.categoriaId = obraEditando.categoriaId;
      obra.artistaId = obraEditando.artistaId;
      obra.galeriaId = obraEditando.galeriaId;
    }

    onSalvar(obra);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={obraEditando ? "Editar Obra" : "Nova Obra"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nome da Obra
          </label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Noite Estrelada"
            required
            className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="ano"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Ano
            </label>
            <input
              id="ano"
              type="number"
              min="0"
              value={ano}
              onChange={(e) => setAno(e.target.value)}
              placeholder="Ex: 1990"
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
            />
          </div>
        </div>

        {categorias && categorias.length > 0 && (
          <div>
            <label
              htmlFor="categoria"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Categoria
            </label>
            <select
              id="categoria"
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              required
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow bg-white"
            >
              <option value="">-- Selecione uma categoria --</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>
          </div>
        )}

        {artistas && artistas.length > 0 && (
          <div>
            <label
              htmlFor="artista"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Artista
            </label>
            <select
              id="artista"
              value={artistaId}
              onChange={(e) => setArtistaId(e.target.value)}
              required
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow bg-white"
            >
              <option value="">-- Selecione um artista --</option>

              {artistas.map((art) => (
                <option key={art.id} value={art.id}>
                  {art.nome}
                </option>
              ))}
            </select>
          </div>
        )}

        {galerias && galerias.length > 0 && (
          <div>
            <label
              htmlFor="galeria"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Galeria
            </label>
            <select
              id="galeria"
              value={galeriaId}
              onChange={(e) => setGaleriaId(e.target.value)}
              required
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow bg-white"
            >
              <option value="">-- Selecione uma galeria --</option>
              {galerias.map((gal) => (
                <option key={gal.id} value={gal.id}>
                  {gal.nome}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Botões do formulário */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            {obraEditando ? "Atualizar" : "Cadastrar"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ObraFormModal;
