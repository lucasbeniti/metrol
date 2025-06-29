export const getUserRoleLabel = (role: string): string => {
  const rolesLabels: Record<string, string> = {
    admin: 'Administrador',
    operator: 'Operador',
    metrologist: 'Metrologista',
  };

  return rolesLabels[role] || 'Desconhecido';
};
