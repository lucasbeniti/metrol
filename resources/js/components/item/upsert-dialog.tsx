import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { ICostCenter } from '@/types/cost-center';
import { IUpsertItem } from '@/types/item';
import UpsertForm from './upsert-form';

interface UpsertDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  costCenters: ICostCenter[];
  existingItem?: IUpsertItem;
}

const UpsertDialog = ({ isOpen, setIsOpen, existingItem, costCenters }: UpsertDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{existingItem ? 'Editar Item' : 'Criar Item'}</DialogTitle>
          <DialogDescription>Informe os dados para efetuar a {existingItem ? 'edição' : 'criação'} de um item.</DialogDescription>
        </DialogHeader>

        <Separator />

        <UpsertForm existingItem={existingItem} setIsOpen={setIsOpen} costCenters={costCenters} />
      </DialogContent>
    </Dialog>
  );
};

export default UpsertDialog;
