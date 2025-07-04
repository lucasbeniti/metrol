import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { IFilterLog } from '@/types/logs';
import { IUser } from '@/types/user';
import { Separator } from '../ui/separator';
import FilterForm from './filter-form';

interface FilterDialogProps {
  users: IUser[];
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  filters: Partial<IFilterLog>;
}

const FilterDialog = ({ users, isOpen, setIsOpen, filters }: FilterDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filtrar os logs</DialogTitle>
          <DialogDescription>
            Tenha uma separação de dados conforme o usuário que realizou a ação, a ação que foi realizada e a tabela que sofreu alteração.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <FilterForm users={users} setIsOpen={setIsOpen} filters={filters} />
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
