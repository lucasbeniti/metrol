import TooltipButton from '@/components/tooltip-button';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import DestroyRowDialog from './destroy-row-dialog';

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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [id, setId] = useState(row.id);

  const handleDeleteClick = () => {
    setId(row.id);
    setIsDeleteDialogOpen(true);
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

      <DestroyRowDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        id={id}
        description={description}
        callRoute={deleteRoute}
        entityName={entityName}
      />

      <UpsertDialog isOpen={isEditFormOpen} setIsOpen={setIsEditFormOpen} existingEntity={row} />
    </>
  );
};

export default UpdateAndDeleteButtons;
