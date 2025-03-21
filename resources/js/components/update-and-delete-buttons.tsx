/* eslint-disable @typescript-eslint/no-explicit-any */
import TooltipButton from '@/components/tooltip-button';
import { useDestroyDialog } from '@/contexts/destroy-dialog-context';
import { useUpsertDialog } from '@/contexts/upsert-dialog-context';
import { PencilIcon, TrashIcon } from 'lucide-react';

interface UpdateAndDeleteButtonsProps<T> {
  row: T;
  description: string;
  deleteRoute: string;
  UpsertDialog: React.ComponentType<any>;
  entityName: string;
  upsertDialogProps?: Record<string, any>;
}

const UpdateAndDeleteButtons = <T extends { id: string }>({
  row,
  description,
  deleteRoute,
  UpsertDialog,
  entityName,
  upsertDialogProps = {},
}: UpdateAndDeleteButtonsProps<T>) => {
  const { openDeleteDialog } = useDestroyDialog();
  const { openUpsertDialog } = useUpsertDialog();

  const handleDeleteClick = () => {
    openDeleteDialog({
      id: row.id,
      description,
      callRoute: deleteRoute,
      entityName,
    });
  };

  const handleEditClick = () => {
    openUpsertDialog({
      UpsertDialogComponent: UpsertDialog,
      props: {
        existingEntity: row,
        ...upsertDialogProps,
      },
    });
  };

  return (
    <div className="flex gap-1 ">
      <TooltipButton variant="ghost" icon={<PencilIcon className="text-yellow-500" />} text="Editar" onClick={handleEditClick} />
      <TooltipButton variant="ghost" icon={<TrashIcon className="text-red-400" />} text="Deletar" onClick={handleDeleteClick} />
    </div>
  );
};

export default UpdateAndDeleteButtons;
