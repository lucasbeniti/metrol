export enum MetrologyCallType {
  SETUP = 1,
  PRODUCTION = 2,
  ADJUSTMENT = 3,
}

export enum MetrologyCallStatus {
  APPROVED = 1,
  REJECTED = 2,
  WAITING_RECEIVE = 3,
  WAITING_MEASUREMENT = 4,
}

export const TYPES_MAP: Record<number, string> = {
  1: 'Setup',
  2: 'Produção',
  3: 'Ajuste',
};

export const STATUS_MAP: Record<number, string> = {
  1: 'Aprovado',
  2: 'Rejeitado',
  3: 'Aguardando Recebimento',
  4: 'Aguardando Medição',
};
