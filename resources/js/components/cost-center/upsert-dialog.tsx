import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { IClient } from '@/types/client';
import { IUpsertCostCenter } from '@/types/cost-center';
import UpsertForm from './upsert-form';

interface UpsertDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  clients: IClient[];
  existingCostCenter?: IUpsertCostCenter;
}

const UpsertDialog = ({ isOpen, setIsOpen, existingCostCenter, clients }: UpsertDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{existingCostCenter ? 'Editar Máquina' : 'Criar Máquina'}</DialogTitle>
          <DialogDescription>Informe os dados para efetuar a {existingCostCenter ? 'edição' : 'criação'} de uma máquina.</DialogDescription>
        </DialogHeader>

        <Separator />

        <UpsertForm existingCostCenter={existingCostCenter} setIsOpen={setIsOpen} clients={clients} />
      </DialogContent>
    </Dialog>
  );
};

export default UpsertDialog;
