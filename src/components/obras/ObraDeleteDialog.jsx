import ConfirmDialog from "../ui/ConfirmDialog";

function ObraDeleteDialog({ isOpen, onClose, onConfirm, obra }) {
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Deletar Obra"
      message={
        obra
          ? `Tem certeza que deseja excluir a obra "${obra.nome}"? Esta ação não pode ser desfeita.`
          : ""
      }
    />
  );
}

export default ObraDeleteDialog;
