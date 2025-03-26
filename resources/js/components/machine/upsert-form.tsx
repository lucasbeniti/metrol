import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { IUpsertMachine } from '@/types/machine';
import { IOperation } from '@/types/operation';
import { ITool } from '@/types/tool';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

interface UpsertFormProps {
  existingMachine?: IUpsertMachine;
  operations: IOperation[];
  tools: ITool[];
  setIsOpen: (isOpen: boolean) => void;
}
const UpsertForm = ({ existingMachine, operations, tools, setIsOpen }: UpsertFormProps) => {
  const { data, setData, post, put, processing, errors, reset } = useForm<IUpsertMachine>({
    name: existingMachine?.name || '',
    code: existingMachine?.code || '',
    operation_id: existingMachine?.operation_id?.toString() || '',
    tool_id: existingMachine?.tool_id?.toString() || '',
  });

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (existingMachine) {
      put(route('machines.update', existingMachine.id), {
        onSuccess: () => {
          reset();
          setIsOpen(false);
          toast.success('Máquina atualizada com sucesso!');
        },
        onError: (errors) => {
          console.error(errors);
        },
      });
    } else {
      post(route('machines.store'), {
        onSuccess: () => {
          reset();
          setIsOpen(false);
          toast.success('Máquina criada com sucesso!');
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
        <Input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Insira o nome da máquina" />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="code">Código</Label>
        <Input id="code" type="text" value={data.code} onChange={(e) => setData('code', e.target.value)} placeholder="Insira o código da máquina" />
        {errors.code && <p className="text-sm text-red-500">{errors.code}</p>}
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
        <Label htmlFor="tool_id">Ferramenta</Label>
        <Select  onValueChange={(value) => setData('tool_id', value === "none" ? null : value)} value={data.tool_id ? data.tool_id.toString() : 'none'}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma ferramenta" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="none" value="none">
               Não se aplica
            </SelectItem>
            {tools.map((tool) => (
              <SelectItem key={tool.id} value={tool.id.toString()}>
                {tool.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.tool_id && <p className="text-sm text-red-500">{errors.tool_id}</p>}
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
