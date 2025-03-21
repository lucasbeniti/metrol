import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { IItem } from '@/types/item';
import { IUpsertOperation } from '@/types/operation';
import UpsertForm from './upsert-form';

interface UpsertDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  existingOperation?: IUpsertOperation;
  item: IItem;
}

const UpsertDialog = ({ isOpen, setIsOpen, existingOperation, item }: UpsertDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{existingOperation ? 'Editar Operação' : 'Criar Operação'}</DialogTitle>
          <DialogDescription>Informe os dados para efetuar a {existingOperation ? 'edição' : 'criação'} de uma operação.</DialogDescription>
        </DialogHeader>

        <Separator />

        <UpsertForm existingOperation={existingOperation} setIsOpen={setIsOpen} item={item} />
      </DialogContent>
    </Dialog>
  );
};

export default UpsertDialog;
