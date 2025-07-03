import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DialogClose } from '@radix-ui/react-dialog';

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  details: Record<string, unknown>;
  entityName: string;
}

const LogDetailsDialog = ({ isOpen, setIsOpen, details, entityName }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes do {entityName} alterado</DialogTitle>
          <DialogDescription className="mt-4 text-sm">
            <div className="bg-muted rounded p-2 whitespace-pre-wrap text-white">
              {Object.entries(details).map(([key, value]) => (
                <div key={key}>
                  {key[0].toUpperCase() + key.slice(1)}: {String(value)}
                </div>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogDetailsDialog;
