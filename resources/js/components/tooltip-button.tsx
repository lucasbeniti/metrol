import { ReactNode } from 'react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface TooltipButtonProps {
  variant?: 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  disabled?: boolean;
  icon: ReactNode;
  text: string;
  onClick?: () => void;
}

const TooltipButton = ({ variant = 'default', disabled = false, icon, onClick, text }: TooltipButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={variant} disabled={disabled} onClick={onClick}>
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipButton;
