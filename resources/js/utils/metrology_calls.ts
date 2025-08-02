import { MetrologyCallStatus, MetrologyCallType } from '@/constants/metrology-call';

export const isEditableByOperator = (id: number): boolean => {
  return id === MetrologyCallStatus.WAITING_RECEIVE;
};

export const getBadgeClassesFromMetrologyCallStatus = (statusId: number) => {
  if (statusId === MetrologyCallStatus.APPROVED) {
    return 'bg-green-600';
  }

  if (statusId === MetrologyCallStatus.REJECTED) {
    return 'bg-red-600';
  }

  if (statusId === MetrologyCallStatus.WAITING_MEASUREMENT) {
    return 'bg-gray-600';
  }

  return 'bg-yellow-600';
};

export const getBadgeClassesFromMetrologyCallType = (typeId: number) => {
  if (typeId === MetrologyCallType.SETUP) {
    return 'bg-purple-600';
  }

  if (typeId === MetrologyCallType.ADJUSTMENT) {
    return 'bg-orange-600';
  }

  return 'bg-blue-600';
};

export const isEditableByMetrologist = (statusId: number): boolean => {
  return statusId === MetrologyCallStatus.WAITING_MEASUREMENT || statusId === MetrologyCallStatus.WAITING_RECEIVE;
};

export const isWaitingReceive = (statusId: number): boolean => {
  return statusId === MetrologyCallStatus.WAITING_RECEIVE;
};
