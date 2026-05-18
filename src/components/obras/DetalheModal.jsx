import { useState, useEffect } from "react";
import { FileText, Save, Trash2, Loader } from "lucide-react";
import Modal from "../ui/Modal";
import {
  getDetalhePorObra,
  criarDetalhe,
  atualizarDetalhe,
  deletarDetalhe,
} from "../../services/detalheObraService";
import { useToast } from "../../hooks/useToast";

function DetalheModal({ isOpen, onClose, obra }) {
  const [detalhe, setDetalhe] = useState(null);

  const [loading, setLoading] = useState(false);

  const [existe, setExiste] = useState(false);

  const [descricao, setDescricao] = useState("");
  const [material, setMaterial] = useState("");
  const [tamanho, setTamanho] = useState("");

  const toast = useToast();

  useEffect(() => {
    if (isOpen && obra) {
      carregarDetalhe();
    }
  }, [isOpen, obra]);

  const carregarDetalhe = async () => {
    try {
      setLoading(true);
      const data = await getDetalhePorObra(obra.id);

      setDetalhe(data);
      setExiste(true);

      setDescricao(data.descricao || "");
      setMaterial(data.material || "");
      setTamanho(data.tamanho || "");
    } catch (error) {
      if (error.response?.status === 404) {
        setDetalhe(null);
        setExiste(false);
        setDescricao("");
        setMaterial("");
        setTamanho("");
      } else {
        toast.error("Erro ao carregar detalhes da obra.");
        console.error("Erro:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    try {
      const dados = {
        descricao,
        material,
        tamanho,
        obraId: obra.id,
      };

      if (existe && detalhe) {
        dados.id = detalhe.id;
        await atualizarDetalhe(detalhe.id, dados);
        toast.success("Detalhes atualizados com sucesso!");
      } else {
        await criarDetalhe(dados);
        toast.success("Detalhes cadastrados com sucesso!");
        setExiste(true);
      }

      await carregarDetalhe();
    } catch (error) {
      toast.error("Erro ao salvar os detalhes.");
      console.error("Erro:", error);
    }
  };

  const handleDeletar = async () => {
    if (!detalhe) return;
    try {
      await deletarDetalhe(detalhe.id);
      toast.success("Detalhes removidos com sucesso!");

      setDetalhe(null);
      setExiste(false);
      setDescricao("");
      setMaterial("");
      setTamanho("");
    } catch (error) {
      toast.error("Erro ao remover os detalhes.");
      console.error("Erro:", error);
    }
  };

  if (!obra) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Detalhes — ${obra.nome}`}
      size="lg"
    >
      {/* Estado de carregamento */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="w-6 h-6 text-blue-500 animate-spin" />
          <span className="ml-3 text-gray-500">Carregando detalhes...</span>
        </div>
      ) : (
        <form onSubmit={handleSalvar} className="space-y-4">
          {/* ============================================================= */}
          {/* BANNER DE STATUS                                               */}
          {/*                                                                */}
          {/* Muda de cor e texto baseado no estado:                         */}
          {/* - Verde: "Este produto já possui detalhes cadastrados"         */}
          {/* - Amarelo: "Este produto ainda não possui detalhes"            */}
          {/*                                                                */}
          {/* Isso dá ao usuário um feedback visual imediato sobre o que     */}
          {/* está acontecendo — se está criando ou editando.                */}
          {/* ============================================================= */}
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
              existe
                ? "bg-green-50 text-green-700"
                : "bg-yellow-50 text-yellow-700"
            }`}
          >
            <FileText className="w-4 h-4" />
            {existe
              ? "Esta obra já possui detalhes cadastrados. Edite abaixo."
              : "Esta obra ainda não possui detalhes. Preencha abaixo para cadastrar."}
          </div>

          {/* Campo Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex: Obra surrealista do século XX"
              rows={3}
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow resize-none"
            />
          </div>

          {/* Campo Material */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Material
            </label>
            <input
              type="text"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              placeholder="Ex: Pintura em óleo"
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
            />
          </div>

          {/* Campo Tamanho */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tamanho
            </label>
            <input
              type="text"
              value={tamanho}
              onChange={(e) => setTamanho(e.target.value)}
              placeholder="Ex: 20 x 10 cm"
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
            />
          </div>

          {/* Barra de ações */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            {/* Botão "Remover Detalhes" — só aparece se o detalhe já existe */}
            {existe && (
              <button
                type="button"
                onClick={handleDeletar}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Remover Detalhes
              </button>
            )}

            {/* Espaçador flexível — empurra os botões seguintes para a direita */}
            <div className="flex-1" />

            {/* Botão Fechar */}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Fechar
            </button>

            {/* Botão Salvar — texto muda baseado no estado */}
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              {existe ? "Atualizar" : "Cadastrar"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

export default DetalheModal;
