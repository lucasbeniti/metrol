import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ACTIONS_OPTIONS, TABLES_OPTIONS } from '@/constants/logs';
import { IFilterLog } from '@/types/logs';
import { IUser } from '@/types/user';
import { router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

interface FilterDialogProps {
  users: IUser[];
  onOpenChange: (open: boolean) => void;
  isOpen: boolean;
  filters: Partial<IFilterLog>;
}

const FilterDialog = ({ users, isOpen, onOpenChange, filters }: FilterDialogProps) => {
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
        onOpenChange(false);
        toast.success('Filtros aplicados com sucesso!');
      },
      onError: (errors) => {
        toast.error('Não foi possível filtrar os logs.');
        console.error(errors);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filtrar os logs</DialogTitle>
          <DialogDescription>
            Tenha uma separação de dados conforme o usuário que realizou a ação, a ação que foi realizada e a tabela que sofreu alteração.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} id="filter-form">
          <div className="space-y-4">
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
          </div>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'ghost'} disabled={processing}>
              Cancelar
            </Button>
          </DialogClose>

          <Button type="submit" form="filter-form" disabled={processing}>
            Filtrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
