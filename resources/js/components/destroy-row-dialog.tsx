import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { DialogClose } from '@radix-ui/react-dialog';
import { toast } from 'sonner';

interface DestroyRowDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  id: string;
  text: string;
  callRoute: string;
}

const DestroyRowDialog = ({ isOpen, setIsOpen, id, text, callRoute }: DestroyRowDialogProps) => {
  const { processing, delete: submitDelete } = useForm();

  const handleDestroy = () => {
    submitDelete(route(callRoute, id), {
      onFinish: () => {
        setIsOpen(false);
      },
      onError: (error) => {
        console.error(error);
      },
      onSuccess: () => {
        toast.success(`${text.charAt(0).toUpperCase()}${text.slice(1)} deletado com sucesso!`);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Você tem certeza?</DialogTitle>
          <DialogDescription>Após deletar o {text}, não será possível recuperá-lo.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'ghost'} disabled={processing}>
              Cancelar
            </Button>
          </DialogClose>
          <Button variant={'destructive'} disabled={processing} onClick={handleDestroy}>
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DestroyRowDialog;
