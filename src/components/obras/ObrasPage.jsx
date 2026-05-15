import { useState, useEffect } from "react";
import { Plus, RefreshCw, Images } from "lucide-react";
import {
  getObras,
  criarObra,
  atualizarObra,
  deletarObra,
} from "../../services/obraService";
import { useToast } from "../../hooks/useToast";
import ObraTable from "./ObraTable";
import ObraFormModal from "./ObraFormModal";
import ObraDeleteDialog from "./ObraDeleteDialog";

function ObrasPage() {
  const [obras, setObras] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Controle dos modais
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [obraEditando, setObraEditando] = useState(null);
  const [obraDeletando, setObraDeletando] = useState(null);

  const toast = useToast();

  // Carrega produtos ao montar o componente
  useEffect(() => {
    carregarObras();
  }, []);

  const carregarObras = async () => {
    try {
      setLoading(true);
      const data = await getObras();
      setObras(data);
    } catch (error) {
      toast.error(
        "Não foi possível carregar as obras. Verifique se a API está rodando.",
      );
      console.error("Erro ao carregar obras:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNovo = () => {
    setObraEditando(null);
    setIsFormModalOpen(true);
  };

  const handleEditar = (obra) => {
    setObraEditando(obra);
    setIsFormModalOpen(true);
  };

  const handleSalvar = async (obra) => {
    try {
      if (obraEditando) {
        await atualizarObra(obra);
        toast.success(`Obra "${obra.nome}" atualizada com sucesso!`);
      } else {
        await criarObra(obra);
        toast.success(`Obra "${obra.nome}" cadastrada com sucesso!`);
      }
      setIsFormModalOpen(false);
      setObraEditando(null);
      await carregarObras();
    } catch (error) {
      toast.error(
        "Erro ao salvar a obra. Verifique os dados e tente novamente.",
      );
      console.error("Erro ao salvar:", error);
    }
  };

  const handleConfirmarDelete = (obra) => {
    setObraDeletando(obra);
    setIsDeleteDialogOpen(true);
  };

  const handleDeletar = async () => {
    try {
      await deletarObra(obraDeletando.id);
      toast.success(`Obra "${obraDeletando.nome}" removida com sucesso!`);
      setIsDeleteDialogOpen(false);
      setObraeletando(null);
      await carregarObras();
    } catch (error) {
      toast.error("Erro ao deletar a obra.");
      console.error("Erro ao deletar:", error);
    }
  };

  return (
    <div className="p-6">
      {/* Header da página */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Images className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Obras</h1>
            <p className="text-sm text-gray-500">
              {obras.length}{" "}
              {obras.length === 1 ? "obra cadastrada" : "obras cadastradas"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={carregarObras}
            title="Recarregar lista"
            className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={handleNovo}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Nova Obra
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="w-6 h-6 text-blue-500 animate-spin" />
          <span className="ml-3 text-gray-500">Carregando obras...</span>
        </div>
      ) : (
        <ObraTable
          obras={obras}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onEditar={handleEditar}
          onDeletar={handleConfirmarDelete}
        />
      )}

      {/* Modal de formulário (criar/editar) */}
      <ObraFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setObraEditando(null);
        }}
        obraEditando={obraEditando}
        onSalvar={handleSalvar}
      />

      {/* Diálogo de confirmação de exclusão */}
      <ObraDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setObraDeletando(null);
        }}
        onConfirm={handleDeletar}
        obra={obraDeletando}
      />
    </div>
  );
}

export default ObrasPage;
