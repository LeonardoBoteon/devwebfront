import { useState, useEffect } from "react";
import { Plus, RefreshCw, Building2 } from "lucide-react";
import {
  getGalerias,
  criarGaleria,
  atualizarGaleria,
  deletarGaleria,
} from "../../services/galeriaService";
import { getObras } from "../../services/obraService";
import { useToast } from "../../hooks/useToast";
import GaleriaTable from "./GaleriaTable";
import GaleriaFormModal from "./GaleriaFormModal";
import ConfirmDialog from "../ui/ConfirmDialog";

function GaleriasPage() {
  const [galerias, setGalerias] = useState([]);
  const [obras, setObras] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [galeriaEditando, setGaleriaEditando] = useState(null);
  const [galeriaDeletando, setGaleriaDeletando] = useState(null);

  const toast = useToast();

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const [dadosGalerias, dadosObras] = await Promise.all([
        getGalerias(),
        getObras(),
      ]);
      setGalerias(dadosGalerias);
      setObras(dadosObras);
    } catch (error) {
      toast.error("Não foi possível carregar os dados.");
      console.error("Erro ao carregar:", error);
    } finally {
      setLoading(false);
    }
  };

  const obrasPorGaleria = (galeriaId) =>
    obras.filter((o) => o.galeriaId === galeriaId).length;

  const handleNovo = () => {
    setGaleriaEditando(null);
    setIsFormModalOpen(true);
  };

  const handleEditar = (galeria) => {
    setGaleriaEditando(galeria);
    setIsFormModalOpen(true);
  };

  const handleSalvar = async (galeria) => {
    try {
      if (galeriaEditando) {
        await atualizarGaleria(galeria.id, galeria);
        toast.success(`Galeria "${galeria.nome}" atualizada com sucesso!`);
      } else {
        await criarGaleria(galeria);
        toast.success(`Galeria "${galeria.nome}" cadastrada com sucesso!`);
      }
      setIsFormModalOpen(false);
      setGaleriaEditando(null);
      await carregarDados();
    } catch (error) {
      toast.error("Erro ao salvar a galeria.");
      console.error("Erro ao salvar:", error);
    }
  };

  const handleConfirmarDelete = (galeria) => {
    setGaleriaDeletando(galeria);
    setIsDeleteDialogOpen(true);
  };

  const handleDeletar = async () => {
    try {
      await deletarGaleria(galeriaDeletando.id);
      toast.success(`Galeria "${galeriaDeletando.nome}" removida com sucesso!`);
      setIsDeleteDialogOpen(false);
      setGaleriaDeletando(null);
      await carregarDados();
    } catch (error) {
      const mensagem =
        error.response?.data?.mensagem || "Erro ao deletar a galeria.";
      toast.error(mensagem);
      setIsDeleteDialogOpen(false);
      console.error("Erro ao deletar:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Galerias</h1>
            <p className="text-sm text-gray-500">
              {galerias.length}{" "}
              {galerias.length === 1
                ? "galeria cadastrada"
                : "galerias cadastradas"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={carregarDados}
            title="Recarregar lista"
            className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={handleNovo}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Nova Galeria
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="w-6 h-6 text-amber-500 animate-spin" />
          <span className="ml-3 text-gray-500">Carregando galerias...</span>
        </div>
      ) : (
        <GaleriaTable
          galerias={galerias}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onEditar={handleEditar}
          onDeletar={handleConfirmarDelete}
          obrasPorGaleria={obrasPorGaleria}
        />
      )}

      <GaleriaFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setGaleriaEditando(null);
        }}
        galeriaEditando={galeriaEditando}
        onSalvar={handleSalvar}
      />

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setGaleriaDeletando(null);
        }}
        onConfirm={handleDeletar}
        title="Deletar Galeria"
        message={
          galeriaDeletando
            ? `Tem certeza que deseja excluir a galeria "${galeriaDeletando.nome}"? Galerias com obras associadas não podem ser deletadas.`
            : ""
        }
      />
    </div>
  );
}

export default GaleriasPage;
