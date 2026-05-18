import { useState, useEffect } from "react";
import { Plus, RefreshCw, UserRound } from "lucide-react";
import {
  getArtistas,
  criarArtista,
  atualizarArtista,
  deletarArtista,
} from "../../services/artistaService";
import { getObras } from "../../services/obraService";
import { useToast } from "../../hooks/useToast";
import ArtistaTable from "./ArtistaTable";
import ArtistaFormModal from "./ArtistaFormModal";
import ConfirmDialog from "../ui/ConfirmDialog";

function ArtistasPage() {
  const [artistas, setArtistas] = useState([]);
  const [obras, setObras] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [artistaEditando, setArtistaEditando] = useState(null);
  const [artistaDeletando, setArtistaDeletando] = useState(null);

  const toast = useToast();

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const [dadosArtistas, dadosObras] = await Promise.all([
        getArtistas(),
        getObras(),
      ]);
      setArtistas(dadosArtistas);
      setObras(dadosObras);
    } catch (error) {
      toast.error("Não foi possível carregar os dados.");
      console.error("Erro ao carregar:", error);
    } finally {
      setLoading(false);
    }
  };

  const obrasPorArtista = (artistaId) =>
    obras.filter((o) => o.artistaId === artistaId).length;

  const handleNovo = () => {
    setArtistaEditando(null);
    setIsFormModalOpen(true);
  };

  const handleEditar = (artista) => {
    setArtistaEditando(artista);
    setIsFormModalOpen(true);
  };

  const handleSalvar = async (artista) => {
    try {
      if (artistaEditando) {
        await atualizarArtista(artista.id, artista);
        toast.success(`Artista "${artista.nome}" atualizado com sucesso!`);
      } else {
        await criarArtista(artista);
        toast.success(`Artista "${artista.nome}" cadastrado com sucesso!`);
      }
      setIsFormModalOpen(false);
      setArtistaEditando(null);
      await carregarDados();
    } catch (error) {
      toast.error("Erro ao salvar o artista.");
      console.error("Erro ao salvar:", error);
    }
  };

  const handleConfirmarDelete = (artista) => {
    setArtistaDeletando(artista);
    setIsDeleteDialogOpen(true);
  };

  const handleDeletar = async () => {
    try {
      await deletarArtista(artistaDeletando.id);
      toast.success(`Artista "${artistaDeletando.nome}" removido com sucesso!`);
      setIsDeleteDialogOpen(false);
      setArtistaDeletando(null);
      await carregarDados();
    } catch (error) {
      const mensagem =
        error.response?.data?.mensagem || "Erro ao deletar o artista.";
      toast.error(mensagem);
      setIsDeleteDialogOpen(false);
      console.error("Erro ao deletar:", error);
    }
  };

  return (
    <div className="p-6">
      {/* Header da página — título, contagem e botões */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {/* Ícone da página */}
          <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
            <UserRound className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Artistas</h1>
            <p className="text-sm text-gray-500">
              {artistas.length}{" "}
              {artistas.length === 1
                ? "artista cadastrado"
                : "artistas cadastrados"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Botão recarregar */}
          <button
            onClick={carregarDados}
            title="Recarregar lista"
            className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          {/* Botão Novo Artista */}
          <button
            onClick={handleNovo}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Novo Artista
          </button>
        </div>
      </div>

      {/* Conteúdo principal — loading ou tabela */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="w-6 h-6 text-violet-500 animate-spin" />
          <span className="ml-3 text-gray-500">Carregando artistas...</span>
        </div>
      ) : (
        <ArtistaTable
          artistas={artistas}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onEditar={handleEditar}
          onDeletar={handleConfirmarDelete}
          obrasPorArtista={obrasPorArtista}
        />
      )}

      {/* Modal de formulário (criar/editar) */}
      <ArtistaFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setArtistaEditando(null);
        }}
        artistaEditando={artistaEditando}
        onSalvar={handleSalvar}
      />

      {/* Diálogo de confirmação de deleção */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setArtistaDeletando(null);
        }}
        onConfirm={handleDeletar}
        title="Deletar Artista"
        message={
          artistaDeletando
            ? `Tem certeza que deseja excluir o artista "${artistaDeletando.nome}"? Artistas com obras associadas não podem ser deletados.`
            : ""
        }
      />
    </div>
  );
}

export default ArtistasPage;
