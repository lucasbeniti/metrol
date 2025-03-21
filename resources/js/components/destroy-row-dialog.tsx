import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { DialogClose } from '@radix-ui/react-dialog';
import { toast } from 'sonner';

interface DestroyRowDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  id: string;
  entityName: string;
  callRoute: string;
  description: string;
  parentId?: string;
}

const DestroyRowDialog = ({ isOpen, setIsOpen, id, description, entityName, callRoute, parentId }: DestroyRowDialogProps) => {
  const { processing, delete: submitDelete } = useForm();

  const handleDestroy = () => {
    if (parentId && callRoute.includes('operations')) {
      submitDelete(route(callRoute, [parentId, id]), {
        onFinish: () => {
          setIsOpen(false);
        },
        onError: (error) => {
          console.error(error);
        },
        onSuccess: () => {
          toast.success(
            `${entityName.charAt(0).toUpperCase()}${entityName.slice(1)} ${entityName == 'máquina' || entityName == 'operação' ? 'deletada' : 'deletado'} com sucesso!`,
          );
        },
      });
    } else {
      submitDelete(route(callRoute, id), {
        onFinish: () => {
          setIsOpen(false);
        },
        onError: (error) => {
          console.error(error);
        },
        onSuccess: () => {
          toast.success(
            `${entityName.charAt(0).toUpperCase()}${entityName.slice(1)} ${entityName == 'máquina' ? 'deletada' : 'deletado'} com sucesso!`,
          );
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Você tem certeza?</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
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
