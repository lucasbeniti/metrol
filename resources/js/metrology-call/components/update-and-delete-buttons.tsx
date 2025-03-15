import TooltipButton from '@/components/tooltip-button';
import { Machine } from '@/machine/types';
import CreateMetrologyCallForm from '@/metrology-call/components/create-metrology-call-form';
import { STATUS_MAP } from '@/metrology-call/contants';
import { MetrologyCall, MetrologyCallStatus } from '@/metrology-call/types';
import { Operation } from '@/operation/types';
import { Row } from '@tanstack/react-table';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import DeleteMetrologyCallDialog from './delete-metrology-call-dialog';

interface UpdateAndDeleteButtonsProps {
  row: Row<MetrologyCall>;
  machines: Machine[];
  operations: Operation[];
}

const UpdateAndDeleteButtons = ({ row, machines, operations }: UpdateAndDeleteButtonsProps) => {
  const disabled = row.original.status !== (STATUS_MAP[MetrologyCallStatus.WAITING_RECEIVE] as unknown);
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
        <TooltipButton variant="ghost" disabled={disabled} icon={<PencilIcon />} text="Editar" onClick={handleEditClick} />
        <TooltipButton variant="ghost" disabled={disabled} icon={<TrashIcon />} text="Deletar" onClick={handleDeleteClick} />
      </div>

      <DeleteMetrologyCallDialog isOpen={isDeleteDialogOpen} setIsOpen={setIsDeleteDialogOpen} id={id} />

      <CreateMetrologyCallForm
        isOpen={isEditFormOpen}
        setIsOpen={setIsEditFormOpen}
        machines={machines}
        operations={operations}
        existingMetrologyCall={row.original}
      />
    </>
  );
};

export default UpdateAndDeleteButtons;
