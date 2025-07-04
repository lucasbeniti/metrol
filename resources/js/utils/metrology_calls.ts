import { MetrologyCallStatus } from '@/constants/metrology-call';

export const isEditableStatus = (id: number): boolean => {
  return id === MetrologyCallStatus.WAITING_RECEIVE;
};
