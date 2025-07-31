import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useUpsertForm } from '@/hooks/use-upsert';
import { IUpsertClient } from '@/types/client';
import { router } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

interface UpsertFormProps {
  existingClient?: IUpsertClient;
  setIsOpen: (isOpen: boolean) => void;
}

const UpsertForm = ({ existingClient, setIsOpen }: UpsertFormProps) => {
  const { data, setData, errors, processing, onSubmit } = useUpsertForm<IUpsertClient>({
    initialData: {
      name: existingClient?.name || '',
      code: existingClient?.code || '',
    },
    existingId: existingClient?.id,
    storeRoute: route('clients.store'),
    updateRoute: (id) => route('clients.update', id),
    onSuccess: () => {
      setIsOpen(false);
      toast.success(existingClient ? 'Cliente atualizado com sucesso!' : 'Cliente criado com sucesso!');

      router.reload({ only: ['clients'] });
    },
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nome</Label>
        <Input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Insira o nome do cliente" />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      <div>
        <Label htmlFor="code">Código</Label>
        <Input id="code" type="text" value={data.code} onChange={(e) => setData('code', e.target.value)} placeholder="Insira o código do cliente" />
        {errors.code && <p className="text-sm text-red-500">{errors.code}</p>}
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
