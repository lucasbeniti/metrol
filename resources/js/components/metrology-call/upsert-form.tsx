import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { IMachine } from '@/types/machine';
import { IUpsertMetrologyCall } from '@/types/metrology-call';
import { IOperation } from '@/types/operation';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

interface UpsertFormProps {
  existingMetrologyCall?: IUpsertMetrologyCall;
  machines: IMachine[];
  operations: IOperation[];
  setIsOpen: (isOpen: boolean) => void;
}

const UpsertForm = ({ existingMetrologyCall, machines, operations, setIsOpen }: UpsertFormProps) => {
  const { data, setData, post, put, processing, errors, reset } = useForm<IUpsertMetrologyCall>({
    item_name: existingMetrologyCall?.item_name || '',
    machine_id: existingMetrologyCall?.machine_id?.toString() || '',
    operation_id: existingMetrologyCall?.operation_id?.toString() || '',
    type: existingMetrologyCall?.type || '',
  });

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (existingMetrologyCall) {
      put(route('metrology-calls.update', existingMetrologyCall.id), {
        onSuccess: () => {
          reset();
          setIsOpen(false);
          toast.success('Chamado atualizado com sucesso!');
        },
        onError: (errors) => {
          console.error(errors);
        },
      });
    } else {
      post(route('metrology-calls.store'), {
        onSuccess: () => {
          reset();
          setIsOpen(false);
          toast.success('Chamado criado com sucesso!');
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
        <Label htmlFor="item_name">Nome do Item</Label>
        <Input
          id="item_name"
          type="text"
          value={data.item_name}
          onChange={(e) => setData('item_name', e.target.value)}
          placeholder="Insira o nome do item"
        />
        {errors.item_name && <p className="text-sm text-red-500">{errors.item_name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="machine_id">Máquina</Label>
        <Select onValueChange={(value) => setData('machine_id', value)} value={data.machine_id.toString()}>
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

      <div className="space-y-2">
        <Label htmlFor="operation_id">Operação</Label>
        <Select onValueChange={(value) => setData('operation_id', value)} value={data.operation_id.toString()}>
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

      <div className="space-y-2">
        <Label htmlFor="type">Tipo</Label>
        <Select onValueChange={(value) => setData('type', value)} value={data.type.toString()}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="setup">Setup</SelectItem>
            <SelectItem value="production">Produção</SelectItem>
            <SelectItem value="adjust">Ajuste</SelectItem>
          </SelectContent>
        </Select>
        {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
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
