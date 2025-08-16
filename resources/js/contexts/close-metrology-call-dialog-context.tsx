import CloseMetrologyCallDialog from '@/components/close-metrology-call-dialog';
import { createContext, ReactNode, useContext, useState } from 'react';

interface CloseMetrologyCallDialogContextType {
  openCloseMetrologyCallDialog: (params: { id: number; itemName: string; callRoute: string }) => void;
}

interface CloseMetrologyCallDialogProps {
  id: number;
  itemName: string;
  callRoute: string;
}

const CloseMetrologyCallContext = createContext<CloseMetrologyCallDialogContextType | null>(null);

export const useCloseMetrologyCallDialog = () => {
  const context = useContext(CloseMetrologyCallContext);

  if (!context) {
    throw new Error('useCloseMetrologyCallDialog must be used within a CloseMetrologyCallDialogProvider');
  }

  return context;
};

export const CloseMetrologyCallDialogProvider = ({ children }: { children: ReactNode }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogParams, setDialogParams] = useState<CloseMetrologyCallDialogProps | null>(null);

  const openCloseMetrologyCallDialog = (params: CloseMetrologyCallDialogProps) => {
    setIsDialogOpen(true);
    setDialogParams(params);
  };

  return (
    <CloseMetrologyCallContext.Provider value={{ openCloseMetrologyCallDialog }}>
      {children}
      {dialogParams && (
        <CloseMetrologyCallDialog
          callRoute={dialogParams.callRoute}
          id={dialogParams.id}
          setIsOpen={setIsDialogOpen}
          isOpen={isDialogOpen}
          itemName={dialogParams.itemName}
        />
      )}
    </CloseMetrologyCallContext.Provider>
  );
};
