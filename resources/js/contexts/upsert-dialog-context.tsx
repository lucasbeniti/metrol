/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface UpsertDialogContextType {
  openUpsertDialog: <T>(params: {
    UpsertDialogComponent: React.ComponentType<any>;
    props: {
      existingEntity?: T;
      [key: string]: any;
    };
  }) => void;
}

const UpsertDialogContext = createContext<UpsertDialogContextType | undefined>(undefined);

export function UpsertDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogState, setDialogState] = useState<{
    UpsertDialogComponent: React.ComponentType<any>;
    props: Record<string, any>;
  } | null>(null);

  const openUpsertDialog = <T,>(params: {
    UpsertDialogComponent: React.ComponentType<any>;
    props: {
      existingEntity?: T;
      [key: string]: any;
    };
  }) => {
    setDialogState(params);
    setIsOpen(true);
  };

  return (
    <UpsertDialogContext.Provider value={{ openUpsertDialog }}>
      {children}
      {dialogState && <dialogState.UpsertDialogComponent isOpen={isOpen} setIsOpen={setIsOpen} {...dialogState.props} />}
    </UpsertDialogContext.Provider>
  );
}

export const useUpsertDialog = () => {
  const context = useContext(UpsertDialogContext);
  if (context === undefined) {
    throw new Error('useUpsertDialog must be used within a UpsertDialogProvider');
  }
  return context;
};
