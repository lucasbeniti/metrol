import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { COLUMN_NAME_FROM_LOG_DETAILS, COLUMN_VALUE_FROM_LOGS_DETAILS } from '@/constants/logs';
import { DialogClose } from '@radix-ui/react-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface LogDetailsDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  details: Record<string, unknown>;
  entityName: string;
}

const LogDetailsDialog = ({ isOpen, setIsOpen, details, entityName }: LogDetailsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes do {entityName} alterado</DialogTitle>
          <DialogDescription className="mt-4 text-sm">
            <Card className="bg-background text-foreground border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Alterações realizadas</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2">
                {Object.entries(details).length > 0 ? (
                  <>
                    {Object.entries(details).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-muted-foreground text-sm">{COLUMN_NAME_FROM_LOG_DETAILS[key]}</span>
                        <span className="font-medium break-words">{COLUMN_VALUE_FROM_LOGS_DETAILS[String(value)] ?? String(value)}</span>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <span className="font-medium break-words">Deleção do {entityName}</span>
                  </>
                )}
              </CardContent>
            </Card>
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
