import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useUpsertForm } from '@/hooks/use-upsert';
import { IClient } from '@/types/client';
import { IUpsertCostCenter } from '@/types/cost-center';
import { LoaderCircle } from 'lucide-react';

interface UpsertFormProps {
  existingCostCenter?: IUpsertCostCenter;
  clients: IClient[];
  setIsOpen: (isOpen: boolean) => void;
}

const UpsertForm = ({ existingCostCenter, clients, setIsOpen }: UpsertFormProps) => {
  const { data, setData, errors, processing, onSubmit } = useUpsertForm<IUpsertCostCenter>({
    initialData: {
      name: existingCostCenter?.name || '',
      code: existingCostCenter?.code || '',
      client_id: existingCostCenter?.client_id?.toString() || '',
    },
    existingId: existingCostCenter?.id,
    storeRoute: route('cost-centers.store'),
    updateRoute: (id) => route('cost-centers.update', id),
    onSuccess: () => setIsOpen(false),
  });

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Insira o nome do centro de custo" />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="code">Código</Label>
        <Input id="code" value={data.code} onChange={(e) => setData('code', e.target.value)} placeholder="Insira o código do centro de custo" />
        {errors.code && <p className="text-sm text-red-500">{errors.code}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="client_id">Cliente</Label>
        <Select onValueChange={(v) => setData('client_id', v)} value={data.client_id}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um cliente" />
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
          <Button variant="ghost">Cancelar</Button>
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
