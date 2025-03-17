import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { IUpsertUser } from '@/types/user';
import UpsertForm from './upsert-form';

interface UpsertDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  existingUser?: IUpsertUser;
}

const UpsertDialog = ({ isOpen, setIsOpen, existingUser }: UpsertDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{existingUser ? 'Editar Usuário' : 'Criar Usuário'}</DialogTitle>
          <DialogDescription>
            Informe os dados para efetuar a {existingUser ? 'edição' : 'criação'} de um usuário.
            {!existingUser && (
              <span className="mt-2 block text-red-400">
                A senha será gerada automaticamente como um valor padrão: 123. <br /> O usuário poderá efetuar a alteração após realizar o login.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <UpsertForm existingUser={existingUser} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default UpsertDialog;
