export const getBadgeClassesFromLogAction = (actionId: number) => {
  if (actionId === 1) {
    return 'bg-green-600';
  }

  if (actionId === 2) {
    return 'bg-yellow-600';
  }

  return 'bg-red-600';
};
