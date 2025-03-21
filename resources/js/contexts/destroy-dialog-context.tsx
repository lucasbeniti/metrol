import DestroyRowDialog from '@/components/destroy-row-dialog';
import { createContext, useContext, useState } from 'react';

interface DestroyDialogContextType {
  openDeleteDialog: (params: { id: string; parentId?: string; description: string; callRoute: string; entityName: string }) => void;
}

interface DestroyDialogParams {
  id: string;
  parentId?: string;
  description: string;
  callRoute: string;
  entityName: string;
}

const DestroyDialogContext = createContext<DestroyDialogContextType | null>(null);

export const useDestroyDialog = () => {
  const context = useContext(DestroyDialogContext);
  if (!context) {
    throw new Error('useDestroyDialog must be used within a DestroyDialogProvider');
  }
  return context;
};

export const DestroyDialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteDialogParams, setDeleteDialogParams] = useState<DestroyDialogParams | null>(null);

  const openDeleteDialog = (params: DestroyDialogParams) => {
    setDeleteDialogParams(params);
    setIsDeleteDialogOpen(true);
  };

  return (
    <DestroyDialogContext.Provider value={{ openDeleteDialog }}>
      {children}
      {deleteDialogParams && (
        <DestroyRowDialog
          isOpen={isDeleteDialogOpen}
          setIsOpen={setIsDeleteDialogOpen}
          id={deleteDialogParams.id}
          parentId={deleteDialogParams.parentId}
          description={deleteDialogParams.description}
          callRoute={deleteDialogParams.callRoute}
          entityName={deleteDialogParams.entityName}
        />
      )}
    </DestroyDialogContext.Provider>
  );
};
