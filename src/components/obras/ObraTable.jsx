import { Search, Pencil, Trash2, BookImage } from "lucide-react";

function ObraTable({ obras, searchTerm, onSearchChange, onEditar, onDeletar }) {
  const obrasFiltradas = obras.filter((o) => {
    const termo = searchTerm.toLowerCase();
    return o.nome.toLowerCase().includes(termo) || o.ano.includes(termo);
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Barra de busca */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome ou ano..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
          />
        </div>
      </div>

      {/* Tabela */}
      {obrasFiltradas.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <BookImage className="w-12 h-12 mb-3" />
          <p className="text-sm font-medium">
            {searchTerm
              ? "Nenhuma obra encontrada para esta busca."
              : "Nenhuma obra cadastrada."}
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
                Ano
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {obrasFiltradas.map((obra) => (
              <tr key={obra.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">
                    {obra.nome}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500">
                    {obra.ano || "—"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEditar(obra)}
                      title="Editar obra"
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeletar(obra)}
                      title="Deletar obra"
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

export default ObraTable;
