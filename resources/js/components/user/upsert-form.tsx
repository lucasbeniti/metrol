import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { IUpsertUser } from '@/types/user';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

interface UpsertFormProps {
  existingUser?: IUpsertUser;
  setIsOpen: (isOpen: boolean) => void;
}

const UpsertForm = ({ existingUser, setIsOpen }: UpsertFormProps) => {
  const { data, setData, post, put, processing, errors, reset } = useForm<IUpsertUser>({
    name: existingUser?.name || '',
    identification: existingUser?.identification || '',
    password: existingUser?.password || '',
    type: existingUser?.type || '',
  });

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (existingUser) {
      put(route('users.update', existingUser.id), {
        onSuccess: () => {
          reset();
          setIsOpen(false);
          toast.success('Usuário atualizado com sucesso!');
        },
        onError: (errors) => {
          console.error(errors);
        },
      });
    } else {
      post(route('users.store'), {
        onSuccess: () => {
          reset();
          setIsOpen(false);
          toast.success('Usuário criado com sucesso!');
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
        <Input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Insira o nome do usuário" />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="code">Identificação</Label>
        <Input
          id="identification"
          type="text"
          value={data.identification}
          onChange={(e) => setData('identification', e.target.value)}
          placeholder="Insira o código do usuário"
        />
        {errors.identification && <p className="text-sm text-red-500">{errors.identification}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="code">Senha</Label>
        <Input
          id="password"
          type="text"
          value={data.password}
          onChange={(e) => setData('password', e.target.value)}
          placeholder="Insira a senha do usuário"
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Tipo</Label>
        <Select onValueChange={(value) => setData('type', value)} value={data.type.toString()}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="metrologist">Metrologista</SelectItem>
            <SelectItem value="production">Produção</SelectItem>
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
          {existingUser ? 'Atualizar' : 'Criar'}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default UpsertForm;
