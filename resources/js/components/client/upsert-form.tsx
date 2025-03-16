import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { IUpsertClient } from '@/types/client';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

interface UpsertFormProps {
  existingClient?: IUpsertClient;
  setIsOpen: (isOpen: boolean) => void;
}

const UpsertForm = ({ existingClient, setIsOpen }: UpsertFormProps) => {
  const { data, setData, post, put, processing, errors, reset } = useForm<IUpsertClient>({
    name: existingClient?.name || '',
  });

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (existingClient) {
      put(route('clients.update', existingClient.id), {
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
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Insira o nome do cliente" />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      <Separator />

      <DialogFooter>
        <DialogClose asChild>
          <Button variant={'ghost'}>Cancelar</Button>
        </DialogClose>
        <Button type="submit" disabled={processing}>
          {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          {existingClient ? 'Atualizar' : 'Criar'}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default UpsertForm;
