import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useUpsertForm } from '@/hooks/use-upsert';
import { ICostCenter } from '@/types/cost-center';
import { IUpsertItem } from '@/types/item';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

interface UpsertFormProps {
  existingItem?: IUpsertItem;
  costCenters: ICostCenter[];
  setIsOpen: (isOpen: boolean) => void;
}

const UpsertForm = ({ existingItem, costCenters, setIsOpen }: UpsertFormProps) => {
  const { data, setData, errors, processing, onSubmit } = useUpsertForm<IUpsertItem>({
    initialData: {
      name: existingItem?.name || '',
      code: existingItem?.code || '',
      cost_center_id: existingItem?.cost_center_id || '',
    },
    existingId: existingItem?.id,
    storeRoute: route('items.store'),
    updateRoute: (id) => route('items.update', id),
    onSuccess: () => {
      setIsOpen(false);
      toast.success(existingItem ? 'Item atualizado com sucesso!' : 'Item criado com sucesso!');
    },
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nome</Label>
        <Input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Insira o nome do item" />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      <div>
        <Label htmlFor="code">Código</Label>
        <Input id="code" type="text" value={data.code} onChange={(e) => setData('code', e.target.value)} placeholder="Insira o código do item" />
        {errors.code && <p className="text-sm text-red-500">{errors.code}</p>}
      </div>

      <div>
        <Label htmlFor="cost_center_id">Centro de Custo</Label>
        <Select onValueChange={(value) => setData('cost_center_id', value)} value={data.cost_center_id.toString()}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma operação" />
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
          <Button variant={'ghost'} disabled={processing}>
            Cancelar
          </Button>
        </DialogClose>

        <Button type="submit" disabled={processing}>
          {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          {existingItem ? 'Atualizar' : 'Criar'}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default UpsertForm;
