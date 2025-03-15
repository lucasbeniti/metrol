import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { DialogClose } from '@radix-ui/react-dialog';
import { toast } from 'sonner';

interface DeleteMetrologyCallDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  id: string;
}

const DeleteMetrologyCallDialog = ({ isOpen, setIsOpen, id }: DeleteMetrologyCallDialogProps) => {
  const { processing, delete: submitDelete } = useForm();

  const handleDelete = () => {
    submitDelete(route('metrology-calls.destroy', id), {
      onFinish: () => {
        setIsOpen(false);
      },
      onError: (error) => {
        console.error(error);
      },
      onSuccess: () => {
        toast.success('Chamado deletado com sucesso!');
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Você tem certeza?</DialogTitle>
          <DialogDescription>Após deletar o chamado, não será possível recuperá-lo.</DialogDescription>
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

export default DeleteMetrologyCallDialog;
