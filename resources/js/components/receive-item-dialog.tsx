import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { DialogClose } from '@radix-ui/react-dialog';
import { toast } from 'sonner';

interface ReceiveItemDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  id: number;
  callRoute: string;
  itemName: string;
}

const ReceiveItemDialog = ({ isOpen, setIsOpen, id, itemName, callRoute }: ReceiveItemDialogProps) => {
  const { processing, put: submitPut } = useForm();

  const handleReceive = () => {
    submitPut(route(callRoute, id), {
      onFinish: () => {
        setIsOpen(false);
      },
      onError: (error) => {
        toast.error(error.error);
        console.error(error);
      },
      onSuccess: () => {
        toast.success('O status do chamado de metrologia foi atualizado para "Aguardando Medição".');
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Você tem certeza?</DialogTitle>
          <DialogDescription>Deseja confirmar o recebimento do item "{itemName}"?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'ghost'} disabled={processing}>
              Cancelar
            </Button>
          </DialogClose>
          <Button variant={'default'} disabled={processing} onClick={handleReceive}>
            Confirmar Recebimento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiveItemDialog;
