import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { IUpsertClient } from '@/types/client';
import UpsertForm from './upsert-form';

interface UpsertClientsProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  existingClient?: IUpsertClient;
}

const UpsertDialog = ({ isOpen, setIsOpen, existingClient }: UpsertClientsProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{existingClient ? 'Editar Cliente' : 'Criar Cliente'}</DialogTitle>
          <DialogDescription>Informe os dados para efetuar a {existingClient ? 'edição' : 'criação'} de um ciente.</DialogDescription>
        </DialogHeader>

        <Separator />

        <UpsertForm existingClient={existingClient} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default UpsertDialog;
