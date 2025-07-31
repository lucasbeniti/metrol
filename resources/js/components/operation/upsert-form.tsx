import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useUpsertForm } from '@/hooks/use-upsert';
import { IItem } from '@/types/item';
import { IUpsertOperation } from '@/types/operation';
import { router } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

interface UpsertFormProps {
  existingOperation?: IUpsertOperation;
  setIsOpen: (isOpen: boolean) => void;
  item: IItem;
}

const UpsertForm = ({ existingOperation, item, setIsOpen }: UpsertFormProps) => {
  const { data, setData, errors, processing, onSubmit } = useUpsertForm<IUpsertOperation>({
    initialData: {
      name: existingOperation?.name || '',
      code: existingOperation?.code || '',
      item_id: existingOperation?.item_id || item.id,
    },
    existingId: existingOperation?.id,
    storeRoute: route('items.operations.store', { itemId: item.id }),
    updateRoute: (id) => route('items.operations.update', { itemId: item.id, id: id }),
    onSuccess: () => {
      setIsOpen(false);
      toast.success(existingOperation ? 'Operação atualizada com sucesso!' : 'Operação criada com sucesso!');

      router.reload({ only: ['operations'] });
    },
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nome</Label>
        <Input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Insira o nome da operação" />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      <div>
        <Label htmlFor="code">Código</Label>
        <Input id="code" type="text" value={data.code} onChange={(e) => setData('code', e.target.value)} placeholder="Insira o código da operação" />
        {errors.code && <p className="text-sm text-red-500">{errors.code}</p>}
      </div>

      <Separator />

      <DialogFooter>
        <DialogClose asChild>
          <Button variant={'ghost'}>Cancelar</Button>
        </DialogClose>
        <Button type="submit" disabled={processing}>
          {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          {existingOperation ? 'Atualizar' : 'Criar'}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default UpsertForm;
