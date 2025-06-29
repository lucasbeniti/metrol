import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { IItem } from '@/types/item';
import { IUpsertOperation } from '@/types/operation';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';
import { toast } from 'sonner';

interface UpsertFormProps {
  existingOperation?: IUpsertOperation;
  setIsOpen: (isOpen: boolean) => void;
  item: IItem;
}

const UpsertForm = ({ existingOperation, item, setIsOpen }: UpsertFormProps) => {
  const { data, setData, post, put, processing, errors, reset } = useForm<IUpsertOperation>({
    name: existingOperation?.name || '',
    code: existingOperation?.code || '',
    item_id: existingOperation?.item_id || '',
  });

  useEffect(() => {
    if (item.id) {
      setData('item_id', item.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id]);

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (existingOperation) {
      put(route('items.operations.update', { item: item.id, operation: existingOperation.id }), {
        onSuccess: () => {
          reset();
          setIsOpen(false);
          toast.success('Operação atualizada com sucesso!');
        },
        onError: (errors) => {
          console.error(errors);
        },
      });
    } else {
      post(route('items.operations.store', { item: item.id }), {
        onSuccess: () => {
          reset();
          setIsOpen(false);
          toast.success('Operação criada com sucesso!');
        },
        onError: (errors) => {
          console.error(errors);
        },
      });
    }
  };

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
