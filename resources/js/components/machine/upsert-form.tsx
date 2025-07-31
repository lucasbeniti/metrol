import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useUpsertForm } from '@/hooks/use-upsert';
import { IUpsertMachine } from '@/types/machine';
import { IOperation } from '@/types/operation';
import { router } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

interface UpsertFormProps {
  existingMachine?: IUpsertMachine;
  operations: IOperation[];
  setIsOpen: (isOpen: boolean) => void;
}

const UpsertForm = ({ existingMachine, operations, setIsOpen }: UpsertFormProps) => {
  const { data, setData, errors, processing, onSubmit } = useUpsertForm<IUpsertMachine>({
    initialData: {
      name: existingMachine?.name || '',
      code: existingMachine?.code || '',
      operation_id: existingMachine?.operation_id || '',
    },
    existingId: existingMachine?.id,
    storeRoute: route('machines.store'),
    updateRoute: (id) => route('machines.update', id),
    onSuccess: () => {
      setIsOpen(false);
      toast.success(existingMachine ? 'Máquina atualizada com sucesso!' : 'Máquina criada com sucesso!');

      router.reload({ only: ['machines'] });
    },
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nome</Label>
        <Input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Insira o nome da máquina" />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      <div>
        <Label htmlFor="code">Código</Label>
        <Input id="code" type="text" value={data.code} onChange={(e) => setData('code', e.target.value)} placeholder="Insira o código da máquina" />
        {errors.code && <p className="text-sm text-red-500">{errors.code}</p>}
      </div>

      <div>
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

      <Separator />

      <DialogFooter>
        <DialogClose asChild>
          <Button variant={'ghost'}>Cancelar</Button>
        </DialogClose>
        <Button type="submit" disabled={processing}>
          {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          {existingMachine ? 'Atualizar' : 'Criar'}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default UpsertForm;
