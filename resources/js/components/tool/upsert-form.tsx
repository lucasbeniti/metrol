import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { IUpsertTool } from '@/types/tool';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

interface UpsertFormProps {
  existingTool?: IUpsertTool;
  setIsOpen: (isOpen: boolean) => void;
}

const UpsertForm = ({ existingTool, setIsOpen }: UpsertFormProps) => {
  const { data, setData, post, put, processing, errors, reset } = useForm<IUpsertTool>({
    name: existingTool?.name || '',
    code: existingTool?.code || '',
  });

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (existingTool) {
      put(route('tools.update', existingTool.id), {
        onSuccess: () => {
          reset();
          setIsOpen(false);
          toast.success('Ferramenta atualizada com sucesso!');
        },
        onError: (errors) => {
          console.error(errors);
        },
      });
    } else {
      post(route('tools.store'), {
        onSuccess: () => {
          reset();
          setIsOpen(false);
          toast.success('Ferramenta criada com sucesso!');
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
        <Input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Insira o nome da ferramenta" />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="code">Código</Label>
        <Input id="code" type="text" value={data.code} onChange={(e) => setData('code', e.target.value)} placeholder="Insira o código da ferramenta" />
        {errors.code && <p className="text-sm text-red-500">{errors.code}</p>}
      </div>
      
      <Separator />

      <DialogFooter>
        <DialogClose asChild>
          <Button variant={'ghost'}>Cancelar</Button>
        </DialogClose>
        <Button type="submit" disabled={processing}>
          {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          {existingTool ? 'Atualizar' : 'Criar'}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default UpsertForm;
