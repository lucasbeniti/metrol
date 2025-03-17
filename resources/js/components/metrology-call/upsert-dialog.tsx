import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
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
}

const UpsertDialog = ({ isOpen, setIsOpen, machines, operations, existingMetrologyCall }: UpsertDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{existingMetrologyCall ? 'Editar Chamado' : 'Criar Chamado'}</DialogTitle>
          <DialogDescription>Informe os dados para efetuar a {existingMetrologyCall ? 'edição' : 'criação'} de um chamado.</DialogDescription>
        </DialogHeader>

        <Separator />

        <UpsertForm machines={machines} operations={operations} existingMetrologyCall={existingMetrologyCall} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default UpsertDialog;
