export const getBadgeClassesFromLogAction = (action: string) => {
  if (action === 'create') {
    return 'bg-green-600';
  }

  if (action === 'update') {
    return 'bg-yellow-600';
  }

  return 'bg-red-600';
};
