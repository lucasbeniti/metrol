import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { IUpsertMachine } from '@/types/machine';
import { IOperation } from '@/types/operation';
import UpsertForm from './upsert-form';

interface UpsertDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  operations: IOperation[];
  existingMachine?: IUpsertMachine;
}

const UpsertDialog = ({ isOpen, setIsOpen, operations, existingMachine }: UpsertDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{existingMachine ? 'Editar Máquina' : 'Criar Máquina'}</DialogTitle>
          <DialogDescription>Informe os dados para efetuar a {existingMachine ? 'edição' : 'criação'} de uma máquina.</DialogDescription>
        </DialogHeader>

        <Separator />

        <UpsertForm operations={operations} existingMachine={existingMachine} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default UpsertDialog;
