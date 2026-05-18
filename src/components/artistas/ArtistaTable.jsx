import { Search, Pencil, Trash2, UserRound } from "lucide-react";

function ArtistaTable({
  artistas,
  searchTerm,
  onSearchChange,
  onEditar,
  onDeletar,
  obrasPorArtista,
}) {
  const artistasFiltrados = artistas.filter((a) => {
    const termo = searchTerm.toLowerCase();
    return (
      a.nome.toLowerCase().includes(termo) ||
      (a.pais && a.pais.toLowerCase().includes(termo)) ||
      (a.descricao && a.descricao.toLowerCase().includes(termo))
    );
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Campo de busca */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome, país ou descrição..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
          />
        </div>
      </div>

      {/* Estado vazio */}
      {artistasFiltrados.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <UserRound className="w-12 h-12 mb-3" />
          <p className="text-sm font-medium">
            {searchTerm
              ? "Nenhum artista encontrado."
              : "Nenhum artista cadastrado."}
          </p>
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                Nome
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                País
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                Ano
              </th>
              <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                Obras
              </th>
              <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {artistasFiltrados.map((artista) => (
              <tr
                key={artista.id}
                className="hover:bg-gray-50 transition-colors"
              >
                {/* Coluna Nome — com avatar (primeira letra) */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-violet-700 text-xs font-bold">
                        {artista.nome.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-900">
                        {artista.nome}
                      </span>
                      {artista.descricao && (
                        <p className="text-xs text-gray-400 truncate max-w-[200px]">
                          {artista.descricao}
                        </p>
                      )}
                    </div>
                  </div>
                </td>

                {/* Coluna País */}
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500">
                    {artista.pais || "—"}
                  </span>
                </td>

                {/* Coluna Ano */}
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500">
                    {artista.ano || "—"}
                  </span>
                </td>

                {/* Coluna Obras — badge com contagem */}
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {obrasPorArtista(artista.id)} obras
                  </span>
                </td>

                {/* Coluna Ações */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEditar(artista)}
                      title="Editar artista"
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeletar(artista)}
                      title="Deletar artista"
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ArtistaTable;
