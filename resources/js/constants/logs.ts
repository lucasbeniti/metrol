export const ACTIONS_MAP: Record<number, string> = {
  1: 'Criação',
  2: 'Atualização',
  3: 'Exclusão',
};

export const TABLES_MAP: Record<number, string> = {
  1: 'Usuários',
  2: 'Clientes',
  3: 'Centro de Custos',
  4: 'Items',
  5: 'Operações',
  6: 'Máquinas',
  7: 'Chamados de Metrologia',
};

export const ACTIONS_OPTIONS = [
  { value: 1, label: ACTIONS_MAP[1] },
  { value: 2, label: ACTIONS_MAP[2] },
  { value: 3, label: ACTIONS_MAP[3] },
];

export const TABLES_OPTIONS = [
  { value: 1, label: TABLES_MAP[1] },
  { value: 2, label: TABLES_MAP[2] },
  { value: 3, label: TABLES_MAP[3] },
  { value: 4, label: TABLES_MAP[4] },
  { value: 5, label: TABLES_MAP[5] },
  { value: 6, label: TABLES_MAP[6] },
  { value: 7, label: TABLES_MAP[7] },
];

export const ENTITY_NAME_MAP: Record<string, string> = {
  1: 'usuário',
  2: 'cliente',
  3: 'centro de custo',
  4: 'item',
  5: 'operação',
  6: 'máquina',
  7: 'chamado de metrologia',
};
