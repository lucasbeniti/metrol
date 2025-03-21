import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { IItem } from '@/types/item';
import { IUpsertOperation } from '@/types/operation';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

interface UpsertFormProps {
  existingOperation?: IUpsertOperation;
  setIsOpen: (isOpen: boolean) => void;
  items: IItem[];
}

const UpsertForm = ({ existingOperation, items = [], setIsOpen }: UpsertFormProps) => {
  // Encontrando o item fixo diretamente pelo itemId
  const selectedItem = existingOperation
  ? items.find((item) => item.id === existingOperation.item_id) // Edição
  : items.find((item) => item.id === data.item_id) || items[0]; // Criação
  console.log(selectedItem);
  const { data, setData, post, put, processing, errors, reset } = useForm<IUpsertOperation>({
    name: existingOperation?.name || '',
    code: existingOperation?.code || '',
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
        <Input
          id="name"
          type="text"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
          placeholder="Insira o nome da operação"
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
          placeholder="Insira o código da operação"
        />
        {errors.code && <p className="text-sm text-red-500">{errors.code}</p>}
      </div>

      {/* Campo fixo do Item */}
      <div className="space-y-2">
        <Label htmlFor="item_id">Item</Label>
        <Input
          id="item_id"
          type="text"
          value={selectedItem ? selectedItem.name : 'Nenhum item selecionado'}
          disabled
        />
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
