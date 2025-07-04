import { ACTIONS_OPTIONS, TABLES_OPTIONS } from '@/constants/logs';
import { IFilterLog } from '@/types/logs';
import { IUser } from '@/types/user';
import { router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { DialogClose, DialogFooter } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';

interface FilterFormProps {
  users: IUser[];
  filters: Partial<IFilterLog>;
  setIsOpen: (isOpen: boolean) => void;
}

const FilterForm = ({ users, filters, setIsOpen }: FilterFormProps) => {
  const { data, setData, processing, reset } = useForm<IFilterLog>({
    user_id: filters?.user_id || 'all',
    action_id: filters?.action_id || 'all',
    table_id: filters?.table_id || 'all',
  });

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    router.get(route('logs.index'), data, {
      onSuccess: () => {
        reset();
        setIsOpen(false);
        toast.success('Filtros aplicados com sucesso!');
      },
      onError: (errors) => {
        toast.error('Não foi possível filtrar os logs.');
        console.error(errors);
      },
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label>Usuário</Label>
        <Select value={data.user_id} onValueChange={(value) => setData('user_id', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um usuário" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="all" value="all">
              Todos
            </SelectItem>
            {users.map((user) => (
              <SelectItem key={user.id} value={String(user.id)}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Ação</Label>
        <Select value={data.action_id} onValueChange={(value) => setData('action_id', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma ação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="all" value="all">
              Todas
            </SelectItem>
            {ACTIONS_OPTIONS.map((action) => (
              <SelectItem key={action.value} value={String(action.value)}>
                {action.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Tabela</Label>
        <Select value={data.table_id} onValueChange={(value) => setData('table_id', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma tabela alterada" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {TABLES_OPTIONS.map((table) => (
              <SelectItem key={table.value} value={String(table.value)}>
                {table.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <DialogFooter>
        <DialogClose asChild>
          <Button variant={'ghost'} disabled={processing}>
            Cancelar
          </Button>
        </DialogClose>

        <Button type="submit" disabled={processing}>
          Filtrar
        </Button>
      </DialogFooter>
    </form>
  );
};

export default FilterForm;
