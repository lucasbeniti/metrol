import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { DialogClose } from '@radix-ui/react-dialog';
import { toast } from 'sonner';

interface DeleteClientsDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  id: string;
}

const DeleteClientsDialog = ({ isOpen, setIsOpen, id }: DeleteClientsDialogProps) => {
  const { processing, delete: submitDelete } = useForm();

  const handleDelete = () => {
    submitDelete(route('clients.destroy', id), {
      onFinish: () => {
        setIsOpen(false);
      },
      onError: (error) => {
        console.error(error);
      },
      onSuccess: () => {
        toast.success('Cliente deletado com sucesso!');
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Você tem certeza?</DialogTitle>
          <DialogDescription>Após deletar o cliente, não será possível recuperá-lo.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'ghost'} disabled={processing}>
              Cancelar
            </Button>
          </DialogClose>
          <Button variant={'destructive'} disabled={processing} onClick={handleDelete}>
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteClientsDialog;
