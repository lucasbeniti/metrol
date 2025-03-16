import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { IClient } from '@/types/client';
import { IUpsertCostCenter } from '@/types/cost-center';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

interface UpsertFormProps {
  existingCostCenter?: IUpsertCostCenter;
  clients: IClient[];
  setIsOpen: (isOpen: boolean) => void;
}

const UpsertForm = ({ existingCostCenter, clients, setIsOpen }: UpsertFormProps) => {
  const { data, setData, post, put, processing, errors, reset } = useForm<IUpsertCostCenter>({
    name: existingCostCenter?.name || '',
    code: existingCostCenter?.code || '',
    client_id: existingCostCenter?.client_id?.toString() || '',
  });

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (existingCostCenter) {
      put(route('cost-centers.update', existingCostCenter.id), {
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
      post(route('cost-centers.store'), {
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
        <Input
          id="name"
          type="text"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
          placeholder="Insira o nome do centro de custo"
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="code">Código</Label>
        <Input
          id="code"
          type="text"
          value={data.code}
          onChange={(e) => setData('code', e.target.value)}
          placeholder="Insira o código do centro de custo"
        />
        {errors.code && <p className="text-sm text-red-500">{errors.code}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="operation_id">Operação</Label>
        <Select onValueChange={(value) => setData('operation_id', value)} value={data.operation_id.toString()}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma operação" />
          </SelectTrigger>
          <SelectContent>
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id.toString()}>
                {client.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.client_id && <p className="text-sm text-red-500">{errors.client_id}</p>}
      </div>

      <Separator />

      <DialogFooter>
        <DialogClose asChild>
          <Button variant={'ghost'}>Cancelar</Button>
        </DialogClose>
        <Button type="submit" disabled={processing}>
          {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          {existingCostCenter ? 'Atualizar' : 'Criar'}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default UpsertForm;
