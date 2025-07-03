export const ACTIONS_MAP: Record<number, string> = {
  1: 'Criação',
  2: 'Atualização',
  3: 'Exclusão',
};

export const TABLES_MAP: Record<number, string> = {
  1: 'Usuários',
  2: 'Chamados de Metrologia',
  3: 'Máquinas',
  4: 'Clientes',
  5: 'Centros de Custo',
  6: 'Operações',
  7: 'Peças',
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
  2: 'chamado de metrologia',
  3: 'máquina',
  4: 'cliente',
  5: 'centro de custo',
  6: 'operação',
  7: 'peça',
};
