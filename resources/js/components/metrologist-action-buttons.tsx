import { useCloseMetrologyCallDialog } from '@/contexts/close-metrology-call-dialog-context';
import { useReceiveItemDialog } from '@/contexts/receive-item-context';
import { IMetrologyCall } from '@/types/metrology-call';
import { isEditableByMetrologist, isWaitingReceive } from '@/utils/metrology_calls';
import { CheckCheckIcon, UserRoundCheckIcon } from 'lucide-react';
import TooltipButton from './tooltip-button';

interface MetrologistActionsButtonsProps {
  call: IMetrologyCall;
}

const MetrologistActionsButtonsProps = ({ call }: MetrologistActionsButtonsProps) => {
  const { openReceiveItemDialog } = useReceiveItemDialog();
  const { openCloseMetrologyCallDialog } = useCloseMetrologyCallDialog();

  const handleReceive = () => {
    openReceiveItemDialog({
      id: call.id,
      callRoute: 'metrology-calls.receiveItem',
      itemName: call.operation?.item?.name || '',
    });
  };

  const handleClose = () => {
    openCloseMetrologyCallDialog({
      id: call.id,
      callRoute: 'metrology-calls.close',
      itemName: call.operation?.item?.name || '',
    });
  };

  if (isWaitingReceive(call.metrology_call_status_id)) {
    return <TooltipButton variant="ghost" icon={<UserRoundCheckIcon />} text="Receber Item" onClick={handleReceive} />;
  }

  if (!isEditableByMetrologist(call.metrology_call_status_id)) {
    return <div className="flex h-8 items-center">Não disponível</div>;
  }

  return <TooltipButton variant="ghost" icon={<CheckCheckIcon className="text-green-600" />} text="Finalizar Medição" onClick={handleClose} />;
};

export default MetrologistActionsButtonsProps;
