import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { IUpsertTool } from '@/types/tool';
import UpsertForm from './upsert-form';

interface UpsertDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  existingTool?: IUpsertTool;
}

const UpsertDialog = ({ isOpen, setIsOpen, existingTool }: UpsertDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{existingTool ? 'Editar Ferramenta' : 'Criar Ferramenta'}</DialogTitle>
          <DialogDescription>Informe os dados para efetuar a {existingTool ? 'edição' : 'criação'} de uma ferramenta.</DialogDescription>
        </DialogHeader>

        <Separator />

        <UpsertForm existingTool={existingTool} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default UpsertDialog;
