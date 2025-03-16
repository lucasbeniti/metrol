import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ICostCenter } from '@/types/cost-center';
import { IItem } from '@/types/item';
import { IUpsertOperation } from '@/types/operation';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

interface UpsertFormProps {
  existingOperation?: IUpsertOperation;
  setIsOpen: (isOpen: boolean) => void;
  costCenters: ICostCenter[];
  items: IItem[];
}

const UpsertForm = ({ existingOperation, items, costCenters, setIsOpen }: UpsertFormProps) => {
  const { data, setData, post, put, processing, errors, reset } = useForm<IUpsertOperation>({
    name: existingOperation?.name || '',
    code: existingOperation?.code || '',
    cost_center_id: existingOperation?.cost_center_id?.toString() || '',
    item_id: existingOperation?.item_id.toString() || '',
  });

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (existingOperation) {
      put(route('operations.update', existingOperation.id), {
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
      post(route('operations.store'), {
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
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Insira o nome da operação" />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="code">Código</Label>
        <Input id="code" type="text" value={data.code} onChange={(e) => setData('code', e.target.value)} placeholder="Insira o código da operação" />
        {errors.code && <p className="text-sm text-red-500">{errors.code}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="item_id">Item</Label>
        <Select onValueChange={(value) => setData('item_id', value)} value={data.item_id.toString()}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um item" />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.id} value={item.id.toString()}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.item_id && <p className="text-sm text-red-500">{errors.item_id}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="cost_center_id">Item</Label>
        <Select onValueChange={(value) => setData('cost_center_id', value)} value={data.cost_center_id.toString()}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um centro de custo" />
          </SelectTrigger>
          <SelectContent>
            {costCenters.map((costCenter) => (
              <SelectItem key={costCenter.id} value={costCenter.id.toString()}>
                {costCenter.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.cost_center_id && <p className="text-sm text-red-500">{errors.cost_center_id}</p>}
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
