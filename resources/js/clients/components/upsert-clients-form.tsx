import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import { IUpsertClients } from '../types';

interface UpsertClientsProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  existingClients?: IUpsertClients;
}

const UpsertClients = ({ isOpen, setIsOpen, existingClients }: UpsertClientsProps) => {
  const { data, setData, post, put, processing, errors, reset } = useForm<IUpsertClients>({
    name: existingClients?.name || '',
  });

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (existingClients) {
      put(route('clients.update', existingClients.id), {
        onSuccess: () => {
          reset();
          setIsOpen(false);
          toast.success('Cliente atualizado com sucesso!');
        },
        onError: (errors) => {
          console.error(errors);
        },
      });
    } else {
      post(route('clients.store'), {
        onSuccess: () => {
          reset();
          setIsOpen(false);
          toast.success('Cliente criado com sucesso!');
        },
        onError: (errors) => {
          console.error(errors);
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{existingClients ? 'Editar Cliente' : 'Criar Cliente'}</DialogTitle>
          <DialogDescription>Informe os dados para efetuar a {existingClients ? 'edição' : 'criação'} de um ciente.</DialogDescription>
        </DialogHeader>

        <Separator />

        <form onSubmit={onSubmit} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              type="text"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              placeholder="Insira o nome do cliente"
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>

          <Separator />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant={'ghost'}>Cancelar</Button>
            </DialogClose>
            <Button type="submit" disabled={processing}>
              {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
              {existingClients ? 'Atualizar' : 'Criar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpsertClients;
