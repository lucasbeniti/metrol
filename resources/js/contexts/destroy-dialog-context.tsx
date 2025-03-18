import DestroyRowDialog from '@/components/destroy-row-dialog';
import { createContext, ReactNode, useContext, useState } from 'react';

interface DestroyDialogContextType {
  openDeleteDialog: (params: { id: string; description: string; callRoute: string; entityName: string }) => void;
}

const DestroyDialogContext = createContext<DestroyDialogContextType | undefined>(undefined);

export function DestroyDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState<{
    id: string;
    description: string;
    callRoute: string;
    entityName: string;
  } | null>(null);

  const openDeleteDialog = (params: { id: string; description: string; callRoute: string; entityName: string }) => {
    setDialogProps(params);
    setIsOpen(true);
  };

  return (
    <DestroyDialogContext.Provider value={{ openDeleteDialog }}>
      {children}
      {dialogProps && (
        <DestroyRowDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          id={dialogProps.id}
          description={dialogProps.description}
          callRoute={dialogProps.callRoute}
          entityName={dialogProps.entityName}
        />
      )}
    </DestroyDialogContext.Provider>
  );
}

export const useDestroyDialog = () => {
  const context = useContext(DestroyDialogContext);
  if (context === undefined) {
    throw new Error('useDestroyDialog must be used within a DestroyDialogProvider');
  }
  return context;
};
