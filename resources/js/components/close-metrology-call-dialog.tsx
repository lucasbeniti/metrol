import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MetrologyCallStatus } from '@/constants/metrology-call';
import { useForm } from '@inertiajs/react';
import { DialogClose } from '@radix-ui/react-dialog';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

interface CloseMetrologyCallDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  id: number;
  callRoute: string;
  itemName: string;
}

const CloseMetrologyCallDialog = ({ isOpen, setIsOpen, id, itemName, callRoute }: CloseMetrologyCallDialogProps) => {
  const form = useForm<{ status: MetrologyCallStatus | null }>({
    status: null,
  });

  const handleClose = (status: MetrologyCallStatus) => {
    form.transform(() => ({
      status,
    }));

    form.put(route(callRoute, id), {
      onFinish: () => setIsOpen(false),
      onError: () => {
        toast.error('Não foi posível fechar o chamado.');
      },
      onSuccess: () => {
        toast.success('O chamado foi fechado com sucesso.');
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Você tem certeza?</DialogTitle>
          <DialogDescription>Deseja confirmar o fechamento do item "{itemName}"?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" disabled={form.processing}>
              Cancelar
            </Button>
          </DialogClose>
          <Button variant="destructive" disabled={form.processing} onClick={() => handleClose(MetrologyCallStatus.REJECTED)}>
            Reprovar
          </Button>
          <Button disabled={form.processing} onClick={() => handleClose(MetrologyCallStatus.APPROVED)} className="bg-green-600 hover:bg-green-600/90">
            Aprovar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CloseMetrologyCallDialog;
