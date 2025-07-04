import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useUpsertForm } from '@/hooks/use-upsert';
import { IItem } from '@/types/item';
import { IMachine } from '@/types/machine';
import { IUpsertMetrologyCall } from '@/types/metrology-call';
import { IOperation } from '@/types/operation';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

interface UpsertFormProps {
  existingMetrologyCall?: IUpsertMetrologyCall;
  machines: IMachine[];
  operations: IOperation[];
  setIsOpen: (isOpen: boolean) => void;
  items: IItem[];
}

const UpsertForm = ({ existingMetrologyCall, setIsOpen, items, machines, operations }: UpsertFormProps) => {
  const { data, setData, errors, processing, onSubmit } = useUpsertForm<IUpsertMetrologyCall>({
    initialData: {
      item_id: existingMetrologyCall?.item_id || 1,
      machine_id: existingMetrologyCall?.machine_id || 1,
      operation_id: existingMetrologyCall?.operation_id || 1,
      metrology_call_type_id: existingMetrologyCall?.metrology_call_type_id || 1,
    },
    existingId: existingMetrologyCall?.id || 1,
    storeRoute: route('metrology-calls.store'),
    updateRoute: (id) => route('metrology-calls.update', id),
    onSuccess: () => {
      setIsOpen(false);
      toast.success(existingMetrologyCall ? 'Chamado atualizado com sucesso!' : 'Chamado criado com sucesso!');
    },
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="item_id">Item</Label>
        <Select onValueChange={(value) => setData('item_id', Number(value))} value={data.item_id.toString()}>
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

      <div>
        <Label htmlFor="machine_id">Máquina</Label>
        <Select onValueChange={(value) => setData('machine_id', Number(value))} value={data.machine_id.toString()}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma máquina" />
          </SelectTrigger>
          <SelectContent>
            {machines.map((machine) => (
              <SelectItem key={machine.id} value={machine.id.toString()}>
                {machine.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.machine_id && <p className="text-sm text-red-500">{errors.machine_id}</p>}
      </div>

      <div>
        <Label htmlFor="operation_id">Operação</Label>
        <Select onValueChange={(value) => setData('operation_id', Number(value))} value={data.operation_id.toString()}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma operação" />
          </SelectTrigger>
          <SelectContent>
            {operations.map((operation) => (
              <SelectItem key={operation.id} value={operation.id.toString()}>
                {operation.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.operation_id && <p className="text-sm text-red-500">{errors.operation_id}</p>}
      </div>

      <div>
        <Label htmlFor="metrology_call_type_id">Tipo</Label>
        <Select onValueChange={(value) => setData('metrology_call_type_id', Number(value))} value={data.metrology_call_type_id.toString()}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Setup</SelectItem>
            <SelectItem value="2">Produção</SelectItem>
            <SelectItem value="3">Ajuste</SelectItem>
          </SelectContent>
        </Select>
        {errors.metrology_call_type_id && <p className="text-sm text-red-500">{errors.metrology_call_type_id}</p>}
      </div>

      <Separator />

      <DialogFooter>
        <DialogClose asChild>
          <Button variant={'ghost'}>Cancelar</Button>
        </DialogClose>
        <Button type="submit" disabled={processing}>
          {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          {existingMetrologyCall ? 'Atualizar' : 'Criar'}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default UpsertForm;
