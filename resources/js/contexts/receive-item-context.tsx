import ReceiveItemDialog from '@/components/receive-item-dialog';
import { createContext, useContext, useState } from 'react';

interface ReceiveItemDialogContextType {
  openReceiveItemDialog: (params: { id: number; itemName: string; callRoute: string }) => void;
}

interface ReceiveItemDialogProps {
  id: number;
  itemName: string;
  callRoute: string;
}

const ReceiveItemContext = createContext<ReceiveItemDialogContextType | null>(null);

export const useReceiveItemDialog = () => {
  const context = useContext(ReceiveItemContext);

  if (!context) {
    throw new Error('useReceiveItemDialog must be used within a ReceiveItemDialogProvider');
  }

  return context;
};

export const ReceiveItemDialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogParams, setDialogParams] = useState<ReceiveItemDialogProps | null>(null);

  const openReceiveItemDialog = (params: ReceiveItemDialogProps) => {
    setIsDialogOpen(true);
    setDialogParams(params);
  };

  return (
    <ReceiveItemContext.Provider value={{ openReceiveItemDialog }}>
      {children}
      {dialogParams && (
        <ReceiveItemDialog
          callRoute={dialogParams.callRoute}
          id={dialogParams.id}
          setIsOpen={setIsDialogOpen}
          isOpen={isDialogOpen}
          itemName={dialogParams.itemName}
        />
      )}
    </ReceiveItemContext.Provider>
  );
};
