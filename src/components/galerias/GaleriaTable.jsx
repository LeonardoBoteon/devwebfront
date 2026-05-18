import { Search, Pencil, Trash2, Building2 } from "lucide-react";

function GaleriaTable({
  galerias,
  searchTerm,
  onSearchChange,
  onEditar,
  onDeletar,
  obrasPorGaleria,
}) {
  const galeriasFiltradas = galerias.filter((g) => {
    const termo = searchTerm.toLowerCase();
    return (
      g.nome.toLowerCase().includes(termo) ||
      g.endereco.toLowerCase().includes(termo) ||
      (g.descricao && g.descricao.toLowerCase().includes(termo))
    );
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome, endereço ou descrição..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
          />
        </div>
      </div>

      {galeriasFiltradas.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <Building2 className="w-12 h-12 mb-3" />
          <p className="text-sm font-medium">
            {searchTerm
              ? "Nenhuma galeria encontrada."
              : "Nenhuma galeria cadastrada."}
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
                Endereço
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                Contato
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
            {galeriasFiltradas.map((galeria) => (
              <tr
                key={galeria.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-700 text-xs font-bold">
                        {galeria.nome.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-900">
                        {galeria.nome}
                      </span>
                      {galeria.descricao && (
                        <p className="text-xs text-gray-400 truncate max-w-[180px]">
                          {galeria.descricao}
                        </p>
                      )}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500">
                    {galeria.endereco}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500 space-y-0.5">
                    {galeria.email && <p>{galeria.email}</p>}
                    {galeria.telefone && <p>{galeria.telefone}</p>}
                    {!galeria.email && !galeria.telefone && <span>—</span>}
                  </div>
                </td>

                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    {obrasPorGaleria(galeria.id)} obras
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEditar(galeria)}
                      title="Editar galeria"
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeletar(galeria)}
                      title="Deletar galeria"
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

export default GaleriaTable;
