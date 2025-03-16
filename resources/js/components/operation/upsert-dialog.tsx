import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { ICostCenter } from '@/types/cost-center';
import { IItem } from '@/types/item';
import { IUpsertOperation } from '@/types/operation';
import UpsertForm from './upsert-form';

interface UpsertMetrologyCallProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  existingOperation?: IUpsertOperation;
  costCenters: ICostCenter[];
  items: IItem[];
}

const UpsertDialog = ({ isOpen, setIsOpen, existingOperation, costCenters, items }: UpsertMetrologyCallProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{existingOperation ? 'Editar Operação' : 'Criar Operação'}</DialogTitle>
          <DialogDescription>Informe os dados para efetuar a {existingOperation ? 'edição' : 'criação'} de uma operação.</DialogDescription>
        </DialogHeader>

        <Separator />

        <UpsertForm existingOperation={existingOperation} setIsOpen={setIsOpen} costCenters={costCenters} items={items} />
      </DialogContent>
    </Dialog>
  );
};

export default UpsertDialog;
