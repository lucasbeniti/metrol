import TooltipButton from '@/components/tooltip-button';
import CreateClientsForm from '@/clients/components/upsert-clients-form';
import { Clients} from '@/clients/types';
import { Row } from '@tanstack/react-table';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import DeleteClientsDialog from '@/clients/components/delete-clients-dialog';

interface UpdateAndDeleteButtonsProps {
  row: Row<Clients>;
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

      <DeleteClientsDialog isOpen={isDeleteDialogOpen} setIsOpen={setIsDeleteDialogOpen} id={id} />

      <CreateClientsForm
        isOpen={isEditFormOpen}
        setIsOpen={setIsEditFormOpen}
      />
    </>
  );
};

export default UpdateAndDeleteButtons;
