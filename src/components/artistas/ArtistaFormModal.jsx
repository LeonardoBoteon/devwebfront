import { useState, useEffect } from "react";
import Modal from "../ui/Modal";

function ArtistaFormModal({ isOpen, onClose, artistaEditando, onSalvar }) {
  const [nome, setNome] = useState("");
  const [ano, setAno] = useState("");
  const [pais, setPais] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (artistaEditando) {
        setNome(artistaEditando.nome || "");
        setAno(artistaEditando.ano || "");
        setPais(artistaEditando.pais || "");
        setDescricao(artistaEditando.descricao || "");
      } else {
        setNome("");
        setAno("");
        setPais("");
        setDescricao("");
      }
    }
  }, [isOpen, artistaEditando]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const artista = { nome, ano, pais, descricao };
    if (artistaEditando) artista.id = artistaEditando.id;
    onSalvar(artista);
  };

  const inputClass =
    "w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={artistaEditando ? "Editar Artista" : "Novo Artista"}
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo Nome — obrigatório */}
        <div>
          <label
            htmlFor="nomeArtista"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nome do Artista
          </label>
          <input
            id="nomeArtista"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Leonardo da Vinci"
            required
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Campo Ano — opcional */}
          <div>
            <label
              htmlFor="anoArtista"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Ano <span className="text-gray-400 font-normal">(opcional)</span>
            </label>
            <input
              id="anoArtista"
              type="text"
              value={ano}
              onChange={(e) => setAno(e.target.value)}
              placeholder="Ex: 1452"
              className={inputClass}
            />
          </div>

          {/* Campo País — opcional */}
          <div>
            <label
              htmlFor="paisArtista"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              País <span className="text-gray-400 font-normal">(opcional)</span>
            </label>
            <input
              id="paisArtista"
              type="text"
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              placeholder="Ex: Itália"
              className={inputClass}
            />
          </div>
        </div>

        {/* Campo Descrição — opcional */}
        <div>
          <label
            htmlFor="descArtista"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Descrição{" "}
            <span className="text-gray-400 font-normal">(opcional)</span>
          </label>
          <textarea
            id="descArtista"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Ex: Pintor e escultor do Renascimento..."
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Botões de ação */}
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
            {artistaEditando ? "Atualizar" : "Cadastrar"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ArtistaFormModal;
