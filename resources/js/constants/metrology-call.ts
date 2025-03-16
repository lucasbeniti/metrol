import { MetrologyCallStatus } from "@/types/metrology-call";

export const TYPE_LABELS: Record<string, string> = {
  setup: 'Setup',
  production: 'Produção',
  adjust: 'Ajuste',
};

export const STATUS_LABELS: Record<string, string> = {
  ok: 'Ok',
  nok: 'Não ok',
  waiting_receive: 'Aguardando Recebimento',
  waiting_measurement: 'Aguardando Medição',
};

export const STATUS_MAP: Record<MetrologyCallStatus, string> = {
  [MetrologyCallStatus.OK]: 'ok',
  [MetrologyCallStatus.NOK]: 'nok',
  [MetrologyCallStatus.WAITING_RECEIVE]: 'waiting_receive',
  [MetrologyCallStatus.WAITING_MEASUREMENT]: 'waiting_measurement'
};