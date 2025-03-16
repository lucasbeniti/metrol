import TooltipButton from '@/components/tooltip-button';
import { STATUS_MAP } from '@/constants/metrology-call';
import { IMachine } from '@/types/machine';
import { IMetrologyCall, MetrologyCallStatus } from '@/types/metrology-call';
import { IOperation } from '@/types/operation';
import { Row } from '@tanstack/react-table';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import DestroyRowDialog from '../delete-dialog';
import UpsertMetrologyCallForm from './upsert-dialog';

interface UpdateAndDeleteButtonsProps {
  row: Row<IMetrologyCall>;
  machines: IMachine[];
  operations: IOperation[];
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
        <TooltipButton variant="ghost" disabled={disabled} icon={<TrashIcon className="text-red-400" />} text="Deletar" onClick={handleDeleteClick} />
      </div>

      <DestroyRowDialog isOpen={isDeleteDialogOpen} setIsOpen={setIsDeleteDialogOpen} id={id} text="chamado" callRoute="metrology-calls.destroy" />

      <UpsertMetrologyCallForm
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
