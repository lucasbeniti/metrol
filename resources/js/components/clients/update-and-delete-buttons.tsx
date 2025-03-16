import TooltipButton from '@/components/tooltip-button';
import { IClient } from '@/types/client';
import { Row } from '@tanstack/react-table';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import DestroyRowDialog from '../delete-dialog';
import UpsertClients from './upsert-dialog';

interface UpdateAndDeleteButtonsProps {
  row: Row<IClient>;
}

const UpdateAndDeleteButtons = ({ row }: UpdateAndDeleteButtonsProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [id, setId] = useState(row.original.id);

  const handleDeleteClick = () => {
    setId(row.original.id);
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

      <DestroyRowDialog isOpen={isDeleteDialogOpen} setIsOpen={setIsDeleteDialogOpen} id={id} text="cliente" callRoute="clients.destroy" />

      <UpsertClients isOpen={isEditFormOpen} setIsOpen={setIsEditFormOpen} />
    </>
  );
};

export default UpdateAndDeleteButtons;
