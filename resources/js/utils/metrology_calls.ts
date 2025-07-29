import { MetrologyCallStatus } from '@/constants/metrology-call';

export const isEditableStatus = (id: number): boolean => {
  return id === MetrologyCallStatus.WAITING_RECEIVE;
};

export const getBadgeClassesFromMetrologyCallStatus = (statusId: number) => {
  if (statusId === 1) {
    return 'bg-green-600';
  }

  if (statusId === 2) {
    return 'bg-red-600';
  }

  if (statusId === 3) {
    return 'bg-gray-600';
  }

  return 'bg-yellow-600';
};

export const getBadgeClassesFromMetrologyCallType = (typeId: number) => {
  if (typeId === 1) {
    return 'bg-green-600';
  }

  if (typeId === 2) {
    return 'bg-yellow-600';
  }

  return 'bg-red-600';
};
