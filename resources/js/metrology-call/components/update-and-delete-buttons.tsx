/* eslint-disable @typescript-eslint/no-explicit-any */

import TooltipButton from '@/components/tooltip-button';
import { STATUS_MAP } from '@/metrology-call/contants';
import { MetrologyCall, MetrologyCallStatus } from '@/metrology-call/types';
import { Row } from '@tanstack/react-table';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import DeleteMetrologyCallDialog from './delete-metrology-call-dialog';

interface UpdateAndDeleteButtonsProps {
  row: Row<MetrologyCall>;
}

const UpdateAndDeleteButtons = ({ row }: UpdateAndDeleteButtonsProps) => {
  const disabled = row.original.status !== (STATUS_MAP[MetrologyCallStatus.WAITING_RECEIVE] as any);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(row.original.id);

  const handleDeleteClick = () => {
    setId(row.original.id);
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex gap-1">
        <TooltipButton variant="ghost" disabled={disabled} icon={<PencilIcon />} text="Editar" />
        <TooltipButton variant="ghost" disabled={disabled} icon={<TrashIcon />} text="Deletar" onClick={handleDeleteClick} />
      </div>

      <DeleteMetrologyCallDialog isOpen={isOpen} setIsOpen={setIsOpen} id={id} />
    </>
  );
};

export default UpdateAndDeleteButtons;
