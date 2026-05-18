import { useState, useEffect } from "react";
import Modal from "../ui/Modal";

function GaleriaFormModal({ isOpen, onClose, galeriaEditando, onSalvar }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [site, setSite] = useState("");
  const [endereco, setEndereco] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (galeriaEditando) {
        setNome(galeriaEditando.nome || "");
        setDescricao(galeriaEditando.descricao || "");
        setTelefone(galeriaEditando.telefone || "");
        setEmail(galeriaEditando.email || "");
        setSite(galeriaEditando.site || "");
        setEndereco(galeriaEditando.endereco || "");
      } else {
        setNome("");
        setDescricao("");
        setTelefone("");
        setEmail("");
        setSite("");
        setEndereco("");
      }
    }
  }, [isOpen, galeriaEditando]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const galeria = { nome, descricao, telefone, email, site, endereco };
    if (galeriaEditando) galeria.id = galeriaEditando.id;
    onSalvar(galeria);
  };

  const inputClass =
    "w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={galeriaEditando ? "Editar Galeria" : "Nova Galeria"}
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome da Galeria
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Galeria Arte Moderna"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Endereço
          </label>
          <input
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            placeholder="Ex: Rua das Flores, 123 - Florianópolis"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição{" "}
            <span className="text-gray-400 font-normal">(opcional)</span>
          </label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Ex: Galeria especializada em arte contemporânea..."
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefone{" "}
              <span className="text-gray-400 font-normal">(opcional)</span>
            </label>
            <input
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="Ex: (48) 99999-9999"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-mail{" "}
              <span className="text-gray-400 font-normal">(opcional)</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex: contato@galeria.com"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Site{" "}
            <span className="text-gray-400 font-normal">(opcional)</span>
          </label>
          <input
            type="text"
            value={site}
            onChange={(e) => setSite(e.target.value)}
            placeholder="Ex: www.galeria.com.br"
            className={inputClass}
          />
        </div>

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
            {galeriaEditando ? "Atualizar" : "Cadastrar"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default GaleriaFormModal;
