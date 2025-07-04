import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { IItem } from '@/types/item';
import { IMachine } from '@/types/machine';
import { IUpsertMetrologyCall } from '@/types/metrology-call';
import { IOperation } from '@/types/operation';
import UpsertForm from './upsert-form';

interface UpsertDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  machines: IMachine[];
  operations: IOperation[];
  existingMetrologyCall?: IUpsertMetrologyCall;
  items: IItem[];
}

const UpsertDialog = ({ isOpen, setIsOpen, existingMetrologyCall, items, machines, operations }: UpsertDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{existingMetrologyCall ? 'Editar Chamado' : 'Criar Chamado'}</DialogTitle>
          <DialogDescription>Informe os dados para efetuar a {existingMetrologyCall ? 'edição' : 'criação'} de um chamado.</DialogDescription>
        </DialogHeader>

        <Separator />

        <UpsertForm items={items} existingMetrologyCall={existingMetrologyCall} setIsOpen={setIsOpen} machines={machines} operations={operations} />
      </DialogContent>
    </Dialog>
  );
};

export default UpsertDialog;
