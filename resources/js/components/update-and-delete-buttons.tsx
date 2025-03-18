import TooltipButton from '@/components/tooltip-button';
import { useDestroyDialog } from '@/contexts/destroy-dialog-context';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';

interface UpdateAndDeleteButtonsProps<T> {
  row: T;
  description: string;
  deleteRoute: string;
  UpsertDialog: React.FC<{ isOpen: boolean; setIsOpen: (open: boolean) => void; existingEntity: T }>;
  entityName: string;
}

const UpdateAndDeleteButtons = <T extends { id: string }>({
  row,
  description,
  deleteRoute,
  UpsertDialog,
  entityName,
}: UpdateAndDeleteButtonsProps<T>) => {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const { openDeleteDialog } = useDestroyDialog();

  const handleDeleteClick = () => {
    openDeleteDialog({
      id: row.id,
      description,
      callRoute: deleteRoute,
      entityName,
    });
  };

  const handleEditClick = () => {
    setIsEditFormOpen(true);
  };

  return (
    <>
      <div className="flex gap-1">
        <TooltipButton variant="ghost" icon={<PencilIcon />} text="Editar" onClick={handleEditClick} />
        <TooltipButton variant="ghost" icon={<TrashIcon className="text-red-400" />} text="Deletar" onClick={handleDeleteClick} />
      </div>

      <UpsertDialog isOpen={isEditFormOpen} setIsOpen={setIsEditFormOpen} existingEntity={row} />
    </>
  );
};

export default UpdateAndDeleteButtons;
